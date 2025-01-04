## Which options do you have to display a PDF file in your Angular application?

There's a similar article at <a target="#" href="https://beyondjava.net/angular-pdf-viewers-2020">https://beyondjava.net/angular-pdf-viewers-2020</a> and an older text at <a target="#" href="https://www.beyondjava.net/ngx-extended-pdf-viewer">beyondjava.net/ngx-extended-pdf-viewer</a>.

## TLDR
In general, I recommend using either my own PDF viewer, ngx-extended-pdf-viewer, or the PDF viewer of Vadym Yatsyuk, <a href="https://www.npmjs.com/package/ng2-pdf-viewer">ng2-pdf-viewer</a>. Vadym's viewer is the tool of choice if you don't need the menu, the sidebar, or anything else beyond displaying the PDF file. ngx-extended-pdf-viewer is the tool of choice if you need the fancy UI, too.

If you need to display multiple PDF files simultaneously and if you don't mind using iFrames, I recommend <a target="#" href="https://www.npmjs.com/package/ng2-pdfjs-viewer">ng2-pdfjs-viewer</a>. The library has less features than ngx-extended-pdf-viewer, but its iFrame approach allows it do some tricks that make it unique. Such as opening a PDF file in a new tab or a new window, or - as I've mentioned before - displaying multiple PDF files side-by-side.

If you need to modify PDF files, that's the realm of the commercial solutions. I didn't do much market research, so take my hints with a grain of salt. PDFTron looks interesting, as well as the commercial sibling of ej2-angular-pdfviewer.

## Using the native browser support

In a way, it's crazy to use a library to display PDF files in a browser. Every modern browser can show PDF files natively. Just drag and drop a PDF file into the browser, and you'll see a PDF viewer that's every bit as powerful as Adobe's native PDF viewer.

Only - well, there are some outdated versions of our good old friend called Internet Explorer out there. Plus, many other browsers don't support PDF files. Sometimes it's not enough to focus on the evergreen browsers. Adding insult to injury, there's no standardized way to embed a PDF file on a web page, and the public API is limited. What you can do is using the `<object>` tag like so:

```html
<object data="https://example.com/test.pdf#page=2" type="application/pdf" width="100%" height="100%">
  <p>Your browser does not support PDFs. <a href="https://example.com/test.pdf">Download the PDF</a>.</p>
</object>
```

Philipp Spiess has an <a target="#" href="https://pspdfkit.com/blog/2018/open-pdf-in-your-web-app/">exhaustive roundup of this approach</a>. Highly recommended. Be warned: Along the way, he's trying to sell you a professional PDF tool which may or may not be useful. I wouldn't know because both BeyondJava.net and pdfviewer.net are very serious about never doing advertising. So I didn't even evaluate it.

## Enter pdf.js

Every other solution (well, as far as I know) is based on <a href="https://mozilla.github.io/pdf.js/">an open-source PDF viewer called pdf.js</a>. It's written in JavaScript, so it's easy to use the library in your own project. It's also the PDF viewer used by Firefox and Google Chrome. In other words: it's battle-proven and rock-solid.

Several tutorials are telling you how easy it is to use pdf.js. For example, the author I've already quoted, Philipp Spiess, <a href="https://pspdfkit.com/blog/2018/render-pdfs-in-the-browser-with-pdf-js/">has written a nice walkthrough</a>.

The catch is it's easy as long as you're happy with just displaying the PDF file without any bells and whistles. As soon as you want to add more features - such as scaling, searching, rotating, printing - complexity quickly gets through the roof. Most tutorials solve the problem by embedding Mozilla's web viewer in an iFrame. The good news is that this approach works. Nonetheless, in many projects, that's a no-go. iFrames went out of fashion for a reason.

What we're looking for is a simple but powerful solution.

## https://www.npmjs.com/package/ng2-pdfjs-viewer

Did I say nobody's using iFrames in 2020? A developer nicknamed Code Hippie does. As things go, they implemented their PDF viewer almost at the same time as I did. Their approach is very simple: create an Angular component wrapping the PDF viewer in an iFrame. You can send parameters to the PDF viewer using the URL. That's quite a few parameters, so chances are you're happy with this approach.

The iFrame approach is simple and robust. If you're not happy with ngx-extended-pdf-viewer, go for the library of Codehippie. You'll lose some options - but most likely you don't need them anyways.

As of December 2023, the library uses a rather old version of pdf.js (2.2), but that shouldn't be a problem in most applications.

## ng2-pdf-viewer: Displaying PDF files in a no-nonsense way

This library is the way to go if you just want to render PDF files and nothing else. No toolbar, no thumbnails, just the plain PDF file. <a href="https://www.npmjs.com/package/ng2-pdf-viewer">ng2-pdf-viewer</a> gives you a decent API and is popular enough to feel trustworthy. At the time of writing, it saw more than 150.000 downloads a month. Some time ago, I presented the library in this showcase, but I removed it again because of compatibility problem with current Angular versions. As of December 2023, the library uses a rather old version of pdf.js (2.6), but that shouldn't be a problem in most applications.

## ng2-image-viewer

<b>Warning:</b> ng2-image-viewer is no longer maintained. The GitHub project has been archived. Use this library at your own risk. Plus, the README.md file of the repository contains a link to a questionable site. It seems the base library, ImageViewer, has been abandoned, and it's website has been aquired by a betting portal. If you want to use this library, please be very careful. As a measure of caution, I've removed the hyperlinks. Nonetheless, the library still looks promising, so I don't want to remove this section.

This nice library is an image viewer at it's heart. The author, Breno Prata, took the ImageViewer library, wrapped in a carousel, and added PDF support to it.

As far as I can see, ng2-image-viewer relies on the browser to render the PDF file natively. Don't hope for Internet Explorer support. Plus, the PDF viewer is always shown completely, without options to customize it. Other than that, it's a nice little library if you need to display the PDF file in a carousel.

## Angular.js 1.x

Are you still using AngularJS 1.x? Then you should check out <a href="https://github.com/legalthings/angular-pdfjs-viewer">angular-pdfjs-viewer</a> is a fine library. Unfortunately, the authors ceased to maintain it, so use it at your own risk.

## ngx-extended-pdf-viewer

How does ngx-extended-pdf-viewer compare to the other options? Basically, it offers Internet Explorer 11 support, offers a wide range of attributes and even events. You can call a method when a document has been loaded or a page has been rendered. Plus, it offers two-way binding for many attributes, such as the page number and the zoom factor. You can store the user's zoom preference in the database and fetch it again the next morning, when the user starts working with a fresh browser.
