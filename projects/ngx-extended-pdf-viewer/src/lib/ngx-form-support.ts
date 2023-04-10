import { EventEmitter, NgZone } from '@angular/core';
import { FormDataType, IPDFViewerApplication } from '../public_api';

export class NgxFormSupport {
  /** Maps the internal ids of the annotations of pdf.js to their field name */
  private formIdToFullFieldName: { [key: string]: string } = {};

  private formIdToField: { [key: string]: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement } = {};

  private radioButtons: { [key: string]: Array<HTMLInputElement> } = {};

  public formData: FormDataType = {};

  public formDataChange = new EventEmitter<FormDataType>();

  private ngZone: NgZone;

  public reset() {
    this.formData = {};
    this.formIdToFullFieldName = {};
  }

  public registerFormSupportWithPdfjs(ngZone: NgZone): void {
    this.ngZone = ngZone;
    (globalThis as any).getFormValueFromAngular = (key: string) => this.getFormValueFromAngular(key);
    (globalThis as any).updateAngularFormValue = (key: string | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, value: { value: string }) =>
      this.updateAngularFormValueCalledByPdfjs(key, value);
    (globalThis as any).registerAcroformField = (
      id: string,
      element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
      value: string | Array<string>,
      radioButtonValueName?: string
    ) => this.registerAcroformField(id, element, value, radioButtonValueName);
    (globalThis as any).registerXFAField = (element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, value: { value: string }) =>
      this.registerXFAField(element, value);
  }

  private registerAcroformField(
    id: string,
    element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    value: null | string | Array<string>,
    radioButtonValueName?: string
  ): void {
    const fieldName = element.name;
    this.formIdToField[id] = element;
    this.formIdToFullFieldName[id] = fieldName;
    if (element instanceof HTMLInputElement && element.type === 'radio') {
      const groupName = fieldName;
      this.formIdToFullFieldName[id] = groupName;
      if (value) {
        this.formData[groupName] = radioButtonValueName as string;
      }
      element.setAttribute('exportValue', radioButtonValueName as string);
      if (!this.radioButtons[groupName]) {
        this.radioButtons[groupName] = [];
      }
      this.radioButtons[groupName].push(element);
    } else if (element instanceof HTMLSelectElement) {
      this.formData[fieldName] = this.getValueOfASelectField(element);
    } else {
      this.formData[fieldName] = value;
    }
  }

  private registerXFAField(element: HTMLElement, value: { value: string }): void {
    const fullFieldName = this.findFullXFAName(element);
    if (element instanceof HTMLInputElement && element.type === 'radio') {
      const id = element.getAttribute('fieldid') || '';
      // remove the xfa name of the radio button itself form the field name,
      // because the field name refers to the entire group of relatated radio buttons
      const groupName = fullFieldName.substring(0, fullFieldName.lastIndexOf('.'));
      this.formIdToFullFieldName[id] = groupName;
      this.formData[groupName] = value.value;
      if (!this.radioButtons[groupName]) {
        this.radioButtons[groupName] = [];
      }
      this.radioButtons[groupName].push(element);
    } else if (element instanceof HTMLInputElement) {
      const id = element.getAttribute('fieldid') || '';
      this.formIdToField[id] = element;
      this.formIdToFullFieldName[id] = fullFieldName;
      this.formData[fullFieldName] = value.value;
    } else if (element instanceof HTMLSelectElement) {
      const id = element.getAttribute('fieldid') || '';
      this.formIdToField[id] = element;
      this.formIdToFullFieldName[id] = fullFieldName;
      this.formData[fullFieldName] = value.value;
    } else if (element instanceof HTMLTextAreaElement) {
      const id = element.getAttribute('fieldid') || '';
      this.formIdToField[id] = element;
      this.formIdToFullFieldName[id] = fullFieldName;
      this.formData[fullFieldName] = value.value;
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
        key = fieldName;
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
    let parentElement = element;
    while (!parentElement.getAttribute('xfaname') && parentElement.parentElement) {
      parentElement = parentElement.parentElement;
    }
    let fieldName = parentElement.getAttribute('xfaname');
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
    return fieldName.substring(0, fieldName.length - 1);
  }

  private updateAngularFormValueCalledByPdfjs(key: string | HTMLElement, value: { value: string }): void {
    let change = false;
    if (!this.formData) {
      this.formData = {};
    }

    if (typeof key === 'string') {
      const acroFormKey = this.formIdToFullFieldName[key];
      const fullKey = acroFormKey ?? Object.values(this.formIdToFullFieldName).find((k) => k === key || k.endsWith('.' + key));
      if (fullKey) {
        const field = this.formIdToField[key];
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
          } else {
            if (this.formData[fullKey] !== value.value) {
              this.formData[fullKey] = value.value;
              change = true;
            }
          }
        } else if (field instanceof HTMLInputElement && field.type === 'radio') {
          const exportValue = this.formIdToField[key].getAttribute('exportvalue');
          if (value.value) {
            if (this.formData[fullKey] !== exportValue) {
              this.formData[fullKey] = exportValue;
              change = true;
            }
          }
        } else {
          if (this.formData[fullKey] !== value.value) {
            this.formData[fullKey] = value.value;
            change = true;
          }
        }
        if (change) {
          this.ngZone.run(() => this.formDataChange.emit(this.formData));
        }
      } else {
        console.error("Couldn't find the field with the name " + key);
      }
    } else {
      console.error('TODO');
    }
  }

  public updateFormFieldsInPdfCalledByNgOnChanges(previousFormData: Object) {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;

    if (!PDFViewerApplication || !PDFViewerApplication.pdfDocument || !PDFViewerApplication.pdfDocument.annotationStorage) {
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
      radios.forEach((r) => (r.checked = r.getAttribute('exportValue') === newValue));
      const updateFromAngular = new CustomEvent('updateFromAngular', {
        detail: newValue,
      });
      radios[0].dispatchEvent(updateFromAngular);
    } else {
      const fieldId = this.findFormIdFromFieldName(key);
      if (fieldId) {
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

  private findFormIdFromFieldName(fieldName: string): string | undefined {
    if (Object.entries(this.formIdToFullFieldName).length === 0) {
      // sometimes, ngOnChanges() is called before initializing the PDF file
      return undefined;
    }
    const matchingEntries = Object.entries(this.formIdToFullFieldName).filter((entry) => entry[1] === fieldName || entry[1].endsWith('.' + fieldName));
    if (matchingEntries.length > 1) {
      console.log(
        `More than one field name matches the field name ${fieldName}. Please use the one of the qualified field name.`,
        matchingEntries.map((f) => f[1])
      );
      console.log('ngx-extended-pdf-viewer uses the first matching field (which may not be the topmost field on your PDF form): ' + matchingEntries[0][0]);
    } else if (matchingEntries.length === 0) {
      console.log("Couldn't find the field " + fieldName);
      return undefined;
    }
    return matchingEntries[0][0];
  }

  private findRadioButtonGroup(fieldName: string): Array<HTMLInputElement> | null {
    const matchingEntries = Object.entries(this.radioButtons).filter((entry) => entry[0].endsWith('.' + fieldName) || entry[0] === fieldName);
    if (matchingEntries.length === 0) {
      return null;
    }
    if (matchingEntries.length > 1) {
      console.log(
        'More than one radio button group name matches this name. Please use the qualified field name',
        matchingEntries.map((radio) => radio[0])
      );
      console.log('ngx-extended-pdf-viewer uses the first matching field (which may not be the topmost field on your PDF form): ' + matchingEntries[0][0]);
    }
    return matchingEntries[0][1];
  }
}
