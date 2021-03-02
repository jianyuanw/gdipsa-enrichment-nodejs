import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// const SERVER_URL = 'http://localhost:3000';
const SERVER_URL = '';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  imgSrcs: string[];
  form: FormGroup;
  searchTerm: string;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.form = this.fb.group({
      search: ['', Validators.required],
    });
  }

  generateGifs() {
    const searchTerm = this.form.get('search').value.trim();
    if (!searchTerm) {
      return;
    }
    const params = new HttpParams().set('q', searchTerm);
    this.http
      .get<string[]>(`${SERVER_URL}/api/giphy`, {
        params,
      })
      .toPromise()
      .then((result) => {
        this.imgSrcs = result;
      });
    this.searchTerm = searchTerm;
  }
}
