import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  form: FormGroup;
  friends: FormArray;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.friends = this.fb.array([]);
    this.form = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      phone: this.fb.control(''),
      friends: this.friends,
    });
  }

  addFriend() {
    console.info('Before form reset:', this.form.value);
    // this.form.reset();

    // Create a copy of the data
    const newFriend = this.fb.group({
      name: this.form.value.name,
      email: this.form.value.email,
      phone: this.form.value.phone,
    });
    console.log('New friend:', newFriend.value);

    this.friends.push(newFriend);

    // Clear form fields individually
    this.form.get('name').reset();
    this.form.get('email').reset();
    this.form.get('phone').reset();

    console.info('After form reset:', this.form.value);
  }

  dumpContent() {
    console.info('Dumping friends:');
    console.dir(this.form.value);
  }
}
