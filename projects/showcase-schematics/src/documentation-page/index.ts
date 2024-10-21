import { apply, applyTemplates, chain, mergeWith, move, Rule, SchematicsException, Tree, url } from '@angular-devkit/schematics';
import { normalize, strings } from '@angular-devkit/core';
import { DocumentationPageSchema } from './documentation-page';
import { dasherize } from '@angular-devkit/core/src/utils/strings';
import * as ts from 'typescript';

export function documentationPage(_options: DocumentationPageSchema): Rule {
  return (tree: Tree) => {
    const templateSource = apply(url('./files'), [
      applyTemplates({
        dasherize: strings.dasherize,
        classify: strings.classify,
        name: _options.name,
        path: _options.path,
      }),
      move(normalize(`projects/showcase/src/app/pages/${_options.path}/${dasherize(_options.name)}`)),
    ]);

    addRouteToRoutesFile(tree, _options);

    return chain([mergeWith(templateSource)]);
  };
}

function addRouteToRoutesFile(tree: Tree, options: DocumentationPageSchema): void {
  const routesFilePath = `projects/showcase/src/app/pages/${options.path}/${dasherize(options.name)}.routes.ts`;
  if (!tree.exists(routesFilePath)) {
    throw new SchematicsException(`Routes file ${routesFilePath} does not exist.`);
  }

  const routesFileContent = tree.read(routesFilePath);
  if (!routesFileContent) {
    throw new SchematicsException(`Could not read ${routesFilePath}.`);
  }

  const sourceFile = ts.createSourceFile(routesFilePath, routesFileContent.toString(), ts.ScriptTarget.Latest, true);

  const newRoute = `
    {
      path: '${dasherize(options.name)}',
      component: ${strings.classify(options.name)}PageComponent,
      data: {
        pageTitle: '${strings.classify(options.name)}'
      }
    }
  `;

  const routesArray = sourceFile.statements.find(
    (node) => ts.isVariableStatement(node) && node.declarationList.declarations[0].name.getText() === 'basicsRoutes',
  );
  if (!routesArray) {
    throw new SchematicsException(`Could not find routes array in ${routesFilePath}.`);
  }

  const routesArrayText = routesArray.getText();
  const updatedRoutesArrayText = routesArrayText.replace(/children: \[(.*?)\]/s, `children: [$1,${newRoute}]`);

  const updatedSourceFileText = sourceFile.getText().replace(routesArrayText, updatedRoutesArrayText);
  tree.overwrite(routesFilePath, updatedSourceFileText);
}
