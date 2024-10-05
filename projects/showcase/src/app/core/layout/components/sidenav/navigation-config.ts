import { NavigationEntry, NavigationGroup, NavigationTarget } from './navigation-config.types';
import { routes } from '../../../../app.routes';
import { Route } from '@angular/router';

export const navigationConfig: NavigationEntry[] = buildNavigationConfig(routes);

function buildNavigationConfig(routes: Route[], path: string[] = []): NavigationEntry[] {
  const appRoutes = [...routes];
  const config: NavigationEntry[] = [];

  appRoutes.forEach((route) => {
    const childRoutes = route.children ?? [];
    const currentPath = [...path, route.path ?? ''];
    if (childRoutes.length > 0) {
      const children = buildNavigationConfig(childRoutes, currentPath);

      const group: NavigationGroup = {
        type: 'group',
        key: route.data?.key,
        displayName: route.data?.name,
        children,
      };
      config.push(group);
      return;
    }

    if (!route.path) {
      return;
    }

    const target: NavigationTarget = {
      type: 'target',
      displayName: route.data?.pageTitle,
      link: currentPath,
    };
    config.push(target);
  });

  return config;
}
