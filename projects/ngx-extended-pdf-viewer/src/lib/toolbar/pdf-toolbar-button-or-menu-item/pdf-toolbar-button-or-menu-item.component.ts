import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pdf-toolbar-button-or-menu-item',
  templateUrl: './pdf-toolbar-button-or-menu-item.component.html',
  styleUrls: ['./pdf-toolbar-button-or-menu-item.component.css'],
})
export class PdfToolbarButtonOrMenuItemComponent implements OnInit {
  @Input()
  public id: string;

  @Input()
  public cssClass: string;

  @Input()
  public l10nId: string;

  @Input()
  public l10nLabel: string;

  @Input()
  public title: string;

  constructor() {}

  ngOnInit(): void {}
}
