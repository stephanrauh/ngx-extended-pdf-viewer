import { Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class ContentPageTitleStrategyService extends TitleStrategy {
  private defaultTitle = 'Angular PDF Viewer Showcase';

  constructor(private readonly title: Title) {
    super();
  }
  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    const pageTitle = routerState.root.firstChild?.data['pageTitle'];

    this.setTitle(pageTitle ?? title);
  }

  private setTitle(title?: string | null) {
    this.title.setTitle(title ?? this.defaultTitle);
  }
}
