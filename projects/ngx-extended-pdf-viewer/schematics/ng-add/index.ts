import { Rule, SchematicContext, Tree, SchematicsException } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { Schema as MyServiceSchema } from './schema';

export function ngAdd(options: MyServiceSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    return updateAngularJson(options, tree);
  };
}

export function updateAngularJson(options: MyServiceSchema, tree: Tree): Tree {
  const content: Buffer | null = tree.read('./angular.json');
  const currentAngularJson = content!.toString();

  let projectName = options.project;
  if (!projectName || projectName === '') {
    projectName = options.defaultProject;
  }
  console.log(`Poject name: ${projectName}`);
  const stable = options.stable;
  console.log(`Using the ${stable? 'bleeding edge': 'stable'} version of ngx-extended-pdf-viewer.`);
  const exampleComponent = options.exampleComponent;
  if (exampleComponent) {
    console.log("Generating an example component");
  }
  if (projectName) {
    console.log(`Adding ngx-extended-pdf-viewer to the project '${projectName}'.`);
  } else {
    throw new SchematicsException("The project doesn't exist.");
  }

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
