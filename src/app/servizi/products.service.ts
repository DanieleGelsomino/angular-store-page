import { Injectable } from '@angular/core';
import products from '../../data/products.json';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: any = products;
  constructor() {}

  getProducts() {
    return this.products;
  }

  getProduct(index: number) {
    return this.products[index];
  }
}
