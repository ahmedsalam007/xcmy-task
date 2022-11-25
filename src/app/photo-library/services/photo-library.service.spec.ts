import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockPhoto, SecondMockPhoto } from 'testing/mock-data';
import { Configs } from '../models/constants';

import { PhotoLibraryService } from './photo-library.service';

describe('PhotoLibraryService', () => {
  let service: PhotoLibraryService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[HttpClient]
    });
    service = TestBed.inject(PhotoLibraryService);
    http = TestBed.inject(HttpClient);
    localStorage.setItem('favourite', JSON.stringify([MockPhoto,SecondMockPhoto]));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fill favouritePhotoList from localStorage when initiate', () => {
    expect(service.favouritePhotoList).toEqual([MockPhoto, SecondMockPhoto]);
  })

  it('should add to favouritePhotoList and localStorage when call addPhotoToFavourites ', () => {
    const currentTotalNumberOfPhotos = service.favouritePhotoList.length;
    let spy = spyOn(localStorage, 'setItem').and.callThrough();
    service.addPhotoToFavourites(SecondMockPhoto);

    expect(service.favouritePhotoList).toContain(SecondMockPhoto);
    expect(service.favouritePhotoList.length).toEqual(currentTotalNumberOfPhotos + 1);
    expect(spy).toHaveBeenCalledWith('favourite', JSON.stringify(service.favouritePhotoList));
    
  })

  it('should delete from favouritePhotoList and call localStorage when call deletePhotoFromFavourite ', () => {
    localStorage.setItem('favourite', JSON.stringify([MockPhoto, SecondMockPhoto]));
    let spy = spyOn(localStorage, 'setItem').and.callThrough();
    
    service.deletePhotoFromFavourite(MockPhoto.id);

    expect(service.favouritePhotoList).toEqual([SecondMockPhoto]);
    expect(service.favouritePhotoList.length).toEqual(1);
    expect(spy).toHaveBeenCalledWith('favourite', JSON.stringify(service.favouritePhotoList))
  })

  it('should check whether photo isFavourite or not', () => {
    service.favouritePhotoList = [MockPhoto];
    let result = service.isFavouritePhoto(MockPhoto.id);
    expect(result).toBeTrue();

    result = service.isFavouritePhoto(SecondMockPhoto.id);
    expect(result).toBeFalse();
  })

  it('should return list of photo depend on favourite or not', (done)=> {
    const pageNumber = 1;
    const url = `${Configs.photosSrcUrl}/v2/list?page=${pageNumber}&limit=6`
    let spy = spyOn(http, "get").and.callThrough();

   service.getPhotos(pageNumber, false);
    expect(spy).toHaveBeenCalledWith(url);

    let result = service.getPhotos(pageNumber, true);
    result.subscribe((data) => {
      expect(data).toEqual(service.favouritePhotoList);
      done();
    })
    
  })

  it('should call correct url when call getPhotoById', ()=> {
    const id = 1;
    const url = `${Configs.photosSrcUrl}/id/${id}/200/300`;
    let spy = spyOn(http, "get").and.callThrough();

    service.getPhotoById(id);
    expect(spy).toHaveBeenCalledWith(url);
  })
});
