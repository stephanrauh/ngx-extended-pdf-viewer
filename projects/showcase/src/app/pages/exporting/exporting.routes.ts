import { BLOBPageComponent } from './blob/blob-page.component';
import { TextPageComponent } from './text/text-page.component';
import { ImagePageComponent } from './image/image-page.component';
import { Route } from '@angular/router';
import { RouteGroupData } from '../../shared/types/route-data.types';

export const exportingRoutes: Route[] = [
  {
    path: 'exporting',
    data: <RouteGroupData>{
      name: 'Exporting',
      key: 'exporting',
    },
    children: [{
        path: 'image',
        component: ImagePageComponent,
        data: {
          pageTitle: 'Image',
        },
      },
    {
      path: 'text',
      component: TextPageComponent,
      data: {
        pageTitle: 'Text'
      }
    },
    {
      path: 'blob',
      component: BLOBPageComponent,
      data: {
        pageTitle: 'BLOB'
      }
    }
  ],
  },
];
