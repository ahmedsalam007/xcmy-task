// import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { of, Observable } from "rxjs";

import { Photo } from "src/app/photo-library/models/photo.model";

export class PhotoLibraryMockService {
    favouritePhotoList: Photo[] =[];
  // constructor() { 
  //   this.favouritePhotoList =  JSON.parse(localStorage.getItem('favourite') || '');
  // }

  getPhotos(pageNumber: number, isFavourite?: boolean): Observable<Photo[]>{
    return of([])
  }

  getPhotoById(id: number): Observable<Photo[]>{
    return of([])
  }

  addPhotoToFavourites(selectedPhoto: Photo):void { }

  deletePhotoFromFavourite(id: number): void { }

  isFavouritePhoto(id: number): boolean {return true }
}


@Component({
  selector: 'app-photo-list',
  template: ``,
})
export class PhotoListMockComponent {}