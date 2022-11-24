import { Component } from '@angular/core';
import { Photo } from '../../models/photo.model';
import { PhotoLibraryService } from '../../services/photo-library.service';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent {
  constructor(private photoLibraryService: PhotoLibraryService){ }
  
  onClickedPhoto(selectedPhoto: Photo): void {
    this.photoLibraryService.addPhotoToFavourites(selectedPhoto);
  }
}
