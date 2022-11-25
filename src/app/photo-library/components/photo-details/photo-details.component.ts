import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Configs } from '../../models/constants';
import { PhotoLibraryService } from '../../services/photo-library.service';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.scss']
})
export class PhotoDetailsComponent implements OnInit {
  url = '';
  id: string = '';
  constructor(
    private activatedRoute: ActivatedRoute, 
    private photoLibraryService: PhotoLibraryService,
    private router: Router){}

  ngOnInit(): void{
    this.id = this.activatedRoute.snapshot.params["id"];
    this.url = `${Configs.photosSrcUrl}/id/${this.id}/300/300`;
  }

  deletePhotoFromFavourites(id: number){
    this.photoLibraryService.deletePhotoFromFavourite(id);
    this.router.navigate(['../'+ Configs.favouritesPath]);
  }
}
