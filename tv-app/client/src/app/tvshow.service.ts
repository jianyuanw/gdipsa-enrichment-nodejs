import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TvDetails, TvShowSummary } from './models';

// const BASE_URL = 'http://localhost:3000';
const BASE_URL = '';

@Injectable()
export class TvShowService {
  constructor(private http: HttpClient) {}

  getGenres(): Promise<string[]> {
    return this.http.get<string[]>(`${BASE_URL}/api/genres`).toPromise();
  }

  getTvShowSummary(genre: string): Promise<TvShowSummary[]> {
    return this.http
      .get<TvShowSummary[]>(`${BASE_URL}/api/genre/${genre}`)
      .toPromise();
  }

  getTvDetails(tvid: number): Promise<TvDetails> {
    return this.http
      .get<TvDetails>(`${BASE_URL}/api/tvshow/${tvid}`)
      .toPromise();
  }
}
