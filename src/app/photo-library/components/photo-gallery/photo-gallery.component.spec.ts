import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockPhoto } from 'testing/mock-data';
import { PhotoLibraryMockService, PhotoListMockComponent } from 'testing/photo-library-mock.service';
import { Photo } from '../../models/photo.model';
import { PhotoLibraryService } from '../../services/photo-library.service';

import { PhotoGalleryComponent } from './photo-gallery.component';

describe('PhotoGalleryComponent', () => {
  let component: PhotoGalleryComponent;
  let fixture: ComponentFixture<PhotoGalleryComponent>;
  let service: PhotoLibraryService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoGalleryComponent , PhotoListMockComponent],
      imports:[HttpClientTestingModule],
      providers: [
                  {provide: PhotoLibraryService, useClass: PhotoLibraryMockService},
                  HttpClient
                  ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoGalleryComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PhotoLibraryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service method addPhotoToFavourites when call  onClickedPhoto function', () => {
    const spy = spyOn(service, "addPhotoToFavourites").and.callThrough();
    const photo = MockPhoto;

    component.onClickedPhoto(photo);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledOnceWith(photo);
  })
});
