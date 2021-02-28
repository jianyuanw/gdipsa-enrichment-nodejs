import { Component, OnInit, ViewChild } from '@angular/core';
import { CartComponent } from './components/cart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  fruitFileNames: string[] = [
    'acorn_squash.png',
    'apple.png',
    'bell_pepper.png',
    'blueberries.png',
    'broccoli.png',
    'carrot.png',
    'celery.png',
    'chili_pepper.png',
    'corn.png',
    'eggplant.png',
    'lettuce.png',
    'mushroom.png',
    'onion.png',
    'potato.png',
    'pumpkin.png',
    'radish.png',
    'squash.png',
    'strawberry.png',
    'sugar_snap.png',
    'tomato.png',
    'zucchini.png',
  ];

  cart: string[];

  @ViewChild(CartComponent) cartComponent: CartComponent;

  ngOnInit() {
    this.cart = [];
  }

  addToCart(item: string) {
    console.log('Add to cart:', item);
    if (!this.cart.includes(item)) {
      this.cart.push(item);
      let fruit = this.imageFileNameToFruitName(item);
      this.cartComponent.addItem(fruit);
    }
  }

  imageFileNameToFruitName(fileName: string): string {
    let index = fileName.lastIndexOf('.');
    let noExtension = fileName.slice(0, index);
    let splitted = noExtension.split('_');
    for (let i = 0; i < splitted.length; i++) {
      splitted[i] = splitted[i][0].toUpperCase() + splitted[i].slice(1);
    }
    return splitted.join(' ');
  }
}
