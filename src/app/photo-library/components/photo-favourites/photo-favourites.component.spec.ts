import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoFavouritesComponent } from './photo-favourites.component';

describe('PhotoFavouritesComponent', () => {
  let component: PhotoFavouritesComponent;
  let fixture: ComponentFixture<PhotoFavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoFavouritesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
