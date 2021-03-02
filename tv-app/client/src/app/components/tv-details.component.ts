import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TvDetails } from '../models';
import { TvShowService } from '../tvshow.service';

@Component({
  selector: 'app-tv-details',
  templateUrl: './tv-details.component.html',
  styleUrls: ['./tv-details.component.css'],
})
export class TvDetailsComponent implements OnInit {
  tvid: number;
  tvDetails: TvDetails;

  constructor(
    private tvShowSvc: TvShowService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tvid = parseInt(this.activatedRoute.snapshot.params.tvid);
    this.tvShowSvc
      .getTvDetails(this.tvid)
      .then((result) => {
        console.log('>>> result:', result);
        this.tvDetails = result;
        console.log('>>> tvDetails:', this.tvDetails);
      })
      .catch((error) => {
        console.error('ERROR:', error);
        this.router.navigate(['/error']);
      });
  }
}
