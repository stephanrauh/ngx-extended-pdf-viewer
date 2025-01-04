import { AnnotationPageComponent } from './layers/annotation/annotation-page.component';
import { OverviewPageComponent } from './layers/overview/overview-page.component';
import { PreRenderingPageComponent } from './pre-rendering/pre-rendering-page.component';
import { ContextMenuPageComponent } from './context-menu/context-menu-page.component';
import { KeyboardPageComponent } from './keyboard/keyboard-page.component';
import { ModalDialogsPageComponent } from './modal-dialogs/modal-dialogs-page.component';
import { JavaScriptPageComponent } from './javascript/javascript-page.component';
import { InternationalizationPageComponent } from './internationalization/internationalization-page.component';
import { LinksPageComponent } from './links/links-page.component';
import { AuthenticationAndAuthorizationPageComponent } from './authentication-and-authorization/authentication-and-authorization-page.component';
import { RangeRequestsPageComponent } from './range-requests/range-requests-page.component';
import { Route } from '@angular/router';
import { RouteGroupData } from '../../shared/types/route-data.types';
import { PdfLayerPageComponent } from './layers/pdf/pdf-layer-page.component';
import { TexLayerPageComponent } from './layers/text/tex-layer-page.component';

export const configurationRoutes: Route[] = [
  {
    path: 'configuration',
    data: <RouteGroupData>{
      name: 'Configuration',
      key: 'configuration',
    },
    children: [
      {
        path: 'range-requests',
        component: RangeRequestsPageComponent,
        data: {
          pageTitle: 'Range Requests',
        },
      },
      {
        path: 'authentication-and-authorization',
        component: AuthenticationAndAuthorizationPageComponent,
        data: {
          pageTitle: 'Authentication and Authorization',
        },
      },
      {
        path: 'links',
        component: LinksPageComponent,
        data: {
          pageTitle: 'Links',
        },
      },
      {
        path: 'internationalization',
        component: InternationalizationPageComponent,
        data: {
          pageTitle: 'Internationalization',
        },
      },
      {
        path: 'java-script',
        component: JavaScriptPageComponent,
        data: {
          pageTitle: 'JavaScript',
        },
      },
      {
        path: 'layers',
        data: <RouteGroupData>{
          name: 'Layers',
          key: 'layers',
        },
        children: [
          {
            path: 'overview',
            component: OverviewPageComponent,
            data: {
              pageTitle: 'Overview',
            },
          },
          {
            path: 'text',
            component: TexLayerPageComponent,
            data: {
              pageTitle: 'Text Layer',
            },
          },
          {
            path: 'annotation',
            component: AnnotationPageComponent,
            data: {
              pageTitle: 'Annotation Layer',
            },
          },
          {
            path: 'pdf',
            component: PdfLayerPageComponent,
            data: {
              pageTitle: 'PDF Layers',
            },
          },
        ],
      },
      {
        path: 'modal-dialogs',
        component: ModalDialogsPageComponent,
        data: {
          pageTitle: 'Modal Dialogs',
        },
      },
      {
        path: 'keyboard',
        component: KeyboardPageComponent,
        data: {
          pageTitle: 'Keyboard',
        },
      },
      {
        path: 'context-menu',
        component: ContextMenuPageComponent,
        data: {
          pageTitle: 'Context Menu',
        },
      },
      {
        path: 'pre-rendering',
        component: PreRenderingPageComponent,
        data: {
          pageTitle: 'Pre-Rendering',
        },
      },
    ],
  },
];
