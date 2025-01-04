Checkboxes and radiobuttons are remarkable flexible in PDF forms:

Checkboxes usually don't map to boolean values. Instead, they often use "export values" like "Yes" and "No".
Checkboxes can be used as radiobuttons and vice versa.
ngx-extended-pdf-viewer aims to support all these options. However, even after so many years of development users report bugs because my original implementation was too simple. I hope I've managed to fix all the bugs now.

One result of my original misconception is that checkboxes both support boolean values and the real export values. However, the `(formData)` event always reports the export values. You need to convert it to boolean values yourself.

You can find the source code at https://github.com/stephanrauh/extended-pdf-viewer-showcase/tree/main/src/app/extended-pdf-viewer/forms.
