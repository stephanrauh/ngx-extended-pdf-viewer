Modal dialogs often remove the HTML code from the DOM before calling `ngOnDestroy()` of the `NgxExtendedPdfViewerComponent`, resulting in a couple of error messages on the console. To avoid this, call `ngOnDestroy()` manually before removing the HTML code. The demo shows how to do this with the Angular CDK dialog.

If you close the modal very quickly, you may see messages like "worker destroyed" or "transport destroyed" in the console log. This simply means that you've destroyed the PDF viewer while it's still rendering. If you need to get rid of these messages, register a custom [`globalThis.ngxConsoleFilter(logLevel, message)`](./developer-experience/filtering-console-log).

### TypeScript

```typescript
@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html'
})
export class ModalDialogComponent implements OnInit {
  private dialogRef = inject<DialogRef<void>>(DialogRef<void>);
  private pdfViewer = viewChild.required(NgxExtendedPdfViewerComponent);

  ngOnInit() {
    this.dialogRef.closed.subscribe((result) => {
      console.log('The dialog is about to be closed');
      // Here's the interesting bit:
      this.pdfViewer().ngOnDestroy();
    });
  }

  public onClose(): void {
    this.dialogRef.close();
  }
}
```
