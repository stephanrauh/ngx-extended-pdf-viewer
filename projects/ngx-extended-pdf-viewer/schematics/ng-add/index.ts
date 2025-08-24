import { join, normalize, Path, strings } from '@angular-devkit/core';
import { apply, applyTemplates, chain, DirEntry, mergeWith, move, Rule, SchematicContext, SchematicsException, Tree, url } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { InsertChange } from '@schematics/angular/utility/change';
import { buildRelativePath, MODULE_EXT, ModuleOptions, ROUTING_MODULE_EXT } from '@schematics/angular/utility/find-module';
import * as ts from 'typescript';
import { addDeclarationToModule, addImportToModule } from './ast-utils';
import { Schema } from './schema';

interface AngularVersion {
  major: number;
  minor: number;
  patch: number;
}

/**
 * Detects the Angular version from package.json
 */
function detectAngularVersion(tree: Tree): AngularVersion | null {
  const packageJsonBuffer = tree.read('/package.json');
  if (!packageJsonBuffer) {
    return null;
  }

  const packageJson = JSON.parse(packageJsonBuffer.toString());
  const angularCore =
    packageJson.dependencies?.['@angular/core'] || packageJson.devDependencies?.['@angular/core'] || packageJson.peerDependencies?.['@angular/core'];

  if (angularCore) {
    // Extract version number from version string (e.g., "^17.0.0", "~16.2.5", "18.0.0-rc.0")
    const versionMatch = angularCore.match(/(\d+)\.(\d+)\.(\d+)/);
    if (versionMatch) {
      return {
        major: parseInt(versionMatch[1], 10),
        minor: parseInt(versionMatch[2], 10),
        patch: parseInt(versionMatch[3], 10),
      };
    }
  }

  return null;
}

/**
 * Checks if the Angular version is supported
 */
function isSupportedAngularVersion(version: AngularVersion | null): boolean {
  if (!version) {
    console.log('Warning: Could not detect Angular version. Proceeding with default configuration.');
    return true;
  }

  const isSupported = version.major >= 17 && version.major <= 20;

  if (!isSupported) {
    console.log(`Warning: Angular ${version.major}.${version.minor}.${version.patch} may not be fully supported.`);
    console.log('Supported Angular versions: 17.x - 20.x');
  }

  return true; // Still proceed, but with warning
}

/**
 * Reads file given path and returns TypeScript source file.
 */
export function getSourceFile(host: Tree, path: string): ts.SourceFile {
  const buffer = host.read(path);
  if (!buffer) {
    throw new SchematicsException(`Could not find file for path: ${path}`);
  }
  const content = buffer.toString();
  const source = ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true);
  return source;
}

/**
 * Import and add module to specific module path.
 */
export function addToModule(host: Tree, modulePath: string, moduleName: string, src: string) {
  const moduleSource = getSourceFile(host, modulePath);
  const changes = addImportToModule(moduleSource, modulePath, moduleName, src);
  const recorder = host.beginUpdate(modulePath);

  changes.forEach((change) => {
    if (change instanceof InsertChange) {
      recorder.insertLeft(change.pos, change.toAdd);
    }
  });

  host.commitUpdate(recorder);
}

export function ngAdd(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    // Detect and validate Angular version
    const angularVersion = detectAngularVersion(tree);
    isSupportedAngularVersion(angularVersion);

    // Load workspace config to get default project
    const workspaceConfig = loadWorkspaceConfig(tree);

    let projectName = options.project;
    if (!projectName || projectName === '') {
      projectName = options.defaultProject || workspaceConfig.defaultProject;
    }

    if (!projectName) {
      const availableProjects = Object.keys(workspaceConfig.projects);
      throw new SchematicsException(`No project specified and no default project found. Available projects: ${availableProjects.join(', ')}`);
    }

    // Set the resolved project name back to options for downstream code
    options.project = projectName;

    // Validate project configuration
    const workspaceConfigForValidation = validateProjectConfiguration(tree, projectName);
    const project = getProjectConfig(workspaceConfigForValidation, projectName);

    // Check if this is a library vs application (prefer projectType over path heuristics)
    const isLibrary =
      project.projectType === 'library' ||
      (project.projectType !== 'application' && project.root && (project.root.startsWith('libs/') || project.root.includes('/libs/')));

    // For applications, verify it has a browser/application build target
    let hasBrowserBuild = false;
    if (!isLibrary) {
      const buildConfig = project.architect || project.targets;
      if (buildConfig) {
        const browserExecutors = [
          '@angular-devkit/build-angular:browser',
          '@angular-devkit/build-angular:application',
          '@nrwl/angular:webpack-browser',
          '@nx/angular:webpack-browser',
          '@nx/angular:application',
          '@nx/angular:browser', // Defensive addition for potential future use
          '@nx/vite:build',
          '@nrwl/vite:build',
        ];

        hasBrowserBuild = Object.values(buildConfig).some(
          (target: any) => target.executor && browserExecutors.some((executor) => target.executor.includes(executor)),
        );
      }
    }

    // Set defaults only if not already specified by user
    if (!options.path) {
      options.path = isLibrary ? 'lib/example-pdf-viewer' : 'app/example-pdf-viewer';
    }
    if (!options.name) {
      options.name = 'example-pdf-viewer';
    }
    if (options.skipImport === undefined) {
      options.skipImport = false;
    }
    const stable = options.stable;
    const exampleComponent = options.exampleComponent;

    // Schedule package installation - this is the main purpose of ng-add
    context.addTask(new NodePackageInstallTask());

    if (exampleComponent && !isLibrary) {
      // Only generate example components for applications
      const folder = detectProjectStructure(tree, projectName, options.defaultProject);
      return chain([addDeclarationToNgModule(options), generateExampleComponent(folder, stable, options), updateAngularJsonRule(projectName, stable)]);
    } else if (exampleComponent && isLibrary) {
      console.log(`Skipping example component generation for library project "${projectName}".`);
      console.log("Libraries typically don't need example PDF viewer components.");
      return tree; // No asset configuration for libraries
    }

    // For applications with browser build or libraries, update configuration
    if (!isLibrary && hasBrowserBuild) {
      return chain([updateAngularJsonRule(projectName, stable)]);
    } else if (isLibrary) {
      console.log(`Skipping asset configuration for library project "${projectName}".`);
      console.log("Libraries don't typically need browser assets configured.");
      return tree; // No configuration changes for libraries
    } else {
      console.log(`Warning: Project "${projectName}" doesn't appear to have a browser build target.`);
      console.log('Assets may not be configured correctly. You may need to manually add assets to your build configuration.');
      return tree;
    }
  };
}

/**
 * Detects the project structure to determine the correct source folder
 * Handles Angular CLI, Nx, and hybrid project structures
 */
function detectProjectStructure(tree: Tree, projectName: string, defaultProject: string): string {
  const workspaceConfig = loadWorkspaceConfig(tree);
  const project = getProjectConfig(workspaceConfig, projectName);

  // Use sourceRoot if available (common in Nx)
  if (project.sourceRoot) {
    return `/${project.sourceRoot}`;
  }

  // Use root + src if available
  if (project.root) {
    const srcPath = `/${project.root}/src`;
    if (tree.exists(srcPath)) {
      return srcPath;
    }
    return `/${project.root}`;
  }

  // Fallback to Angular CLI-style detection
  const isDefaultProject = projectName === defaultProject;

  if (isDefaultProject) {
    // For root project, assume standard src structure
    return '/src';
  } else {
    // Try different common project paths
    const possiblePaths = [
      `/apps/${projectName}/src`, // Nx apps
      `/libs/${projectName}/src`, // Nx libs
      `/projects/${projectName}/src`, // Angular CLI
      `/apps/${projectName}`, // Nx apps without src
      `/libs/${projectName}`, // Nx libs without src
      `/projects/${projectName}`, // Angular CLI without src
    ];

    for (const path of possiblePaths) {
      if (tree.exists(path)) {
        return path;
      }
    }

    // Last resort - assume standard structure
    return `/projects/${projectName}/src`;
  }
}

interface WorkspaceConfig {
  projects: Record<string, any>;
  type: 'angular' | 'nx';
  configPath: string;
  defaultProject?: string;
}

/**
 * Detects workspace type and loads configuration (Angular CLI, Nx, or hybrid)
 */
function loadWorkspaceConfig(tree: Tree): WorkspaceConfig {
  // Try angular.json first (Angular CLI or migrated Nx)
  let configBuffer = tree.read('/angular.json');
  if (configBuffer) {
    const config = JSON.parse(configBuffer.toString());
    const projects = config.projects || {};

    // If angular.json exists but has no projects, continue to Nx scan
    // (common in modern Nx hybrids where projects live in project.json files)
    if (Object.keys(projects).length > 0) {
      return {
        projects,
        type: 'angular',
        configPath: '/angular.json',
        defaultProject: config.defaultProject,
      };
    }
  }

  // Try workspace.json (older Nx)
  configBuffer = tree.read('/workspace.json');
  if (configBuffer) {
    const config = JSON.parse(configBuffer.toString());
    return {
      projects: config.projects || {},
      type: 'nx',
      configPath: '/workspace.json',
      defaultProject: config.defaultProject,
    };
  }

  // Try nx.json with project.json files (modern Nx)
  const nxJsonBuffer = tree.read('/nx.json');
  if (nxJsonBuffer) {
    const nxConfig = JSON.parse(nxJsonBuffer.toString());
    const projects: Record<string, any> = {};

    // Scan for project.json files
    const projectDirs = ['/apps', '/libs', '/projects'];
    for (const dir of projectDirs) {
      if (tree.exists(dir)) {
        const dirEntry = tree.getDir(dir);
        dirEntry.subdirs.forEach((subdir) => {
          const projectJsonPath = `${dir}/${subdir}/project.json`;
          if (tree.exists(projectJsonPath)) {
            const projectBuffer = tree.read(projectJsonPath);
            if (projectBuffer) {
              const projectConfig = JSON.parse(projectBuffer.toString());
              // Use project name from config, fall back to folder name
              const projectName = projectConfig.name || subdir;
              projects[projectName] = {
                ...projectConfig,
                root: `${dir}/${subdir}`.substring(1), // Remove leading slash for consistency
                sourceRoot: `${dir}/${subdir}/src`.substring(1),
              };
            }
          }
        });
      }
    }

    return {
      projects,
      type: 'nx',
      configPath: '/nx.json',
      defaultProject: nxConfig.defaultProject,
    };
  }

  throw new SchematicsException(
    'Could not find workspace configuration (angular.json, workspace.json, or nx.json). This might not be an Angular or Nx project.',
  );
}

/**
 * Gets project configuration from workspace, handling both Angular CLI and Nx
 */
function getProjectConfig(workspaceConfig: WorkspaceConfig, projectName: string): any {
  const project = workspaceConfig.projects[projectName];
  if (!project) {
    const availableProjects = Object.keys(workspaceConfig.projects);
    throw new SchematicsException(`Project "${projectName}" not found in ${workspaceConfig.configPath}. Available projects: ${availableProjects.join(', ')}`);
  }

  return project;
}

/**
 * Validates the project configuration before proceeding
 */
function validateProjectConfiguration(tree: Tree, projectName: string): WorkspaceConfig {
  const workspaceConfig = loadWorkspaceConfig(tree);
  const project = getProjectConfig(workspaceConfig, projectName);

  // Check for build configuration
  const buildConfig = project.architect || project.targets;
  if (!buildConfig) {
    throw new SchematicsException(`No build configuration found for project "${projectName}". The project might be misconfigured.`);
  }

  return workspaceConfig;
}

export function updateAngularJsonRule(projectName: string, stable: boolean): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return updateAngularJson(tree, projectName, stable);
  };
}

function updateAngularJson(tree: Tree, projectName: string, stable: boolean): Tree {
  const workspaceConfig = loadWorkspaceConfig(tree);
  const project = getProjectConfig(workspaceConfig, projectName);

  let updated = false;

  // Handle both "architect" (Angular 6+) and "targets" (older versions) configurations
  const buildConfig = project.architect || project.targets;
  if (!buildConfig) {
    throw new SchematicsException(`No build configuration found for project "${projectName}".`);
  }

  // Helper function to normalize paths by removing trailing slashes
  const normalizePath = (path: string) => path.replace(/\/+$/, '');

  // Helper function to add assets to a target's options
  const addAssetsToTarget = (target: any, targetName: string) => {
    if (!target?.options) {
      console.log(`No options found for ${targetName} target in project ${projectName}`);
      return false;
    }

    if (!target.options.assets) {
      target.options.assets = [];
    }

    // Detect Angular version to determine correct assets source folder
    const angularVersion = detectAngularVersion(tree);
    console.log('Angular version', angularVersion);
    const usePublicFolder = angularVersion && angularVersion.major >= 17;
    console.log('Use public folder:', usePublicFolder);

    // Prepare normalized asset paths
    const inputPath = stable ? 'node_modules/ngx-extended-pdf-viewer/assets/' : 'node_modules/ngx-extended-pdf-viewer/bleeding-edge/';

    let assetsSourcePath: string;
    if (stable) {
      assetsSourcePath = 'assets';
    } else {
      assetsSourcePath = 'bleeding-edge';
    }

    const normalizedInputPath = normalizePath(inputPath);

    // Check if assets already exist to avoid duplicates (with path normalization)
    const existingAsset = target.options.assets.find((asset: any) => {
      // Handle object-form assets
      if (typeof asset === 'object' && asset !== null && asset.input !== null && asset.input !== undefined) {
        return normalizePath(asset.input) === normalizedInputPath;
      }
      // Handle string-form assets (though less common for this use case)
      if (typeof asset === 'string') {
        return normalizePath(asset) === normalizedInputPath;
      }
      return false;
    });

    if (!existingAsset) {
      target.options.assets.push({
        glob: '**/*',
        input: inputPath,
        output: assetsSourcePath,
      });
      console.log(`Added assets to ${targetName} target in project ${projectName}`);
      return true;
    } else {
      console.log(`Assets already exist in ${targetName} target for project ${projectName}`);
      return false;
    }
  };

  // Prioritize executor detection over name heuristics
  const buildExecutors = [
    '@angular-devkit/build-angular:browser',
    '@angular-devkit/build-angular:application',
    '@nrwl/angular:webpack-browser',
    '@nx/angular:webpack-browser',
    '@nx/angular:application',
    '@nx/angular:browser', // Defensive addition for potential future use
    '@nx/vite:build',
    '@nrwl/vite:build',
  ];

  // First, try to find a build target by executor
  let foundBuildTarget = false;
  for (const [targetName, target] of Object.entries(buildConfig)) {
    const targetConfig = target as any;
    if (targetConfig.executor && buildExecutors.some((executor) => targetConfig.executor.includes(executor))) {
      if (addAssetsToTarget(targetConfig, targetName)) {
        updated = true;
        foundBuildTarget = true;
      }
      break; // Only update one build target
    }
  }

  // If no executor-based target found, fall back to name heuristics (only build targets)
  if (!foundBuildTarget) {
    const buildTargetNames = ['build', 'application', 'esbuild', 'webpack', 'build-angular'];

    for (const targetName of buildTargetNames) {
      if (buildConfig[targetName]) {
        if (addAssetsToTarget(buildConfig[targetName], targetName)) {
          updated = true;
        }
        break; // Only update one build target
      }
    }
  }

  // If no suitable targets found, provide helpful error message
  if (!updated) {
    const availableTargets = buildConfig ? Object.keys(buildConfig) : [];
    console.log("Couldn't find suitable build target in workspace config");
    console.log(`Available targets for project ${projectName}: ${availableTargets.join(', ')}`);
    console.log('Please manually add the following to your workspace config assets array:');
    console.log('{');
    console.log("  glob: '**/*',");
    if (stable) {
      const angularVersion = detectAngularVersion(tree);
      const usePublicFolder = angularVersion && angularVersion.major >= 17;
      const outputPath = usePublicFolder ? 'public' : 'assets';
      console.log("  input: 'node_modules/ngx-extended-pdf-viewer/assets/',");
      console.log(`  output: '${outputPath}',`);
    } else {
      console.log("  input: 'node_modules/ngx-extended-pdf-viewer/bleeding-edge/',");
      console.log("  output: 'bleeding-edge',");
    }
    console.log('}');
    return tree;
  }

  // Write back the updated configuration
  if (workspaceConfig.type === 'nx' && workspaceConfig.configPath === '/nx.json') {
    // For modern Nx with project.json files, update the individual project.json
    const projectJsonPath = `/${project.root}/project.json`;
    if (tree.exists(projectJsonPath)) {
      const updatedProjectJson = JSON.stringify(project, null, 2);
      tree.overwrite(projectJsonPath, updatedProjectJson);
    }
  } else {
    // For angular.json or workspace.json
    const configBuffer = tree.read(workspaceConfig.configPath);
    if (configBuffer) {
      const config = JSON.parse(configBuffer.toString());
      config.projects[projectName] = project;
      const updatedConfig = JSON.stringify(config, null, 2);
      tree.overwrite(workspaceConfig.configPath, updatedConfig);
    }
  }

  return tree;
}

function generateExampleComponent(folder: string, stable: boolean, options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('=== generateExampleComponent called ===');
    
    // Detect Angular version and check folder existence
    const angularVersion = detectAngularVersion(tree);
    const usePublicFolder = angularVersion && angularVersion.major >= 17;
    context.logger.info(`Angular version: ${JSON.stringify(angularVersion)}`);
    context.logger.info(`Use public folder: ${usePublicFolder}`);

    // Get project configuration
    const workspaceConfig = loadWorkspaceConfig(tree);
    const project = getProjectConfig(workspaceConfig, options.project!);
    const projectRoot = project.root || '';
    context.logger.info(`Project root: ${projectRoot}`);

    // Check if assets or public folder exists
    const assetsPath = `${projectRoot ? projectRoot + '/' : ''}src/assets`;
    const publicPath = `${projectRoot ? projectRoot + '/' : ''}public`;
    
    context.logger.info('Checking paths:');
    context.logger.info(`  assetsPath: ${assetsPath} -> exists: ${tree.exists(assetsPath)}`);
    context.logger.info(`  publicPath: ${publicPath} -> exists: ${tree.exists(publicPath)}`);

    let targetAssetsFolder: string;
    if (tree.exists(assetsPath)) {
      targetAssetsFolder = assetsPath;
      context.logger.info(`✓ Using assets folder (${assetsPath})`);
    } else if (usePublicFolder && tree.exists(publicPath)) {
      targetAssetsFolder = publicPath;
      context.logger.info(`✓ Using public folder (${publicPath})`);
    } else {
      // Fallback: create the appropriate folder
      targetAssetsFolder = usePublicFolder ? publicPath : assetsPath;
      context.logger.info(`✓ Fallback: creating ${targetAssetsFolder} folder`);
    }

    context.logger.info(`Final target folder: ${targetAssetsFolder}`);

    // Determine the correct PDF path for the component template
    const pdfPath = targetAssetsFolder === publicPath ? '' : '/assets';
    context.logger.info(`PDF path for component template: "${pdfPath}"`);

    // Create two template sources - one for components, one for assets
    context.logger.info('Creating component template source...');
    const componentTemplateSource = apply(url('./files'), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        stable,
        standalone: options.standalone,
        pdfPath: pdfPath,
      }),
      // Filter out the assets folder from component templates
      (templateTree: Tree) => {
        context.logger.info('Component template - filtering assets...');
        const filesBefore: string[] = [];
        templateTree.visit(path => filesBefore.push(path));
        context.logger.info(`Template files before filter: ${filesBefore.join(', ')}`);
        
        // Delete all assets files/folders from component template
        const assetsToDelete: string[] = [];
        templateTree.visit((path) => {
          if (path.startsWith('/assets')) {
            assetsToDelete.push(path);
          }
        });
        
        assetsToDelete.forEach(path => {
          context.logger.info(`Deleting asset from component template: ${path}`);
          templateTree.delete(path);
        });
        
        const filesAfter: string[] = [];
        templateTree.visit(path => filesAfter.push(path));
        context.logger.info(`Template files after filter: ${filesAfter.join(', ')}`);
        return templateTree;
      },
      move(normalize(folder)),
    ]);

    context.logger.info('Creating assets template source...');
    // Separate template source for assets that copies to the correct target folder
    const assetsTemplateSource = apply(url('./files'), [
      // Filter to only include assets
      (templateTree: Tree) => {
        context.logger.info('Assets template - processing...');
        const filesBefore: string[] = [];
        templateTree.visit(path => filesBefore.push(path));
        context.logger.info(`Template files before asset filter: ${filesBefore.join(', ')}`);
        const assetsDir = templateTree.getDir('/assets');
        if (assetsDir) {
          context.logger.info('Found assets directory, keeping only assets...');
          // Keep only assets, remove everything else
          templateTree.visit((path) => {
            if (!path.startsWith('/assets')) {
              context.logger.info(`Deleting non-asset: ${path}`);
              templateTree.delete(path);
            } else {
              context.logger.info(`Keeping asset: ${path}`);
            }
          });

          // If targeting public folder, rename /assets/* to /* to remove the assets prefix
          if (targetAssetsFolder === publicPath) {
            context.logger.info('Renaming assets to remove /assets prefix for public folder');
            const assetsToRename: Array<{oldPath: string, newPath: string, content: Buffer}> = [];
            
            // Collect all assets that need to be renamed
            templateTree.visit((path) => {
              if (path.startsWith('/assets/')) {
                const entry = templateTree.get(path);
                if (entry && entry.content) {
                  const newPath = path.substring('/assets'.length); // Remove /assets prefix
                  assetsToRename.push({ oldPath: path, newPath, content: entry.content });
                }
              }
            });
            
            // Delete old paths and create new ones
            assetsToRename.forEach(({oldPath, newPath, content}) => {
              context.logger.info(`Renaming ${oldPath} to ${newPath}`);
              templateTree.delete(oldPath);
              templateTree.create(newPath, content);
            });
          }
        } else {
          context.logger.info('No assets directory found in template');
        }
        const filesAfter: string[] = [];
        templateTree.visit(path => filesAfter.push(path));
        context.logger.info(`Template files after asset filter: ${filesAfter.join(', ')}`);
        return templateTree;
      },
      // Move assets to target location
      move(normalize(`/${targetAssetsFolder}`)),
    ]);

    context.logger.info('Applying both template sources...');
    return chain([
      mergeWith(componentTemplateSource),
      mergeWith(assetsTemplateSource),
    ])(tree, context);
  };
}

function addDeclarationToNgModule(options: ModuleOptions & { defaultProject?: string; project?: string }): Rule {
  return (host: Tree) => {
    if (options.standalone) {
      return host;
    }

    const workspaceConfig = loadWorkspaceConfig(host);
    const project = getProjectConfig(workspaceConfig, options.project!);

    if (options.skipImport || !options.module) {
      // Use project sourceRoot to find the correct module search paths
      const sourceRoot = project.sourceRoot || join(project.root || '', 'src').replace(/\\/g, '/');
      const searchPaths = [
        `${sourceRoot}/app`,
        sourceRoot,
        normalize(join(sourceRoot, '..')), // Bubble up one level if needed
      ];

      let foundModule: Path | undefined;
      for (const searchPath of searchPaths) {
        foundModule = findModule(host, searchPath);
        if (foundModule) break;
      }

      options.module = foundModule;
      if (!options.module) {
        options.standalone = true;
        return host;
      }
    }

    const modulePath = options.module;
    const text = host.read(modulePath);
    if (text === null) {
      throw new SchematicsException(`File ${modulePath} does not exist.`);
    }
    const sourceText = text.toString('utf-8');
    const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);

    // Use project sourceRoot for component base path
    const sourceRoot = project.sourceRoot || join(project.root || '', 'src').replace(/\\/g, '/');
    const componentBasePath = `/${sourceRoot}`;

    const componentPath = `${componentBasePath}/${options.path}/${strings.dasherize(options.name!)}.component`;
    const relativePath = buildRelativePath(modulePath, componentPath);
    const componentChanges = addDeclarationToModule(source as any, modulePath, strings.classify(`${options.name}Component`), relativePath);
    const moduleChanges = addImportToModule(source as any, modulePath, strings.classify(`NgxExtendedPdfViewerModule`), 'ngx-extended-pdf-viewer');
    const recorder = host.beginUpdate(modulePath);
    for (const change of componentChanges) {
      if (change instanceof InsertChange) {
        recorder.insertLeft(change.pos, change.toAdd);
      }
    }
    for (const change of moduleChanges) {
      if (change instanceof InsertChange) {
        recorder.insertLeft(change.pos, change.toAdd);
      }
    }
    host.commitUpdate(recorder);
    return host;
  };
}

export function findModule(host: Tree, generateDir: string, moduleExt = MODULE_EXT, routingModuleExt = ROUTING_MODULE_EXT): Path | undefined {
  let dir: DirEntry | null = host.getDir(`/${generateDir}`);
  let foundRoutingModule = false;

  while (dir) {
    const allMatches = dir.subfiles.filter((p) => p.endsWith(moduleExt));
    const filteredMatches = allMatches.filter((p) => !p.endsWith(routingModuleExt));
    foundRoutingModule = foundRoutingModule || allMatches.length !== filteredMatches.length;

    if (filteredMatches.length == 1) {
      return join(dir.path, filteredMatches[0]);
    } else if (filteredMatches.length > 1) {
      throw new Error(
        'More than one module matches. Use the skip-import option to skip importing ' +
          'the component into the closest module or use the module option to specify a module.',
      );
    }

    dir = dir.parent;
  }

  console.error('');
  console.error(
    "Error: Couldn't find a module. Assuming this is a stand-alone project. You need to add these lines to the decorator of the ExamplePdfViewerComponent:",
  );
  console.error('');
  console.error('standalone: true,');
  console.error('imports: [NgxExtendedPdfViewerModule],');
  console.error('');

  return undefined;
}
