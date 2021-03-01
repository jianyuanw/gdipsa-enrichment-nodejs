import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FortuneCookie } from './models';

// const SERVER_URL = 'http://localhost:3000';
const SERVER_URL = 'https://angular-http-fortune-cookie.herokuapp.com';
// const SERVER_URL = '';

@Injectable()
export class FortuneService {
  constructor(private http: HttpClient) {}

  getFortuneCookie(n = 1): Promise<FortuneCookie> {
    const params = new HttpParams().set('n', `${n}`);
    return this.http
      .get<FortuneCookie>(`${SERVER_URL}/api/fortune`, { params })
      .toPromise();
  }
}
