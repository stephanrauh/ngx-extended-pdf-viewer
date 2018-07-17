# ngx-extended-pdf-viewer

This library provides an embeddable
PDF viewer component. It's different from other approaches like ng2-pdf-viewer in that it
shows the full suite of UI widgets. In other words, it looks exactly like the PDF viewer of the browser.

## State of the art

The library is very young, but it _should_ already be useful. Use at own risk. I've managed
to get it up and running with an Angular 6 project.

The library has been developed with Angular 6, so probably npm will complain if you're using
an older version of Angular. In theory, ngx-extended-pdf-viewer should be compatible with
every Angular version since 2.0, but I don't support this actively.

The library is using a source-code build of the pdf.js library of Mozilla. As of version 0.3.0,
this build doesn't use one of the released versions, but the developer version 2.0.641 (which has been pulled directly from "master"). I didn't observe any problems so far, but proceed with care. If you run into problems due to the version of pdf.js, please open an issue on the [project bug tracker](https://github.com/stephanrauh/ExploringAngular/tree/master/embedding-pdf).

## Known bugs

If your application has two components using the pdf viewer, and you switch between both components,
the PDF viewer may be partially removed from the memory by the garbage collector. This results
in weird errors. If you run into this problem, try hiding the PDF viewer for a short time when switching
between the components, so the PDF viewer is completely removed and initialized from scratch again.

## Compatibility to Bootstrap (and other CSS frameworks)

Bootstrap interferes with the printing algorithm of pdf.js. Guard it with the media query to avoid unwanted effects like scaling the print to 65%. For example, if you're using SCSS and Bootstrap 4, include Bootstrap by adding this line to the global `styles.scss` file:

```css
@media screen {
  @import '../node_modules/bootstrap/scss/bootstrap';
}
```

## How to use the library

There's a minimalistic demo project at https://github.com/stephanrauh/ExploringAngular/tree/master/embedding-pdf.

1.  Install the library with npm i ngx-extended-pdf-viewer --save
2.  Open the file "angular.json" (or ".angular-cli.json" if you're using an older version of Angular)
    and add these two JavaScript files to the "scripts" section:

            "scripts": [
              "node_modules/ngx-extended-pdf-viewer/assets/pdf.js",
              "node_modules/ngx-extended-pdf-viewer/assets/pdf.worker.js",
              "node_modules/ngx-extended-pdf-viewer/assets/viewer.js"
            ]

3.  Add the translations to the assets by adding them to the "assets" section in the angular.json:

            "assets": [
              "src/favicon.ico",
              "src/assets",
              {
                "glob": "**/*",
                "input": "node_modules/ngx-extended-pdf-viewer/assets/locale",
                "output": "/assets/locale/"
              }
            ]

    If you need only one language, you can reduce the list to 'locale.properties' and your language folder.

    _Hint:_ There are two ways to define the language files needed for the labels of the buttons and screen elements of the PDF viewer. The second method is described below in the "internationalization" section.

4.  Add "NgxExtendedPdfViewerModule" to the import section of your module file. If your IDE doesn't find
    the import automatically, here it is:

            import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

5.  Now you can display the PDF file like so:

```html
&lt;ngx-extended-pdf-viewer src="'assets/example.pdf'" useBrowserLocale="true"&gt;&lt;/ngx-extended-pdf-viewer&gt;
```

## Configuration

Currently, the library is in a very early stage, so there's almost nothing to configure.

| _Attribute_      | _mandatory?_ | _default value_ |                                                                                                                                                                           _description_                                                                                                                                                                           |
| ---------------- | :----------: | :-------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| src              |     yes      |                 |                                                                                                                                                            defines the URL of the PDF file to display.                                                                                                                                                            |
| height           |      no      |      80vh       |                                                                                                                                    define the height of the PDF window. By default, it's 80vh (i.e. 80% of the screen height).                                                                                                                                    |
| useBrowserLocale |      no      |      false      |                                                                                                           if true, the PDF viewer assumes the locale files are in the assets folder. If false, you are responsible for providing the translated texts.                                                                                                            |
| delayFirstView   |      no      |        0        | Number of milliseconds to wait between initializing the PDF viewer and loading the PDF file. Most users can let this parameter safely at it's default value of zero. Set this to 1000 or higher if you run into timing problems (typically caused by loading the locale files after the PDF files, so they are not available when the PDF viewer is initialized). |

## Internationalization

### slow default way

If you add the translation files to your project as described above in step 3, the PDF viewer uses the browser language setting to determine which language to load. First, it loads the `locale.properties`, scans it for the desired language files, and loads the language file from the corresponding folder. That's two additional (and even consecutive) HTTP calls. That's slow, and it may even lead to errors if the network is already congested loading other resource files.

Don't forget to set the attribute `useBrowserLocale="true"` if you follow this approach.

#### slow way with custom translation files

If you want to use the slow way, but prefer to load the language files from a different URL, add a link to your application like so:

```html
<link rel="resource" type="application/l10n" href="https://www.example.com/locale/locale.properties">
```

In this case, don't set `useBrowserLocale` (or set it explicitely to false).

### inlining (aka embedding) the language files

Alternatively, you can provide the translations as a Json file. This Json file has to be part of the HTML page, like so:

```html
<script type="application/l10n">{"default_locale":"de","locales":{"de": ... }}</script>
```

The folder `node_modules/ngx-extended-pdf-viewer/assets/inline-locale-files` contains snippet files you can simply copy into your HTML page.
(As of version 0.3.0, there's only the German translation - other languages are following soon).

_Hint_: Sometimes you need to copy the HTML snippet into the index.html at the root folder of the Angular project. The bottom line is that the HTML snippet is already part of the DOM when the PDF viewer is initialized. Cluttering the root index file with the translations is an ugly and inflexible hack, but it works.

If you're using the "inline" approach, don't set `useBrowserLocale` (or set it explicitely to false).

# Troubleshooting

| Error message or description                                            |                                                                                                                                                                                                                               Solution                                                                                                                                                                                                                               |
| ----------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| "TypeError: Cannot read property 'setPagesCount' of null"               | The language files couldn't be loaded. If you're following the default approach, `useBrowserLocale="true"`. In any case, check whether the language files are part of your project and if they are loaded from the correct path. Note that there's no default translation. You have to load a language file for any language, including English. In rare cases the language files are loaded, just not in time. In this case increase the value of `delayFirstView`. |
| "TypeError: Cannot read property 'div' of undefined"                    |                                                      You're using two instances of `<ngx-extended-pdf-viewer>` and switch between them. Unfortunately, pdf.js seems to use a few global variables. These variables are shared between the two instances. Sometimes, this causes error messages. If this happens, hide the `<ngx-extended-pdf-viewer>` for a short time before switching to the second instance.                                                      |
| The browser locale is ignored.                                          |                                                                                                            The HTML snippets in the folder `node_modules/ngx-extended-pdf-viewer/assets/inline-locale-files` contain exactly one language. If you want to support multiple language, you have to add the additional languages to the Json data structure.                                                                                                            |
| sticky toolbar (when scrolling, the pdf file appears above the toolbar) |                                                                      This happens if you're using the z-index to position the `<ngx-extended-pdf-viewer>`. If you can't avoid to do so, add the global CSS rule `.body .toolbar { z-index: 0; }`. The PDF viewer works without the z-index of the toolbar. The only difference is that the shadow of the toolbar is hidden by the PDF document.                                                                      |
| Print also includes UI elements                                         |                                                              Usually, the entire screen is hidden automatically, but sometimes this fails, especially with widgets that are dynamically added, such as error messages, progress bars, and block UI overlays. Use media queries to hide the unwanted UI elements. For example, use something like `@media print { #modal-error-dialog: display none; }`.                                                              |

## Feedback, pull requests and bug reports

Pull requests and bug reports are welcome. Please send them to the bug tracker of
the project page: https://github.com/stephanrauh/ExploringAngular/tree/master/embedding-pdf

## Building the library from scratch (and updating to the latest version of Mozilla's pdf.js)

Have a look at https://github.com/stephanrauh/ngx-extended-pdf-viewer/blob/master/README.md

## License and Kudos

The library is based on https://github.com/mozilla/pdf.js, which has been published under an Apache V2 license.

Hence the licence of the ngx-extended-pdf-viewer is the Apache V2 license, too.

## Changelog

| Version    |                                                                                                                         Features                                                                                                                          |
| ---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| till 0.1.3 |                                                                              initial version based on the embeddable PDF-Viewer https://github.com/legalthings/pdf.js-viewer                                                                              |
| 0.2.0      |                                                                               use Mozilla's pdf.js (https://github.com/mozilla/pdf.js) directly. Update to pdf.js 2.0.641.                                                                                |
| 0.2.1      |                                                                                                                      minor bugfixes                                                                                                                       |
| 0.2.2      |                                                                                         Make the library compatible to the --prod build; improve the CSS locality                                                                                         |
| 0.3.0      |                                                                                Solved the timing issue; added options for internationalization; improved the docuemtation                                                                                 |
| 0.3.1      |                                                                                                                 improved the docuemtation                                                                                                                 |
| 0.3.2      | stop registering event listeners multiple times if the component is used multiple times; tentative bugfix that occurred when switching from a file with few thumbnails (i.e. pages) to another instance of the viewer showing a file with many thumbnails |
