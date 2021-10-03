export interface Annotation {
  id: string;
  fieldName: string;
  fieldType: string;
  exportValue: string;
  defaultFieldValue: string;
  checkbox?: boolean;
  radionButton?: boolean;
  pushButton?: boolean;
  subtype: string;
}
