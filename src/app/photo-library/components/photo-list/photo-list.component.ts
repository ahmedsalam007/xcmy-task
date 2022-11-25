import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, fromEvent, debounceTime, finalize, BehaviorSubject, Subject, takeUntil  } from 'rxjs';
import { Configs } from '../../models/constants';

import { Photo } from '../../models/photo.model';
import { PhotoLibraryService } from '../../services/photo-library.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit , OnDestroy{
  @Output() onClickPhoto: EventEmitter<Photo> = new EventEmitter<Photo>();
  photoList: Photo[] =[];
  pageNumber = 1;
  destroy$: Subject<boolean> = new Subject()

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private photoLibraryService: PhotoLibraryService, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    const isFavourite = !!this.activatedRoute.snapshot.routeConfig?.path?.includes('favorites');
    this.getPhotoList(this.pageNumber, isFavourite);

    this.registerScrollEventListenter(isFavourite);
  }

  
  getPhotoList(pageNumber: number, isFavourite?: boolean){
    this.isLoading$.next(true);
    this.photoLibraryService.getPhotos(pageNumber, isFavourite).pipe(map(v => v as Photo[]), finalize(() => this.isLoading$.next(false))).subscribe(res => {
      this.photoList = isFavourite ? res : [...this.photoList, ...res];
    })
  }

  clickPhotoHandler(photo: Photo){
    this.onClickPhoto.emit(photo);
  }


  registerScrollEventListenter(isFavourite: boolean){
    fromEvent(document,'scroll').pipe(debounceTime(Configs.debounceTimeInSeconds), takeUntil(this.destroy$)).subscribe(() => {
      if(window.innerHeight + window.scrollY >= document.body.offsetHeight){
        this.pageNumber += 1;
        this.getPhotoList(this.pageNumber, isFavourite);
      }
    })
  }

  checkIfFavouritePhoto(id: number): boolean {
    return this.photoLibraryService.isFavouritePhoto(id);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
