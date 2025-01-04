

## Prequisites and announcement

You can get the PDF viewer up and running in roughly two minutes. You need node.js, npm and a current version of Angular. This library aims to be compatible to the last four versions of Angular, which gives you two years time to update.

With very few exceptions, I only maintain the most current version of the viewer. As much as I'd like to provide bug fixes to older versions, I don't have enough time to spare.

## Just in case you haven't got an Angular project yet

The instructions below assume you've already got an Angular project. If you haven't, here's what to do:

- Install node.js. Make sure it's a current version with an even version number.
- Install the Angular CLI by running the command `npm i -g @angular/cli`.
- Create a new Angular app by running the command `ng new my-favorite-project`.

I've described these steps in more detail <a href="https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues/2010#issuecomment-1850778118">here</a>.

## Setting up the PDF viewer

### Schematics (recommended)

1. Open a terminal and navigate to the root folder of your project.
2. Run this command and accept the defaults:
```batch
ng add ngx-extended-pdf-viewer@latest
``` 
3. If you need a specific version of ngx-extended-pdf-viewer, replace `@latest` by the version number you need. `@latest` gets you the newest stable version. If you omit `@latest`, Angular tries to detect the latest compatible version. Note that this may be an alpha version. Usually these alpha version are useful, too, but they ship without promises. By definition, an alpha version is a version that might be broken.
4. Add the new component `<app-example-pdf-viewer>` to your `<app-component>` to display the PDF file.

After that, you'll probably want to delete the example PDF file and move the code out of the example component.

### Angular CLI

Install the library with `npm install`:

```batch
npm i ngx-extended-pdf-viewer --save
```

Next, open the file `angular.json` (or `.angular-cli.json` if you're using an older version of Angular) and configure Angular to copy the `assets` folder of the library into the `assets` folder of your application:

```json
  "assets": [
    "src/favicon.ico",
    "src/assets",
    {
      "glob": "**/*",
      "input": "node_modules/ngx-extended-pdf-viewer/assets/",
      "output": "/assets/"
    }
  ],
  "scripts": []
```

This simply copies the entire assets folder. If you're concerned about disk memory, you can omit the subfolder `additional-locale`. If you need only one language, you can reduce the list to `locale.json` and your language folder.

_Hint:_ There are two ways to define the language files needed for the labels of the buttons and screen elements of the PDF viewer. The second method is described below in the "internationalization" section.

You can choose between the stable release of pdf.js or the "bleeding edge" version. That latter is a version I regularly update with the newest changes from the Mozilla team. But be warned, the developer version is bleeding edge. It's a far cry from being a thoroughly tested release. The automated tests at Mozilla are fairly good, but it's always possible I do a mistake when merging the changes.

If you want to use the "bleeding edge" version of pdf.js, add these lines:

```json
  "assets": [
    "src/favicon.ico",
    "src/assets",
    {
      "glob": "**/*",
      "input": "node_modules/ngx-extended-pdf-viewer/bleeding-edge/",
      "output": "/bleeding-edge/"
    }
  ],
  "scripts": []
```


You will also need to add those lines to your component :
1. An import statement
```ts
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
```
2. A line in your constructor
```ts 
pdfDefaultOptions.assetsFolder = 'bleeding-edge';
```

#### Almost there!

Add `NgxExtendedPdfViewerModule` to the import section of your module file. If your IDE doesn't find
the import automatically, here it is:

```typescript
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
```

Now you can display the PDF file like so:

```html
"tr<ngx-extended-pdf-viewer [src]="'assets/example.pdf'"></ngx-extended-pdf-viewer>
```

### JHipster 6.6 + ngx-extended-pdf-viewer 2.0.0+

**Caveat**: I don't support non-standard installations. This includes JHipster. Nonetheless, I've collected some hint that might help you get the PDF viewer up and running.

**Hint**: There's a demo repository featuring JHipster 6.6 and ngx-extended-pdf-viewer 2.0.0-alpha.0 at
<a target="#" href="https://github.com/stephanrauh/PDF-Hipster">https://github.com/stephanrauh/PDF-Hipster</a>.

Locate the `CopyWebpackPlugin` in the file `webpack.common.js` (currently line 66-75) and add this line:

```javascript
new CopyWebpackPlugin([
  { from: "./node_modules/ngx-extended-pdf-viewer/assets", to: 'assets' },
  ...
```

#### Almost there!

Add `NgxExtendedPdfViewerModule` to the import section of your module file. If your IDE doesn't find
the import automatically, here it is:

```typescript
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
```

Now you can display the PDF file like so:

```html
<ngx-extended-pdf-viewer [src]="'assets/example.pdf'"></ngx-extended-pdf-viewer>
```

_Hint:_ If you are using JHipster, note there's no `assets` folder, so most likely the path of the URL is something like `[src]="'content/example.pdf'"`.


### older JHipster or Webpack

**Caveat**: I don't support non-standard installations. This includes JHipster. Nonetheless, I've collected some hint that might help you get the PDF viewer up and running.

1. Install the library with `npm install`:

```batch
npm i ngx-extended-pdf-viewer --save
```


1. Locate the `CopyWebpackPlugin` in the file `webpack.common.js` (currently line 70) and add this line:

```javascript
new CopyWebpackPlugin([
  { from: "./node_modules/ngx-extended-pdf-viewer/assets/locale", to: 'content/assets/locale' },
```

2. Copy the files
- `node_modules/ngx-extended-pdf-viewer/assets/pdf.worker.min.js` and
- `node_modules/ngx-extended-pdf-viewer/assets/pdf.min.js`
  manually to `src/main/webcontent/app`.

3. Copy the file `node_modules/ngx-extended-pdf-viewer/assets/viewer.min.js` manually to a new folder `src/main/webcontent/app/web`.

4. Add these lines to the imports section of the `app.main.ts` file:

```typescript
require('ngx-extended-pdf-viewer/assets/pdf.min.js');
require('ngx-extended-pdf-viewer/assets/pdf.worker.min.js');
require('ngx-extended-pdf-viewer/assets/web/viewer.min.js');
```

5. If you want to support Internet Explorer 11 and some other older browsers, also copy the ES5 version of these files:
- `node_modules/ngx-extended-pdf-viewer/assets/pdf.worker-es5.min.js` and
- `node_modules/ngx-extended-pdf-viewer/assets/pdf-es5.min.js`
- `node_modules/ngx-extended-pdf-viewer/assets/viewer-es5.min.js`

6. If you need to debug the PDF viewer, you may want to use the non-minified versions of these files: `pdf.worker.js`, `pdf.js`, and `viewer.js`.

7. Open the freshly copied pdf.js file, locate the function `webpackUniversalModuleDefinition()` and replace the first ten lines by this version:

```typescript
(function webpackUniversalModuleDefinition(root, factory) {
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if(typeof define === 'function' && define.amd)
    define("pdfjs-dist/build/pdf", [], factory);
  else if(typeof exports === 'object')
    exports["pdfjs-dist/build/pdf"] = factory();
  // else <-- delete line
  window["pdfjs-dist/build/pdf"] = root["pdfjs-dist/build/pdf"] = root.pdfjsLib = factory(); // <-- modified line
})(this, function() {
```

#### Almost there!

Add `NgxExtendedPdfViewerModule` to the import section of your module file. If your IDE doesn't find 
the import automatically, here it is:

```typescript
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
```

Now you can display the PDF file like so:

```html
<ngx-extended-pdf-viewer [src]="'assets/example.pdf'"></ngx-extended-pdf-viewer>
```

_Hint:_ If you are using JHipster, note there's no `assets` folder, so most likely the path of the URL is something like `[src]="'content/example.pdf'"`.


### Still got difficulties?

Please refer to the [troubleshooting page](/troubleshooting)
