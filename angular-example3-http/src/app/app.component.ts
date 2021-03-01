import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ImageOfTheDay } from './models';

const URL = 'https://api.nasa.gov/planetary/apod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  imageOfTheDay: ImageOfTheDay;

  canShare: boolean;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.canShare = !!navigator['share'];
    console.info(this.canShare);
  }

  async getApiKey(key: string) {
    console.info('> api key:', key);
    const params = new HttpParams().set('api_key', key);
    this.imageOfTheDay = await this.http
      .get<ImageOfTheDay>(URL, { params })
      .toPromise();
    console.info('image:', this.imageOfTheDay);
  }

  async shareIt() {
    if (!this.imageOfTheDay) {
      return;
    }

    const shareData = {
      title: this.imageOfTheDay.title,
      text: this.imageOfTheDay.explanation,
      url: this.imageOfTheDay.url,
    };

    console.info('shareData:', shareData);

    await navigator.share(shareData);
  }
}
