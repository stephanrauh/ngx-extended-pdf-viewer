import { ModuleOptions } from '@schematics/angular/utility/find-module';

export interface Schema extends ModuleOptions {
  project?: string;
  defaultProject: string;
  stable: boolean;
  exampleComponent: boolean;
  standalone: boolean;
}
