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
    | 'added'; // #3076 added by ngx-extended-pdf-viewer
  editorType: string;
  value: any;
  previousValue?: any;
  id?: string; // #3076 added by ngx-extended-pdf-viewer - Unique identifier for the annotation
}
