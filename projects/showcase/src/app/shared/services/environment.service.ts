import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { EnvironmentKey, EnvironmentValueType } from '../../../environments/environment.type';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  get<K extends EnvironmentKey>(key: K): EnvironmentValueType<K> {
    return environment[key];
  }
}
