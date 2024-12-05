import { ZoomPageComponent } from './zoom/zoom-page.component';
import { MobileDevicesPageComponent } from './mobile-devices/mobile-devices-page.component';
import { ThemingPageComponent } from './theming/theming-page.component';
import { DisplayOptionsPageComponent } from './display-options/display-options-page.component';
import { PresentationModePageComponent } from './presentation-mode/presentation-mode-page.component';
import { Route } from '@angular/router';
import { RouteGroupData } from '../../shared/types/route-data.types';
import { MultiplePdfsPageComponent } from './multiple-pdfs/multiple-pdfs-page.component';

export const viewingRoutes: Route[] = [
  {
    path: 'viewing',
    data: <RouteGroupData>{
      name: 'Viewing',
      key: 'viewing',
    },
    children: [{
        path: 'presentation-mode',
        component: PresentationModePageComponent,
        data: {
          pageTitle: 'Presentation / Fullscreen Mode',
        },
      },
      {
        path: 'display-options',
        component: DisplayOptionsPageComponent,
        data: {
          pageTitle: 'Display Options',
        },
      },
      {
        path: 'multiple-pdfs',
        component: MultiplePdfsPageComponent,
        data: {
          pageTitle: 'Multiple PDFs',
        },
      },
    {
      path: 'theming',
      component: ThemingPageComponent,
      data: {
        pageTitle: 'Theming'
      }
    },
    {
      path: 'mobile-devices',
      component: MobileDevicesPageComponent,
      data: {
        pageTitle: 'Mobile Devices'
      }
    },
    {
      path: 'zoom',
      component: ZoomPageComponent,
      data: {
        pageTitle: 'Zoom'
      }
    }
  ],
  },
];
