import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { PhotoDetailsComponent } from './components/photo-details/photo-details.component';
import { RouterModule, Route } from '@angular/router';
import { PhotoLibraryComponent } from './components/photo-library/photo-library.component';
import { PhotoFavouritesComponent } from './components/photo-favourites/photo-favourites.component';

const routes: Route[] = [
  { path: '', component: PhotoLibraryComponent, children: 
  [
    { path: '', component:PhotoListComponent},
    { path: 'favorites', component: PhotoFavouritesComponent},
    { path: 'photos/:id ', component: PhotoDetailsComponent}
  ]},
  
]

@NgModule({
  declarations: [
    HeaderComponent,
    PhotoListComponent,
    PhotoFavouritesComponent,
    PhotoDetailsComponent,
    PhotoLibraryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PhotoLibraryModule { }