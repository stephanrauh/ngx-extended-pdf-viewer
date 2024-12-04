import { ToolbarPageComponent } from './toolbar/toolbar-page.component';
import { ButtonsPageComponent } from './buttons/buttons-page.component';
import { MenusPageComponent } from './menus/menus-page.component';
import { CSSRulesPageComponent } from './css-rules/css-rules-page.component';
import { Route } from '@angular/router';
import { RouteGroupData } from '../../shared/types/route-data.types';

export const customizationRoutes: Route[] = [
  {
    path: 'customization',
    data: <RouteGroupData>{
      key: 'customization',
      name: 'Customization',
    },
    children: [{
        path: 'css-rules',
        component: CSSRulesPageComponent,
        data: {
          pageTitle: 'CSS Rules',
        },
      },
    {
      path: 'menus',
      component: MenusPageComponent,
      data: {
        pageTitle: 'Menus'
      }
    },
    {
      path: 'buttons',
      component: ButtonsPageComponent,
      data: {
        pageTitle: 'Buttons'
      }
    },
    {
      path: 'toolbar',
      component: ToolbarPageComponent,
      data: {
        pageTitle: 'Toolbar'
      }
    }
  ],
  },
];
