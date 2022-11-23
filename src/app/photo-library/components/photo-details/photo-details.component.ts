import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoLibraryService } from '../../services/photo-library.service';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.scss']
})
export class PhotoDetailsComponent implements OnInit {
  url = '';
  constructor(
    private activatedRoute: ActivatedRoute){}

  ngOnInit(): void{
    const ID = this.activatedRoute.snapshot.params["id"];
    this.url = `https://picsum.photos/id/${ID}/300/300`;
  }
}
