import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { PhotoDetailsComponent } from './components/photo-details/photo-details.component';
import { RouterModule, Route } from '@angular/router';
import { PhotoLibraryComponent } from './components/photo-library/photo-library.component';
import { PhotoFavouritesComponent } from './components/photo-favourites/photo-favourites.component';
import { PhotoGalleryComponent } from './components/photo-gallery/photo-gallery.component';
import { Configs } from './models/constants';

export const routes: Route[] = [
  { path: '', component: PhotoLibraryComponent, children: 
  [
    { path: '', component:PhotoGalleryComponent},
    { path: Configs.favouritesPath, component: PhotoFavouritesComponent},
    { path: 'photos/:id', component: PhotoDetailsComponent}
  ]},
  
]

@NgModule({
  declarations: [
    HeaderComponent,
    PhotoFavouritesComponent,
    PhotoDetailsComponent,
    PhotoLibraryComponent,
    PhotoGalleryComponent,
    PhotoListComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forChild(routes),
  ]
})
export class PhotoLibraryModule { }
