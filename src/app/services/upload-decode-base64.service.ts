import {Injectable} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {map, pluck} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadDecodeBase64Service {

  constructor() {
  }

  public getDecodedString(fileToRead: File): Observable<string> {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(fileToRead);
    return fromEvent(fileReader, 'load').pipe(pluck('target', 'result'));
  }
}
