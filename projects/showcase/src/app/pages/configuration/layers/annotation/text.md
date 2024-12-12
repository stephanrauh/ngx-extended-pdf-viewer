
Interactive forms are part of this layer.

This example uses the event listener `(annotationLayerRendered)` to fix a layout error in the document itself. The author has added a copyright box on page ii. By default, the box is too large, so the box is clipped. That looks attractive, too, but this demo reduces the size of the box to make it fit into the box without clipping it. As a side effect, the underlying link to a popular book vendor becomes visible.

**Caveat**: the `(annotationLayerRendered)` trick does not work in the thumbnail view.

### HTML

```html
<ngx-extended-pdf-viewer
  [src]="'./assets/pdfs/The Public Domain - Enclosing the Commons of the Mind.pdf'"
  (annotationLayerRendered)="onAnnotationLayerRendered($event)"
  [zoom]="'auto'">
</ngx-extended-pdf-viewer>
```

### TypeScript

```typescript
public onAnnotationLayerRendered(event: AnnotationLayerRenderedEvent): void {
  const copyrightHint = event.source.div.querySelector('.freeTextAnnotation');
  if (copyrightHint && copyrightHint instanceof HTMLElement) {
    copyrightHint.style.left="20%";
    const canvas = copyrightHint.querySelector("canvas");
    if (canvas) {
        canvas.style.width="75%";
        canvas.style.height="75%";
        canvas.style.top="20px";
        canvas.style.left="10%";
    }
  }
}
```
