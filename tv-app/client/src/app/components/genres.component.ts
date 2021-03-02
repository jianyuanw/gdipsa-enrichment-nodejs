import { Component, OnInit } from '@angular/core';
import { TvShowService } from '../tvshow.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css'],
})
export class GenresComponent implements OnInit {
  genres: string[];

  constructor(private tvShowSvc: TvShowService) {}

  ngOnInit(): void {
    this.tvShowSvc.getGenres().then((result) => {
      this.genres = result;
    });
  }
}
