import { Component, OnInit } from '@angular/core';
import { DisplayRange } from './components/pager.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'scratchpad';

  display = [];
  digit = -1;
  range: DisplayRange = { min: 1, max: 10 };

  ngOnInit() {
    this.pageTo(this.range);
  }

  processDigit(d) {
    this.digit = d;
  }

  reset() {
    this.digit = -1;
  }

  pageTo(range: DisplayRange) {
    this.range = range;
    this.display = [];
    for (let i = this.range.min; i <= this.range.max; i++) {
      this.display.push(i);
    }
  }
}
