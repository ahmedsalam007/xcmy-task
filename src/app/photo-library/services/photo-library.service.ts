import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoLibraryService {

  constructor(private http:HttpClient) { }

  getPhotos(pageNumber: number){
    return this.http.get(`https://picsum.photos/v2/list?page=${pageNumber}&limit=6`).pipe(delay(4000))
  }
}
