import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-api-key',
  templateUrl: './api-key.component.html',
  styleUrls: ['./api-key.component.css'],
})
export class ApiKeyComponent implements OnInit {
  @Output() apiKey = new EventEmitter<string>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      apiKey: ['', Validators.required],
    });
  }

  processForm() {
    const key = this.form.get('apiKey').value;
    console.info('Key:', key);
    this.apiKey.emit(key);
  }
}
