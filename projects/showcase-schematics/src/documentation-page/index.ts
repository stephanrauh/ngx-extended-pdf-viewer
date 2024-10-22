import { apply, applyTemplates, chain, mergeWith, move, Rule, SchematicsException, Tree, url } from '@angular-devkit/schematics';
import { normalize, strings } from '@angular-devkit/core';
import { DocumentationPageSchema } from './documentation-page';
import * as ts from 'typescript';
import * as path from 'path';

export function documentationPage(_options: DocumentationPageSchema): Rule {
  return (tree: Tree) => {
    const basePath = 'projects/showcase/src/app/pages';
    const classifiedName = strings.classify(_options.pageTitle);
    const dasherizedName = strings.dasherize(_options.pageTitle);
    const componentName = `${classifiedName}PageComponent`;
    const targetDir = `${basePath}/${_options.path}/${dasherizedName}`;

    const templateSource = apply(url('./files'), [
      applyTemplates({
        classifiedName,
        dasherizedName,
        componentName,
        path: _options.path,
        includeDemo: _options.includeDemo,
        contentPageComponentPath: getRelativePath(targetDir, 'projects/showcase/src/app/shared/components/content-page/content-page.component'),
        markdownContentComponentPath: getRelativePath(targetDir, 'projects/showcase/src/app/shared/components/markdown-content.component'),
        splitViewComponentPath: getRelativePath(targetDir, 'projects/showcase/src/app/shared/components/split-view.component'),
        minifiedDirectivePath: getRelativePath(targetDir, 'projects/showcase/src/app/shared/directives/set-minified-library-usage.directive'),
      }),
      move(normalize(targetDir)),
    ]);

    addRouteToRoutesFile(tree, targetDir, _options.pageTitle, dasherizedName, componentName);

    return chain([mergeWith(templateSource)]);
  };
}

function getRelativePath(from: string, to: string): string {
  return path.relative(from, to).replace(/\\/g, '/');
}

function addRouteToRoutesFile(tree: Tree, targetDir: string, pageTitle: string, dasherizedName: string, componentName: string): void {
  const routesFilePath = findClosestRoutesFile(tree, targetDir);
  if (!routesFilePath) {
    throw new SchematicsException(`No routes.ts file found in the ancestor chain of ${targetDir}.`);
  }

  const routesFileContent = tree.read(routesFilePath);
  if (!routesFileContent) {
    throw new SchematicsException(`Could not read ${routesFilePath}.`);
  }

  const sourceFile = ts.createSourceFile(routesFilePath, routesFileContent.toString(), ts.ScriptTarget.Latest, true);

  const newRoute = `
    {
      path: '${dasherizedName}',
      component: ${componentName},
      data: {
        pageTitle: '${pageTitle}'
      }
    }
  `;

  const routesArray = sourceFile.statements.find(
    (node) => ts.isVariableStatement(node) && node.declarationList.declarations[0].name.getText().endsWith('Routes'),
  );
  if (!routesArray) {
    throw new SchematicsException(`Could not find routes array in ${routesFilePath}.`);
  }

  const routesArrayText = routesArray.getText();
  const updatedRoutesArrayText = routesArrayText.replace(/children: \[(.*?)]/s, (_, p1) => {
    const trimmed = p1.trim();
    const lastChar = trimmed.charAt(trimmed.length - 1);
    const separator = lastChar === ',' || lastChar === ';' ? '' : ',';
    return `children: [${trimmed}${separator}${newRoute}]`;
  });

  const updatedSourceFileText = sourceFile.getText().replace(routesArrayText, updatedRoutesArrayText);

  const relativeImportPath = path.relative(path.dirname(routesFilePath), `${targetDir}/${dasherizedName}-page.component`).replace(/\\/g, '/');
  const importStatement = `import { ${componentName} } from './${relativeImportPath}';\n`;
  const updatedFileTextWithImport = importStatement + updatedSourceFileText;

  tree.overwrite(routesFilePath, updatedFileTextWithImport);
}

function findClosestRoutesFile(tree: Tree, dir: string): string | null {
  let currentDir = dir;
  while (currentDir !== '/') {
    const files = tree.getDir(currentDir).subfiles;
    const routesFile = files.find((file) => file.endsWith('.routes.ts'));
    if (routesFile) {
      return path.join(currentDir, routesFile);
    }
    currentDir = path.dirname(currentDir);
  }
  return null;
}
