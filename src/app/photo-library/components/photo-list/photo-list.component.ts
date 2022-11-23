import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { map, fromEvent, debounceTime, finalize, BehaviorSubject, delay,  } from 'rxjs';
import { Photo } from '../../models/photo.model';
import { PhotoLibraryService } from '../../services/photo-library.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {
  photoList: Photo[] =[];
  pageNumber = 1;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private photoLibraryService: PhotoLibraryService){}

  ngOnInit(): void {
    this.getPhotoList(this.pageNumber);
   

    // never forget to unsubscribe
    fromEvent(document,'scroll').pipe(debounceTime(1000)).subscribe(() => {
      if(window.innerHeight + window.scrollY >= document.body.offsetHeight){
        this.pageNumber += 1;
        this.getPhotoList(this.pageNumber);
      }
    })
  }

  getPhotoList(pageNumber: number){
    this.isLoading$.next(true);
    this.photoLibraryService.getPhotos(pageNumber).pipe(map(v => v as Photo[]), finalize(() => this.isLoading$.next(false))).subscribe(res => {
      this.photoList = [...this.photoList, ...res];
    })
  }

  
}
