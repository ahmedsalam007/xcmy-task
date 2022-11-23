import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoLibraryComponent } from './photo-library.component';

describe('PhotoLibraryComponent', () => {
  let component: PhotoLibraryComponent;
  let fixture: ComponentFixture<PhotoLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoLibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
