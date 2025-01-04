Sometimes PDF files are large, even huge. By default, the PDF loader doesn't load the entire PDF file. Instead, it loads it in chunks, and it uses streaming if the server allows it to do so. So the viewer can display the first page while it's still loading the other pages.

Most of the time, you don't have to configure this feature (unless you want to switch it off). It just works. If it doesn't, check if your server supports range requests. If it does, the response headers have the attributes

- "Content-Length"
- "Accept-Ranges": "bytes",
- "Content-Encoding"

## CORS

If your PDF file is served by a different server than the Angular application, you must add the CORS headers to the response. Here's a simple demo server sending the correct headers:

### TypeScript

```typescript
const http = require("http");
const port = process.env.PORT || 3000;

const { stat, createReadStream } = require("fs");
const { promisify } = require("util");
const { pipeline } = require("stream");
const samplePDF = "./demo.pdf";
const fileInfo = promisify(stat);

http
  .createServer(async (req, res) => {

    /** Calculate Size of file */
    const { size } = await fileInfo(samplePDF);
    const range = req.headers.range;
    console.log(size)

    /** Check for Range header */
    if (range) {
      /** Extracting Start and End value from Range Hea der */
      let [start, end] = range.replace(/bytes=/, "").split("-");
      start = parseInt(start, 10);
      end = end ? parseInt(end, 10) : size - 1;

      if (!isNaN(start) && isNaN(end)) {
        start = start;
        end = size - 1;
      }
      if (isNaN(start) && !isNaN(end)) {
        start = size - end;
        end = size - 1;
      }

      // Handle unavailable range request
      if (start >= size || end >= size) {
        // Return the 416 Range Not Satisfiable.
        res.writeHead(416, {
          "Content-Range": `bytes */${size}`
        });
        return res.end();
      }

      /** Sending Partial Content With HTTP Code 206 */
      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${size}`,
        "Accept-Ranges": "bytes",
        "Content-Length": end - start + 1,
        "Content-Type": "application/psdf",
        "Access-Control-Allow-Origin": "http://localhost:4200"
      });

      const readable = createReadStream(samplePDF, { start, end });
      pipeline(readable, res, err => {
        console.log(err);
      });

    } else {

      res.writeHead(200, {
        "Access-Control-Expose-Headers": "Accept-Ranges",
        "Access-Control-Allow-Headers": "Accept-Ranges,range",
        "Accept-Ranges": "bytes",
        "Content-Length": size,
        "Content-Type": "application/pdf",
        "Access-Control-Allow-Origin": "http://localhost:4200"
      });

      if (req.method === "GET") {
          const readable = createReadStream(samplePDF);
          pipeline(readable, res, err => {
            console.log(err);
          });	   
      } else {
        res.end();
      }

    }
  })
  .listen(port, () => console.log("Running on 3000 port"));
```

Kudos go to Chetan Patil who helped me figure this out.

If you want to dig deeper: Vishal Patel has written an [article on range requests](https://medium.com/@vishal1909/how-to-handle-partial-content-in-node-js-8b0a5aea216) and how to implement them in a simple node.js server.

## Disable Range Request and Lazy Loading

The [default options](/basics/default-options) disableStream and disableAutoFetch allow you to switch off the feature. In most cases, this means it takes longer until the PDF file is shown, so use this option only as a last resort.

**Caveat**: When I tried this, I didn't manage to disable range request. Chances are the feature is broken.
