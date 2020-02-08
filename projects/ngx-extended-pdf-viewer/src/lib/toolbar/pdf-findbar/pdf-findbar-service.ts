import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class PdfFindbarService {
  public lineMode = false;

  public multipleSearchTexts = true;

  public searchPhrase = '';
}
