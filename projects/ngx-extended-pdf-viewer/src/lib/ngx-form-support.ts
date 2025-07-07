import { ChangeDetectorRef, EventEmitter, NgZone } from '@angular/core';
import { FormDataType } from './ngx-extended-pdf-viewer.component';
import { IPDFViewerApplication } from './options/pdf-viewer-application';

export type HtmlFormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export class NgxFormSupport {
  /** Maps the internal ids of the annotations of pdf.js to their field name */
  private formIdToFullFieldName: { [key: string]: string } = {};

  private formIdToField: { [key: string]: HtmlFormElement } = {};

  private radioButtons: { [key: string]: Array<HTMLInputElement> } = {};

  public formData: FormDataType = {};

  public initialFormDataStoredInThePDF: FormDataType = {};

  public formDataChange = new EventEmitter<FormDataType>();

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  public ngZone!: NgZone; // set during the initializaion of the PDF viewer

  public cdr!: ChangeDetectorRef; // set during the initializaion of the PDF viewer

  public reset() {
    this.formData = {};
    this.formIdToFullFieldName = {};
  }

  public registerFormSupportWithPdfjs(PDFViewerApplication: IPDFViewerApplication): void {
    this.PDFViewerApplication = PDFViewerApplication;
    (globalThis as any).getFormValueFromAngular = (key: string) => this.getFormValueFromAngular(key);
    (globalThis as any).updateAngularFormValue = (key: string | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, value: { value: string }) =>
      this.updateAngularFormValueCalledByPdfjs(key, value);
    (globalThis as any).registerAcroformField = (
      id: string,
      element: HtmlFormElement,
      value: string | Array<string>,
      radioButtonValueName: string,
      initialValueFromPDF: string,
    ) => this.registerAcroformField(id, element, value, radioButtonValueName, initialValueFromPDF);

    (globalThis as any).registerXFAField = (element: HtmlFormElement, value: { value: string }, initialValueFromPDF: string) =>
      this.registerXFAField(element, value, initialValueFromPDF);
  }

  private registerAcroformField(
    id: string,
    element: HtmlFormElement,
    value: null | string | Array<string>,
    radioButtonValueName: string,
    initialFormValueFromPDF: string,
  ): void {
    const fieldName = element.name;
    this.formIdToField[id] = element;
    this.formIdToFullFieldName[id] = fieldName;
    if (element instanceof HTMLInputElement && element.type === 'radio') {
      const groupName = fieldName;
      this.formIdToFullFieldName[id] = groupName;
      if (value) {
        this.formData[groupName] = radioButtonValueName;
        this.initialFormDataStoredInThePDF[groupName] = initialFormValueFromPDF;
      }
      element.setAttribute('exportValue', radioButtonValueName);
      if (!this.radioButtons[groupName]) {
        this.radioButtons[groupName] = [];
      }
      this.radioButtons[groupName].push(element);
    } else if (element instanceof HTMLSelectElement) {
      this.formData[fieldName] = this.getValueOfASelectField(element);
      this.initialFormDataStoredInThePDF[fieldName] = initialFormValueFromPDF;
    } else {
      if (value !== undefined) {
        this.formData[fieldName] = value;
      }
      this.initialFormDataStoredInThePDF[fieldName] = initialFormValueFromPDF;
    }
  }

  private registerXFAField(element: HTMLElement, value: { value: string }, initialFormValueFromPDF: string): void {
    const fullFieldName = this.findFullXFAName(element);
    if (element instanceof HTMLInputElement && element.type === 'radio') {
      const id = element.getAttribute('fieldid') ?? '';
      // remove the xfa name of the radio button itself form the field name,
      // because the field name refers to the entire group of relatated radio buttons
      const groupName = fullFieldName.substring(0, fullFieldName.lastIndexOf('.'));
      this.formIdToFullFieldName[id] = groupName;
      this.formData[groupName] = value?.value;
      this.initialFormDataStoredInThePDF[groupName] = initialFormValueFromPDF;

      if (!this.radioButtons[groupName]) {
        this.radioButtons[groupName] = [];
      }
      this.radioButtons[groupName].push(element);
    } else if (element instanceof HTMLInputElement) {
      const id = element.getAttribute('fieldid') ?? '';
      this.formIdToField[id] = element;
      this.formIdToFullFieldName[id] = fullFieldName;
      this.formData[fullFieldName] = value?.value;
      this.initialFormDataStoredInThePDF[fullFieldName] = initialFormValueFromPDF;
    } else if (element instanceof HTMLSelectElement) {
      const id = element.getAttribute('fieldid') ?? '';
      this.formIdToField[id] = element;
      this.formIdToFullFieldName[id] = fullFieldName;
      this.formData[fullFieldName] = value?.value;
      this.initialFormDataStoredInThePDF[fullFieldName] = initialFormValueFromPDF;
    } else if (element instanceof HTMLTextAreaElement) {
      const id = element.getAttribute('fieldid') ?? '';
      this.formIdToField[id] = element;
      this.formIdToFullFieldName[id] = fullFieldName;
      this.formData[fullFieldName] = value?.value;
      this.initialFormDataStoredInThePDF[fullFieldName] = initialFormValueFromPDF;
    } else {
      console.error("Couldn't register an XFA form field", element);
    }
  }

  private getValueOfASelectField(selectElement: HTMLSelectElement): null | string | Array<string> {
    const { options, multiple } = selectElement;
    if (!multiple) {
      return options.selectedIndex === -1 ? null : options[options.selectedIndex]['value'];
    }
    return Array.prototype.filter.call(options, (option) => option.selected).map((option) => option['value']);
  }

  private getFormValueFromAngular(element: HTMLElement | string): Object {
    let key: string;
    if (element instanceof HTMLElement) {
      const fieldName = this.findXFAName(element);
      if (fieldName) {
        if (this.formData.hasOwnProperty(fieldName)) {
          key = fieldName;
        } else {
          key = this.findFullXFAName(element);
        }
      } else {
        console.error("Couldn't find the field name or XFA name of the form field", element);
        return { value: null };
      }
    } else {
      key = element;
    }
    return { value: this.formData[key] };
  }

  private findXFAName(element: HTMLElement): string {
    let parentElement: HTMLElement | null | undefined = element;
    while (!parentElement.getAttribute('xfaname') && parentElement.parentElement) {
      parentElement = parentElement.parentElement;
    }
    if (element instanceof HTMLInputElement && element.type === 'radio') {
      do {
        parentElement = parentElement?.parentElement;
      } while (!parentElement?.getAttribute('xfaname') && parentElement);
    }
    let fieldName = parentElement?.getAttribute('xfaname');
    if (!fieldName) {
      throw new Error("Couldn't find the xfaname of the field");
    }
    return fieldName;
  }

  private findFullXFAName(element: HTMLElement): string {
    let parentElement = element;
    let fieldName = '';
    while (parentElement instanceof HTMLElement && parentElement.parentElement) {
      const xfaName = parentElement.getAttribute('xfaname');
      if (xfaName) {
        fieldName = xfaName + '.' + fieldName;
      }
      parentElement = parentElement.parentElement;
    }
    if (!fieldName) {
      throw new Error("Couldn't find the xfaname of the field");
    }
    fieldName = fieldName.substring(0, fieldName.length - 1);
    if (element instanceof HTMLInputElement && element.type === 'radio') {
      // ignore the last part of the xfaName because it's actually the value of the field
      return fieldName.substring(0, fieldName.lastIndexOf('.'));
    }
    return fieldName;
  }

  private updateAngularFormValueCalledByPdfjs(key: string | HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement, value: { value: string }): void {
    if (!this.formData) {
      this.formData = {};
    }

    if (typeof key === 'string') {
      const acroFormKey = this.formIdToFullFieldName[key];
      const fullKey = acroFormKey ?? Object.values(this.formIdToFullFieldName).find((k) => k === key || k.endsWith('.' + key));
      if (fullKey) {
        const field = this.formIdToField[key];
        let change = this.doUpdateAngularFormValue(field, value, fullKey);
        if (change) {
          this.ngZone.run(() => {
            this.formDataChange.emit(this.formData);
            this.cdr.detectChanges();
          });
        }
      } else {
        console.error("Couldn't find the field with the name " + key);
      }
    } else {
      let change = false;
      const shortFieldName = this.findXFAName(key);
      if (this.formData.hasOwnProperty(shortFieldName)) {
        change = this.doUpdateAngularFormValue(key, value, shortFieldName);
      }
      const fullFieldName = this.findFullXFAName(key);
      if (fullFieldName !== shortFieldName) {
        change ||= this.doUpdateAngularFormValue(key, value, fullFieldName);
      }
      if (change) {
        this.ngZone.run(() => {
          this.formDataChange.emit(this.formData);
          this.cdr.detectChanges();
        });
      }
    }
  }

  private doUpdateAngularFormValue(field: HtmlFormElement, value: { value: string }, fullKey: string) {
    let change = false;
    if (field instanceof HTMLInputElement && field.type === 'checkbox') {
      const exportValue = field.getAttribute('exportvalue');
      if (exportValue) {
        if (value.value) {
          if (this.formData[fullKey] !== exportValue) {
            this.formData[fullKey] = exportValue;
            change = true;
          }
        } else {
          if (this.formData[fullKey] !== false) {
            this.formData[fullKey] = false;
            change = true;
          }
        }
      } else if (this.formData[fullKey] !== value.value) {
        this.formData[fullKey] = value.value;
        change = true;
      }
    } else if (field instanceof HTMLInputElement && field.type === 'radio') {
      const exportValue = field.getAttribute('exportvalue') ?? field.getAttribute('xfaon');
      if (value.value) {
        if (this.formData[fullKey] !== exportValue) {
          this.formData[fullKey] = exportValue;
          change = true;
        }
      }
    } else if (this.formData[fullKey] !== value.value) {
      this.formData[fullKey] = value.value;
      change = true;
    }
    return change;
  }

  public updateFormFieldsInPdfCalledByNgOnChanges(previousFormData: Object) {
    if (!this.PDFViewerApplication?.pdfDocument?.annotationStorage) {
      // ngOnChanges calls this method too early - so just ignore it
      return;
    }

    for (const key in this.formData) {
      if (this.formData.hasOwnProperty(key)) {
        const newValue = this.formData[key];
        if (newValue !== previousFormData[key]) {
          this.setFieldValueAndUpdateAnnotationStorage(key, newValue);
        }
      }
    }

    for (const key in previousFormData) {
      if (previousFormData.hasOwnProperty(key) && previousFormData[key]) {
        let hasPreviousValue = this.formData.hasOwnProperty(key);
        if (!hasPreviousValue) {
          const fullKey = Object.keys(this.formData).find((k) => k === key || k.endsWith('.' + key));
          if (fullKey) {
            hasPreviousValue = this.formData.hasOwnProperty(fullKey);
          }
        }

        if (!hasPreviousValue) {
          this.setFieldValueAndUpdateAnnotationStorage(key, null);
        }
      }
    }
  }

  private setFieldValueAndUpdateAnnotationStorage(key: string, newValue: any) {
    const radios = this.findRadioButtonGroup(key);
    if (radios) {
      radios.forEach((r) => {
        const activeValue = r.getAttribute('exportValue') ?? r.getAttribute('xfaon');
        r.checked = activeValue === newValue;
      });
      const updateFromAngular = new CustomEvent('updateFromAngular', {
        detail: newValue,
      });
      radios[0].dispatchEvent(updateFromAngular);
    } else {
      const fieldIds = this.findFormIdsFromFieldName(key);
      if (fieldIds) {
        fieldIds.forEach((fieldId) => {
          const htmlField = this.formIdToField[fieldId];

          if (htmlField) {
            if (htmlField instanceof HTMLInputElement && htmlField.type === 'checkbox') {
              let activeValue = htmlField.getAttribute('xfaon') ?? htmlField.getAttribute('exportvalue') ?? true;
              if (newValue === true || newValue === false) {
                activeValue = true;
              }
              htmlField.checked = activeValue === newValue;
            } else if (htmlField instanceof HTMLSelectElement) {
              this.populateSelectField(htmlField, newValue);
            } else {
              // textareas and input fields
              htmlField.value = newValue;
            }
            const updateFromAngular = new CustomEvent('updateFromAngular', {
              detail: newValue,
            });
            htmlField.dispatchEvent(updateFromAngular);
          } else {
            console.error("Couldn't set the value of the field", key);
          }
        });
      }
    }
  }

  private populateSelectField(htmlField: HTMLSelectElement, newValue: any) {
    if (htmlField.multiple) {
      const { options } = htmlField;
      const newValueArray = newValue as Array<string>;
      for (let i = 0; i < options.length; i++) {
        const option = options.item(i);
        if (option) {
          option.selected = newValueArray.some((o) => o === option.value);
        }
      }
    } else {
      htmlField.value = newValue;
    }
  }

  private findFormIdsFromFieldName(fieldName: string): string[] | undefined {
    if (Object.entries(this.formIdToFullFieldName).length === 0) {
      // sometimes, ngOnChanges() is called before initializing the PDF file
      return undefined;
    }
    const matchingEntries = Object.entries(this.formIdToFullFieldName).filter((entry) => entry[1] === fieldName || entry[1].endsWith('.' + fieldName));
    if (matchingEntries.length === 0) {
      console.log("Couldn't find the field " + fieldName);
      return undefined;
    }
    return matchingEntries.map((e) => e[0]);
  }

  private findRadioButtonGroup(fieldName: string): Array<HTMLInputElement> | null {
    const matchingEntries = Object.entries(this.radioButtons).filter((entry) => entry[0].endsWith('.' + fieldName) || entry[0] === fieldName);
    if (matchingEntries.length === 0) {
      return null;
    }
    if (matchingEntries.length > 1) {
      console.log(
        'More than one radio button group name matches this name. Please use the qualified field name',
        matchingEntries.map((radio) => radio[0]),
      );
      console.log('ngx-extended-pdf-viewer uses the first matching field (which may not be the topmost field on your PDF form): ' + matchingEntries[0][0]);
    }
    return matchingEntries[0][1];
  }
}
