import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { Configs } from '../models/constants';
import { Photo } from '../models/photo.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoLibraryService {
  favouritePhotoList: Photo[] =[];
  constructor(private http:HttpClient) {
    const result = localStorage.getItem('favourite');
    if(result) 
    this.favouritePhotoList =  JSON.parse(result);
  } 

  getPhotos(pageNumber: number, isFavourite?: boolean){
    return isFavourite ?  of(this.favouritePhotoList) : this.http.get(`${Configs.photosSrcUrl}/v2/list?page=${pageNumber}&limit=6`).pipe(delay(Configs.delayInSeconds))
  }

  getPhotoById(id: number){
    return this.http.get(`${Configs.photosSrcUrl}/id/${id}/200/300`).pipe(delay(Configs.delayInSeconds))
  }

  addPhotoToFavourites(selectedPhoto: Photo):void {
    this.favouritePhotoList.push(selectedPhoto);
    localStorage.setItem('favourite',JSON.stringify(this.favouritePhotoList))
  }

  deletePhotoFromFavourite(id: number): void {
    this.favouritePhotoList = localStorage.getItem('favourite') && JSON.parse(localStorage.getItem('favourite') || '');
    this.favouritePhotoList = this.favouritePhotoList.filter(v => +v.id !== id);
    localStorage.setItem('favourite',JSON.stringify(this.favouritePhotoList))
  }

  isFavouritePhoto(id: number): boolean {
    return !!this.favouritePhotoList.find(ph => ph.id === id);
  }
}
