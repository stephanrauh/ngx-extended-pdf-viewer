import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class BlobService {
  public src!: Blob;
}
