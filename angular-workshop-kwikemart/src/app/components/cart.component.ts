import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  @Input() cart: string[];

  cartForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    items: this.fb.array([]),
  });

  get items() {
    return this.cartForm.get('items') as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  addItem(fruit: string) {
    this.items.push(
      this.fb.group({
        fruit: [{ value: fruit, disabled: true }, Validators.required],
        quantity: [0, [Validators.required, Validators.min(0)]],
      })
    );
  }

  checkout() {
    let name = this.cartForm.get('name').value;
    let email = this.cartForm.get('email').value;

    let cartItems = [];
    for (const item of this.items.controls) {
      cartItems.push({
        name: item.get('fruit').value,
        quantity: item.get('quantity').value,
      });
    }

    let orderDetails = {
      name: name,
      email: email,
      items: cartItems,
    };
    console.info(orderDetails);
  }
}
