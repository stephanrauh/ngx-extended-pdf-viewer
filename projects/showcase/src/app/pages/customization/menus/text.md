`<ngx-extended-pdf-viewer>` allows you to customize the toolbar and the menu of the PDF viewer. 

You can:

- re-arrange the pre-defined items any way you like
- replace existing items by custom items - including your own icons, texts, and tooltips
- and add your own buttons, menu items, and even menus, implementing custom functions I can't even imagine

**But how to document this feature?**

I'm afraid you can't avoid reading the sourcecode of the UI. You find it in the [GitHub repository of ngx-extended-pdf-viewer](https://github.com/stephanrauh/ngx-extended-pdf-viewer/blob/main/projects/ngx-extended-pdf-viewer/src/lib/ngx-extended-pdf-viewer.component.html).


Nonetheless, I'm optimistic I can give you a head start with a couple of demos and a few hints:

- First of all, this [interactive demo](./toolbar) shows a few example implementations.
- The default UI naturally forms a tree. Below, you'll find a high-level abstraction of this tree. Your customization doesn't have to follow this structure. It's just the default.
- The customization hooks defined by <ngx-extended-pdf-viewer> allow you to modify certain subtrees. Currently there are nine hooks:
  - `[customToolbar]` allows you to modify the entire black bar above the PDF document.
  - `[customFreeFloatingBar]` allows you to add your own toolbar. The original use-case is a toolbar floating above the PDF file. But if you're familiar with CSS magic, you're probably not limited to that.
  - `[customSecondaryToolbar]` represents the menu at the right-hand side of the PDF viewer.
  - `[customFindbar]` allows you to define your own findbar.
  - `[customFindbarButtons]` allows you to modify the entire find bar (the black bar that's shown after typing CTRL+F).
  - `[customFindbarInputArea]` is responsible for a small part of the find bar: the input field and the previous/next buttons.
  - `[customSidebar]` defines your own sidebar. See the [custom sidebar demo](./sidebar).
  - `[customThumbnail]` See the [custom thumbnails demo](./thumbnails).
  - `[customPdfViewer]` is your door to modify everything except the CSS imports.
- The underlying PDF framework, pdf.js, recognizes the buttons and menu items by their id. If you want to modify an existing functionality, keep in mind you have to provide the id. Otherwise, pdf.js might raise an exception, and your custom button won't work.
- However, most buttons are component you can either use or copy. You can see the full list of toolbar buttons in the [GitHub repository of ngx-extended-pdf-viewer](https://github.com/stephanrauh/ngx-extended-pdf-viewer/blob/main/projects/ngx-extended-pdf-viewer/src/lib/toolbar/pdf-toolbar/pdf-toolbar.component.html).
- I'm sure there's a lot of headroom for improvements. Don't hesitate to report any shortcoming on the [bugtracker of ngx-extended-pdf-viewer](https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues).
