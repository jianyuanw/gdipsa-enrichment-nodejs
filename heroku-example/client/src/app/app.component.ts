import { Component, OnInit } from '@angular/core';
import { FortuneService } from './fortune.service';
import { FortuneCookie } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  cookies: string[];

  constructor(private fortuneService: FortuneService) {}

  getFortunes() {
    console.info('Getting fortune cookies from the server');
    this.fortuneService.getFortuneCookie(3).then((result: FortuneCookie) => {
      console.info(result);
      this.cookies = result.cookies;
      console.info('Here are your cookies:', this.cookies);
    });
  }
}
