# ngx-extended-pdf-viewer

Bringing Mozilla's pdf.js to the Angular world. Well, not just displaying PDFs. If you only need the base functionality, I'll happily pass you to [the project of Vadym Yatsyuk](https://github.com/vadimdez/ng2-pdf-viewer/). Vadym does a great job delivering a no-nonsense PDF viewer. However, if you need something that can easily pass as the native viewer on a gloomy day, mgx-extended-pdf-viewer is your friend.

# Features

- Searching
- Printing
- Sidebar with thumbails, outlines, and attachments
- Rotating
- Download and upload
- Zoom
- Full-screen mode
- various selection tools
- standard display or even / odd spreads (like a book)
- various approaches to scrolling (vertical, horizontal, "wrapped" scrolling)
- Internationalization (providing translations to several dozen languages)
- plus the ability to deactivate each of these features.

Not to mention the ability to display PDF files, running on Mozilla's pdf.js 2.0.943.

## Build and run the demo project

1.  ng build ngx-extended-pdf-viewer
2.  npm run package
3.  ng serve -o

Now the (tiny) demo app will automatically reload if you change any of the source files.

## Build or update the library

See projects/ngx-extended-pdf-viewer/how-to-build.md.
