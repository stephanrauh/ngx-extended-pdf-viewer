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
    | 'moved';
  editorType: string;
  value: any;
  previousValue?: any;
}
