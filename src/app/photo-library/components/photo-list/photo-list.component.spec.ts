import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PhotoLibraryMockService } from 'testing/photo-library-mock.service';
import { PhotoLibraryService } from '../../services/photo-library.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { PhotoListComponent } from './photo-list.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { MockPhoto, SecondMockPhoto } from 'testing/mock-data';
import { Photo } from '../../models/photo.model';

describe('PhotoListComponent', () => {
  let component: PhotoListComponent;
  let fixture: ComponentFixture<PhotoListComponent>;
  let service: PhotoLibraryService;
  let activatedRoute: ActivatedRoute;
  let spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoListComponent ],
      imports:[RouterTestingModule, HttpClientTestingModule ],
      providers:[{provide: PhotoLibraryService, useClass:PhotoLibraryMockService},
      HttpClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;

    service = TestBed.inject(PhotoLibraryService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    localStorage.setItem('favourite', JSON.stringify([MockPhoto,SecondMockPhoto]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPhotos function when initiation', () => {
    let spy = spyOn(component,'getPhotoList').and.callThrough();
    let serviceSpy = spyOn(service, 'getPhotos').and.callThrough();
    component.ngOnInit();

    fixture.detectChanges();

    expect(spy).toHaveBeenCalledOnceWith(1, false);
    expect(serviceSpy).toHaveBeenCalledOnceWith(1, false);
  });

  it('should call eventEmitter onClickPhoto when click on photo', (done) => {
    component.photoList = [MockPhoto];
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('.image-container'));
    element.nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    let selectedPhoto:Photo;
    component.onClickPhoto.subscribe((photo) => {
      tick();
      selectedPhoto = photo
      expect(selectedPhoto).toBe(MockPhoto);
    });
    done();
  })

  it('should call service isFavouritePhoto when calling checkIfFavouritePhoto', ()=>{
    const id = MockPhoto.id;
    let serviceSpy = spyOn(service, 'isFavouritePhoto').and.callThrough();

    component.checkIfFavouritePhoto(id);
    fixture.detectChanges();

    expect(serviceSpy).toHaveBeenCalledWith(id);
  })
});
