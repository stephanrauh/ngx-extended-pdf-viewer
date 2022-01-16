import { Rule, SchematicContext, Tree, SchematicsException } from '@angular-devkit/schematics';
import { apply, url, applyTemplates, move, chain, mergeWith } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { Schema as MyServiceSchema } from './schema';

import { strings, normalize } from '@angular-devkit/core';

export function ngAdd(options: MyServiceSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    let projectName = options.project;
    if (!projectName || projectName === '') {
      projectName = options.defaultProject;
    }
    console.log(`Poject name: ${projectName}`);
    const stable = options.stable;
    console.log(`Using the ${stable ? 'bleeding edge' : 'stable'} version of ngx-extended-pdf-viewer.`);
    const exampleComponent = options.exampleComponent;
    if (exampleComponent) {
      console.log('Generating an example component');
    }
    if (projectName) {
      console.log(`Adding ngx-extended-pdf-viewer to the project '${projectName}'.`);
    } else {
      throw new SchematicsException("The project doesn't exist.");
    }
    context.addTask(new NodePackageInstallTask());
    if (exampleComponent) {
      const folder = projectName === options.defaultProject ? '/src/app/pdf-viewer' : `/projects/${projectName}/src/app/pdf-viewer`;
      const exampleComponentRule = generateExampleComponent(folder, stable);
      return chain([exampleComponentRule, updateAngularJsonRule(projectName, stable)]);
    }
    return updateAngularJson(tree, projectName, stable);
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
  console.log('Generating file to the folder ' + folder);
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
