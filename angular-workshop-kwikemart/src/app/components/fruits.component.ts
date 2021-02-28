import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-fruits',
  templateUrl: './fruits.component.html',
  styleUrls: ['./fruits.component.css'],
})
export class FruitsComponent implements OnInit {
  @Input() fileName: string;

  @Output() addItemEvent = new EventEmitter<string>();

  imgSrc: string;

  constructor() {}

  ngOnInit(): void {
    this.imgSrc = `assets/fruits/${this.fileName}`;
  }

  addItem() {
    this.addItemEvent.emit(this.fileName);
  }
}
