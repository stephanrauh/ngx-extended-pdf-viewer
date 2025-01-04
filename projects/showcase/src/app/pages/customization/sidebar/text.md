You can customize both the sidebar. The only disadvantage is you have to set the `top` position yourself. If you're offering an optional mobile-friendly large toolbar, the `top` position of custom sidebars is not adjusted automatically.

The attribute `[(sidebarVisible)]` supports two-way binding. It's updated when the user opens or hide the sidebar.

### HTML

#### With Toolbar

```html
<ngx-extended-pdf-viewer
    #pdfViewer
    [src]="'/assets/pdfs/stluciadance.com.pdf'"
    [customSidebar]="theme==='fancy' ? fancySidebar: theme === 'without'? withoutSidebar: null"
    [(sidebarVisible)]="sidebarOpen"
    [textLayer]="true"
    [showHandToolButton]="true">
</ngx-extended-pdf-viewer>
```

#### No Sidebar

```html
<ng-template #withoutSidebar>
  <div id="sidebarContainer" style="top:-1px">
    <pdf-sidebar-content></pdf-sidebar-content>
    <div id="sidebarResizer" class="hidden"></div>
  </div>
</ng-template>
```

#### Fancy Sidebar

```html
<ng-template #fancySidebar>
  <div id="sidebarContainer" style="top:31px;background-color:goldenrod">
    <div id="additionalSidebarContainer">
      <div id="toolbarSidebar">
        <div id="outlineOptionsContainer" class="splitToolbarButton toggled">
          <button style="background-color: red; height:100%;width: 34%;border:0;margin:0;padding:0" 
            type="button" id="viewThumbnail" 
            class="toolbarButton" 
            data-l10n-id="thumbs">
            <span data-l10n-id="thumbs_label">Thumbnails</span>
          </button>
          <button
            style="background-color: green; height:100%;width: 35%;border:0;margin:0;padding:0"
            type="button"
            id="viewOutline"
            class="toolbarButton"
            data-l10n-id="document_outline">
            <span data-l10n-id="document_outline_label">Document Outline</span>
          </button>
          <button
            style="background-color: blue; height:100%;width: 34%;border:0;margin:0;padding:0"
            type="button" 
            id="viewAttachments" 
            class="toolbarButton" 
            data-l10n-id="attachments">
            <span data-l10n-id="attachments_label">Attachments</span>
          </button>
        </div>
      </div>
    </div>
    <pdf-sidebar-content></pdf-sidebar-content>
    <div id="sidebarResizer" class="hidden"></div>
  </div>
</ng-template>

```
