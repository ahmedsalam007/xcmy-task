import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockPhoto } from 'testing/mock-data';
import { PhotoLibraryMockService } from 'testing/photo-library-mock.service';
import { Configs } from '../../models/constants';
import { routes } from '../../photo-library.module';
import { PhotoLibraryService } from '../../services/photo-library.service';

import { PhotoDetailsComponent } from './photo-details.component';

describe('PhotoDetailsComponent', () => {
  let component: PhotoDetailsComponent;
  let fixture: ComponentFixture<PhotoDetailsComponent>;
  let service: PhotoLibraryService;
  let route: ActivatedRoute;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoDetailsComponent ],
      imports:[RouterTestingModule.withRoutes(routes)],
      providers: [{provide: PhotoLibraryService, useClass: PhotoLibraryMockService},
      {
        provide: ActivatedRoute, 
        useValue:{
          snapshot:{
            params: {"id": MockPhoto.id}
          }
        }
      }
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoDetailsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PhotoLibraryService);
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set Url property of component depending on parameter in activated Route', () => {
    const expectedUrl = `${Configs.photosSrcUrl}/id/${MockPhoto.id}/300/300`;

    component.ngOnInit();
    fixture.detectChanges();
    
    expect(component.id.toString()).toBe(MockPhoto.id.toString());
    expect(component.url).toEqual(expectedUrl);
  });

  it('should call deleteFromFavourite service method when click on remove from Favourite button', () => {
    let componentSpy = spyOn(component, "deletePhotoFromFavourites").and.callThrough();
    let photoLibraryServiceSpy = spyOn(service, "deletePhotoFromFavourite").and.callThrough();
    let routerSpy = spyOn(router, "navigate").and.callThrough(); 
    
    let buttonElement = fixture.debugElement.query(By.css('.remove-fav-btn'));
    buttonElement.triggerEventHandler('click', {id: MockPhoto.id});

    fixture.detectChanges();


    expect(componentSpy).toHaveBeenCalledWith(MockPhoto.id);
    expect(photoLibraryServiceSpy).toHaveBeenCalledWith(MockPhoto.id);
    expect(routerSpy).toHaveBeenCalledWith(['../'+ Configs.favouritesPath])

  })
});
