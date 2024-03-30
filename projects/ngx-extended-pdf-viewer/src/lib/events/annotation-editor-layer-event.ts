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
    | 'bezierPathChanged';
  editorType: string;
  value: any;
  previousValue?: any;
}
