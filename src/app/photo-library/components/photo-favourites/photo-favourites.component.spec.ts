import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PhotoListMockComponent } from 'testing/photo-library-mock.service';
import { MockPhoto } from '../../../../../testing/mock-data';
import { routes } from '../../photo-library.module';
import { PhotoListComponent } from '../photo-list/photo-list.component';

import { PhotoFavouritesComponent } from './photo-favourites.component';


describe('PhotoFavouritesComponent', () => {
  let component: PhotoFavouritesComponent;
  let fixture: ComponentFixture<PhotoFavouritesComponent>;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoFavouritesComponent, PhotoListMockComponent ],
      imports: [RouterTestingModule.withRoutes(routes)],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoFavouritesComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call router navigate method to another route  with id parameter when click on Photo', () => {
    let spy =  spyOn(router, "navigate").and.callThrough();
    let photo = MockPhoto;

    component.onClickedPhoto(photo);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledOnceWith(['../photos', photo.id]);
  })
});


