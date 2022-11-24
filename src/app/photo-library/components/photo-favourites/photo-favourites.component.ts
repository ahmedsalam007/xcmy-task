import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Photo } from '../../models/photo.model';

@Component({
  selector: 'app-photo-favourites',
  templateUrl: './photo-favourites.component.html',
  styleUrls: ['./photo-favourites.component.sass']
})
export class PhotoFavouritesComponent {
  constructor(private router: Router){}
  
  onClickedPhoto(selectedPhoto: Photo): void{
    this.router.navigate(['../photos', selectedPhoto.id]);
  }
}
