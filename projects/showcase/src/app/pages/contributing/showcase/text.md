# Contributing to the Showcase-Page

Found a bug, typo or got any ideas for improvement for this Showcase? Every help is welcome! On this page you will find a guide on how to contribute.

## Prerequisites

To get the repository working, you have to first complete the setup on the [PDF Viewer Contribution Page](./contributing/pdf-viewer).

## Setup local environment

1. Build the ngx-extended-pdf-viewer
   1. ``npm run build``
   2. This is necessary as the showcase depends on it
2. Build the schematics
   1. ``npm run build-schematics``
3. Done.

Now you can serve the showcase by running ``npm run serve:showcase``.

## File Structure

Within _showcase/src/app_ you find multiple subfolders. Here is what they are meant for.

- _core_: Contains components, directives, service, etc. that are either only used once in the entire app (e.g.: `layout.component.ts`) or that are used by such (e.g.: `block-on-open-sidebar.directive.ts`)
- _pages_: Contains all the documentation pages. The structure is representative of the menu structure. See also [Building the menu](#Building the menu). The pages are organized by topics.
- _shared_: Contains components, directives, service, etc. that are shared between multiple places (e.g.: `markdown-content.component.ts`)


## Building the menu

To avoid manually managing all aspects of the menu, it is build automatically based on the `*.routes.ts` files.

`app.routes.ts` is the entry point for the routes and essentially defines the order in which the page topics (About,Basics, etc.) are appearing. What matters is the order in which they get spread into the app routes.

**Example**

```ts
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'about/introduction',
  },
  ...aboutRoutes,
  ...basicsRoutes,
  ...contributingRoutes,
  ...configurationRoutes,
  ...viewingRoutes,
  ...findingRoutes,
  ...customizationRoutes,
  ...formsRoutes,
  ...printingRoutes,
  ...securityRoutes,
  ...exportingRoutes,
  ...developerExperienceRoutes,
];

```
### Topic Route Files

Each of the route files follow the same structure. They are placed in the top level of their topic folders. That means the `basics.routes.ts` is located under `showcase/src/app/basics` and the one for printing under `showcase/src/app/printing`.

All route files only define one routes array with one top-level route. The path of this route must be the same as the topic. For example the `basics.routes.ts` has the path 'basics'. This route also always is a route group, which means it does not load any components and adds `RouteGroupData`.

#### Route Groups

A route group does not load any component and only has children. For its data property it adds an object with a `key` (lowercase) and a `name` property (readable string). For type safety we add `<RouteGroupData>` in front of the object.

**Example**
```ts
{
  path: 'basics',
    data: <RouteGroupData>{
    key: 'basics', // defines key for tracking
    name: 'Basics', // appears in the menu 
  },
    children: [
      //...
  ],
},
```

#### Route Targets

A route target loads a component and cannot have children. For its data property it adds an object with a `pageTitle` property. This property is only used as the main title (`<h1>`) for pages that use the `content-page.component`. All other pages must define their own main title. For type safety we add `<RouteData>` in front of the data object.

**Example**
```ts
{
  path: 'getting-started',
    component: GettingStartedPageComponent,
    data: <RouteData>{
    pageTitle: 'Getting Started', // main title of the page
  },
},
```
#### Putting it all together

The `navigation-config.ts` under _showcase/src/app/core/layout/sidenav_ puts everything together. If you are interested in how that works, this is the place to go. The resulting navigation config then gets used normally in the sidenav component.

## Displaying a documentation page

Besides a few special pages (like this one), all pages use the same layout. This is defined in the `content-page.component` under _showcase/src/app/shared/content-page_. By doing so we can ensure that changes are reflected on all pages equally.

All documentation pages use a tabbed layout. Some may only have one tab, while some have more. That depends on the content. All pages (except the special ones) have at least a "Documentation" tab. Some have a "Demo" tab in addition.

### Documentation Tab

The content of the documentation page is coming from its `text.md` file. This file contains the actual documentation and, if applicable, code examples. It should not contain anything else (no controls, demos, etc.). However, it is allowed to use multiple markdown files if necessary. This could be done, if you need to share the same text on multiple pages. Generally we aim to keep the amount of files to manage low.

The big advantage of having the documentation in markdown is, that we can make changes easily without worrying about any HTML.

**Example of minimal documentation page**
```ts
@Component({
  selector: 'pvs-getting-started-page',
  standalone: true,
  imports: [ContentPageComponent, MarkdownContentComponent],
  template: `<pvs-content-page>
    <pvs-markdown src="/assets/pages/basics/getting-started/text.md" />
  </pvs-content-page>`,
})
export class GettingStartedPageComponent {}
```

**Note**: All other layouting task are handled by the content page component.

### Demo Tab

A lot of documentation comes with an interactive demo. This demo is always placed in a separate tab, to keep everything organized and consistent.

The demo is always placed in an `ng-template` and in a `split-view.component`. The controls for the demo are on the left, the PDF Viewer on the right.

The PDF Viewer always need the following three directives applied (SHOWCASE ONLY):
- `pvsSetMinifiedLibraryUsage`
- `pvsSetDefaultViewerHeight`
- `pvsSetDefaultZoomLevel`

those directives ensure that we can set default values across the page, without needing to update every single page.

There is one exception though: If your demo requires a specific height or zoom level, you can skip those directives. The `pvsSetMinifiedLibraryUsage` must never be skipped.

**Example of documentation page with a demo**
```ts
@Component({
  selector: 'pvs-blobs-page',
  standalone: true,
  imports: [
    ContentPageComponent,
    MarkdownContentComponent,
    NgxExtendedPdfViewerModule,
    SplitViewComponent,
    SetMinifiedLibraryUsageDirective,
    ReactiveFormsModule,
    FormsModule,
    ButtonDirective,
    SetDefaultViewerHeightDirective,
    SetDefaultZoomLevelDirective,
  ],
  template: `<pvs-content-page [demoTemplate]="demo">
    <pvs-markdown src="/assets/pages/basics/file-sources/blobs/text.md" />
    <pvs-markdown src="/assets/pages/basics/file-sources/shared.md" />
    <ng-template #demo>
      <pvs-split-view>
        
        // Demo Controls go here
        
        <ngx-extended-pdf-viewer
          slot="end"
          [src]="src"
          [textLayer]="true"
          [showPresentationModeButton]="true"
          pvsSetMinifiedLibraryUsage
          pvsSetDefaultViewerHeight
          pvsSetDefaultZoomLevel
        />
      </pvs-split-view>
    </ng-template>
  </pvs-content-page>`,
})
export class BLOBsPageComponent {
  // Demo code goes here
}

```

**Note**: When adding inputs, radio buttons, etc. please use the same structure and CSS classes as the other pages. This ensures a consistent look.


## Adding a new page

Now that you know the anatomy of a documentation page, let's talk about how to actually add a new page.

To make this easier we added a schematic to handle pretty much everything for you. So you do not need to remember how to set everything up. 

To run this schematic, first ensure you have built them. If you followed the setup guide above, you should be good to go. Otherwise, run `npm run build-schematics`.

When the schematics are build, you can run `npm run add-documentation-page`. This schematic will prompt you for some information. All prompts have descriptions.

### Limitations

This schematic is not able to create a nested documentation page, like the file source pages. If you need to that, first create the sub-menu group, if it doesn't already exist. Then run the schematic with the actual target path. Once the schematic is done, manually move the newly created route to its actual parent. Be sure to update the path to the `text.md` file, in the new component, too.

## Adding a new top level menu group

Since this should not be a common use case, there is no schematic for this. Here are the steps to manually create a new group.

1. Under `showcase/src/app/pages` create a new folder with the name of the menu group (e.g.: new-stuff)
2. Create a new routes file in your new folder (e.g.: `new-stuff.routes.ts`) and paste the template from below. Fill in the missing info and ensure it follows the convention mentioned above.
3. Add the new routes array to `app.routes.ts` with the spread operator. Place it where it makes most sense. (e.g.: `...newStuffRoutes`)

Be aware that the new group will only show once it actually has children.

**Template**
Replace "new-stuff" with the name of the new menu group
```ts
import { Route } from '@angular/router';
import { RouteGroupData } from '../../shared/types/route-data.types';

export const newStuffRoutes: Route[] = [
  {
    path: 'new-stuff',
    data: <RouteGroupData>{
      name: 'New Stuff',
      key: 'new-stuff',
    },
    children: [
    ],
  },
];

```

## Styling

For styling we are using [Tailwind](https://tailwindcss.com). Some extensions and configurations were made for this showcase, so be sure to familiarize yourself with those.

You can find the _styles.css_ under _showcase/src_ and the _tailwind.config.js_ in the repository root.

## UI Libraries

We are not using any UI Library for this showcase.

## General Tips

If you are unsure on how to approach something, look at the already existing code. If nothing covers your use case, either ask in advance or make reasonable assumptions.
