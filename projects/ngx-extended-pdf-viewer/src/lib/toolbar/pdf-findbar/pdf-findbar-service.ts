import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfFindbarService {
  public individualWordsMode = true;

  public multipleSearchTexts = false;
}
