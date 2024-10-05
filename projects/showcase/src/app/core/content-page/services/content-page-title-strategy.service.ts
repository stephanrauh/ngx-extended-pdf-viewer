import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, PRIMARY_OUTLET, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class ContentPageTitleStrategyService extends TitleStrategy {
  private defaultTitle = 'Angular PDF Viewer Showcase';
  private documentTitleSuffix = ' - Angular Extended PDF Viewer';

  constructor(private readonly title: Title) {
    super();
  }
  override updateTitle(routerState: RouterStateSnapshot) {
    const route = this.getActivatedRoute(routerState);
    const title = this.getResolvedTitleForRoute(route);
    const pageTitle = route.data['pageTitle'];

    this.setTitle(pageTitle ?? title);
  }

  private setTitle(title?: string | null) {
    this.title.setTitle(`${title ?? this.defaultTitle} ${this.documentTitleSuffix}`);
  }

  private getActivatedRoute(snapshot: RouterStateSnapshot): ActivatedRouteSnapshot {
    let route: ActivatedRouteSnapshot = snapshot.root;
    let nextRoute: ActivatedRouteSnapshot | undefined = route;
    while (nextRoute !== undefined) {
      nextRoute = route.children.find((child) => child.outlet === PRIMARY_OUTLET);
      if (nextRoute) {
        route = nextRoute;
      }
    }
    return route;
  }
}
