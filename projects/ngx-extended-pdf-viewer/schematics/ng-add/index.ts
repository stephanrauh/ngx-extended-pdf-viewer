import { join, normalize, Path, strings } from '@angular-devkit/core';
import { apply, applyTemplates, chain, DirEntry, mergeWith, move, Rule, SchematicContext, SchematicsException, Tree, url } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { InsertChange } from '@schematics/angular/utility/change';
import { buildRelativePath, ModuleOptions, MODULE_EXT, ROUTING_MODULE_EXT } from '@schematics/angular/utility/find-module';
import * as ts from 'typescript';
import { addDeclarationToModule, addImportToModule } from './ast-utils';
import { Schema } from './schema';

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
    let projectName = options.project;
    if (!projectName || projectName === '') {
      projectName = options.defaultProject;
    }
    options.path = 'app/example-pdf-viewer';
    options.name = 'example-pdf-viewer';
    options.skipImport = false;
    const stable = options.stable;
    const exampleComponent = options.exampleComponent;
    if (!projectName) {
      throw new SchematicsException("The project doesn't exist.");
    }
    context.addTask(new NodePackageInstallTask());
    if (exampleComponent) {
      const folder = projectName === options.defaultProject ? '/src' : `/projects/${projectName}/src`;
      const exampleComponentRule = generateExampleComponent(folder, stable);
      return chain([exampleComponentRule, updateAngularJsonRule(projectName, stable), addDeclarationToNgModule(options)]);
    }
    // return updateAngularJson(tree, projectName, stable);
    return tree;
  };
}

export function updateAngularJsonRule(projectName: string, stable: boolean): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return updateAngularJson(tree, projectName, stable);
  };
}

function updateAngularJson(tree: Tree, projectName: string, stable: boolean): Tree {
  const content: Buffer | null = tree.read('./angular.json');
  const currentAngularJson = content!.toString();
  const json = JSON.parse(currentAngularJson);
  if (!json['projects'][projectName]) {
    throw new SchematicsException("The project isn't listed in the angular.json.");
  }
  const optionsJson = json['projects'][projectName]['architect']['build']['options'];
  if (!stable) {
    optionsJson['assets'].push({
      glob: '**/*',
      input: 'node_modules/ngx-extended-pdf-viewer/bleeding-edge/',
      output: '/bleeding-edge/',
    });
  } else {
    optionsJson['assets'].push({
      glob: '**/*',
      input: 'node_modules/ngx-extended-pdf-viewer/assets/',
      output: '/assets/',
    });
  }
  json['projects'][projectName]['architect']['build']['options'] = optionsJson;

  const updatedAngularJson = JSON.stringify(json, null, 2);
  tree.overwrite('./angular.json', updatedAngularJson);
  return tree;
}

function generateExampleComponent(folder: string, stable: boolean): Rule {
  const templateSource = apply(url('./files'), [
    applyTemplates({
      classify: strings.classify,
      dasherize: strings.dasherize,
      stable: stable,
    }),
    move(normalize(folder)),
  ]);

  return chain([mergeWith(templateSource)]);
}

function addDeclarationToNgModule(options: ModuleOptions): Rule {
  return (host: Tree) => {
    if (options.skipImport || !options.module) {
      options.module = findModule(host, 'src/app/pdf-viewer');
      if (!options.module) {
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

    const componentPath = `/src/${options.path}/${strings.dasherize(options.name)}.component`;
    const relativePath = buildRelativePath(modulePath, componentPath);
    const componentChanges = addDeclarationToModule(source as any, modulePath, strings.classify(`${options.name}Component`), relativePath);
    const moduleChanges = addImportToModule(
      source as any,
      'ngx-extended-pdf-viewer',
      strings.classify(`NgxExtendedPdfViewerModule`),
      'ngx-extended-pdf-viewer'
    );
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
          'the component into the closest module or use the module option to specify a module.'
      );
    }

    dir = dir.parent;
  }

  console.log("Couldn't find a module. Assuming this is a stand-alone project.");
  return undefined;
}
