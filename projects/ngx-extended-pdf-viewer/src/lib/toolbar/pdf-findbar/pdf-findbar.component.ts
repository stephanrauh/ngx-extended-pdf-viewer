import { Component, Input, TemplateRef, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'pdf-findbar',
  templateUrl: './pdf-findbar.component.html',
  styleUrls: ['./pdf-findbar.component.css']
})
export class PdfFindbarComponent implements OnInit {


  @Input()
  findbar: TemplateRef<any> | undefined = undefined;

  @Input()
  findbarButtons: TemplateRef<any> | undefined = undefined;


  @Input()
  public showFindButton: boolean;

  @Input()
  public mobileFriendlyZoomScale: number;

  @Input()
  public findbarLeft: string | undefined;

  @Input()
  public findbarTop: string | undefined;

  /* UI templates */
  @Input()
  public findbarInputArea: TemplateRef<any>;

  @ViewChild('defaultFindbar')
  public defaultFindbar: TemplateRef<any>;

  ngOnInit(): void {
  }

}
