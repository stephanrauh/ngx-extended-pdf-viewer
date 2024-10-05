Open a terminal and enter this command at your project's root folder:

```cmd
ng add ngx-extended-pdf-viewer
```

This configures your project, adds an example component and an example PDF file, so you just need to add the new `<add-example-pdf-viewer>` tag to one of your `*.html` files.

## Basic Parameters

This demo shows the default viewer. The default configuration is pretty straightforward, as you can see on the right-hand side.

If you've set up the PDF viewer, but are missing the find dialog and the text selection: that's a performance optimization. Activate the `[textLayer]` to enable these two features.

The height attribute can often be omitted, too. The showcase only needs it because its layout framework, Angular Material, sets the height of the PDF viewer to zero pixels by default.

## Page and Page Label

The page is the number page number. It always starts with 1.

The page label is the page number assigned by the author of the PDF document. For example, the document below uses roman numbers for the table of contents and arabic numbers for the main body.

If you try to use both `[(page)]` and `[(pageLabel)]` with two-way binding, you'll run into `ExpressionChangedAfterItHasBeenCheckedErrors`. To prevent this, you'll want to adopt the `OnPush` change detection strategy.

## Color Themes

You can choose between two predefined color themes, or you can provide your own custom color theme. Note that switching the themes doesn't work reliably without a full reload (i.e. hitting the F5 or CMD+R key). This demo reloads the page programmatically each time you change the theme.

## Height

If you omit the [height] attribute, the PDF viewer tries to use all the available vertical space. To make this work, make sure the surrounding container is large enough to contain the PDF viewer. By default, many CSS frameworks set the height of an empty container to zero pixels. You can use the height attribute to work around this limitation or to fine-tune the amount of screen estate you need.
