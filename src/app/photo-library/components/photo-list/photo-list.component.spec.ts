import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PhotoLibraryMockService } from 'testing/photo-library-mock.service';
import { PhotoLibraryService } from '../../services/photo-library.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { PhotoListComponent } from './photo-list.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';

fdescribe('PhotoListComponent', () => {
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

  xit('should call getPhotos with isFavourite true when favourite is in route', ()=>{

  })

  xit('should call eventEmitter onClickPhoto when click on photo', (done) => {
    component.photoList = [{id: 3, author:'', download_url:'', height:300, width:44, url:''}];

    let spy = spyOn(component.onClickPhoto,'emit');
    fixture.detectChanges();
    const element = fixture.debugElement.queryAll(By.css('.image-container'))[0];
    element.triggerEventHandler('click');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.onClickPhoto.emit).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
      done();
    })
    
    
  })

  it('should call service isFavouritePhoto when calling checkIfFavouritePhoto', ()=>{
    const id = 3;
    let serviceSpy = spyOn(service, 'isFavouritePhoto').and.callThrough();

    component.checkIfFavouritePhoto(id);
    fixture.detectChanges();

    expect(serviceSpy).toHaveBeenCalledWith(id);
  })
});
