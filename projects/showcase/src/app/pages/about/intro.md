# What is &lt;ngx-extended-pdf-viewer&gt;?

We all know the Adobe's PDF viewer. Almost certainly you've also seen PDF documents in a browser. Every modern browser supports PDF files natively.

`<ngx-extended-pdf-viewer>` brings precisely this browser to the Angular world. When I started to investigate the topic, I quickly learned that it's not easy to display a PDF file natively. There are ways to do it - but if you want to implement an application running on all platforms, things get difficult in virtually no time. Especially if you need to support Internet Explorer 11.

This project simply wraps Mozilla's PDF viewer as an Angular component. It's the same PDF viewer both Google Chrome and Mozilla Firefox use. In other words: it uses a battle-proven, rock-solid technology.

## Talking about the memory footprint: how bad is it?

There's no point denying it: viewing PDF files comes with a huge memory penalty. Mozilla's PDF viewer consists of four files, weighing in at roughly two megabytes. Minification and Gzip reduce this to roughly half a megabyte.

However, almost every alternative I know also relies on Mozilla's PDF viewer, so you get a similar memory and bandwidth penalty.

## Is pdfviewer.net open to document other PDF viewers?

Yes, of course. At the moment I focus on my own project. In the long run, I intend to include other PDF viewer as well as approaches to view PDF natively in the browser.
