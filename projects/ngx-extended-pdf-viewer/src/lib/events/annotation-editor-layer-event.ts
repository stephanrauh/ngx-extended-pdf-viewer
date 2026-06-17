export interface AnnotationEditorEvent {
  source: any; // AnnotationEditor;
  type:
    | 'altTextChanged'
    | 'removed'
    | 'sizeChanged'
    | 'commit'
    | 'fontSizeChanged'
    | 'colorChanged'
    | 'thicknessChanged'
    | 'opacityChanged'
    | 'bezierPathChanged'
    | 'moved'
    | 'imageAdded'
    | 'added' // #3076 added by ngx-extended-pdf-viewer
    | 'commented' // # 3095 added by ngx-extended-pdf-viewer
    | 'commentRemoved' // # 3095 added by ngx-extended-pdf-viewer
    | 'drawingStarted' // #3136 added by ngx-extended-pdf-viewer
    | 'drawingStopped'; // #3136 added by ngx-extended-pdf-viewer
  editorType: string;
  value: any;
  previousValue?: any;
  id?: string; // #3076 added by ngx-extended-pdf-viewer - Temporary identifier for the annotation (changes every session)
  customId?: string; // #3225 added by ngx-extended-pdf-viewer - Stable, developer-supplied identifier that survives the save/restore round-trip (only present when you assigned one)
}
