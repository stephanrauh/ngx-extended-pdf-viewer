It can happen that the PDF form shows a different value than what was set through your application. That's because the PDF form has its own default value.

The Angular application passes a different default value using `[formData]`. But because the value gets passed _before_ the page has loaded, the default value of the PDF form takes precedence.

To ensure that the value coming from your code is used instead, you have to delay populating `[formData]` until the page has been rendered. Which approach you should use highly depends on what you do with the viewer and the form data.

Here are some ideas:
- Use `ngAfterViewInit`
- Use `pageRendered` event of the `ngx-extended-pdf-viewer`
