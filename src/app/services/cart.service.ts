import Dexie from 'dexie';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService extends Dexie {
  cart: Dexie.Table<any, string>; 

  constructor() {
    super('ECommerceDB'); 
    this.version(1).stores({
      cart: 'sku, name, price, quantity, brand, images' 
    });

    this.cart = this.table('cart');
  }

  async addToCart(product: any) {
    const existingProduct = await this.cart.get(product.sku);

    if (existingProduct) {
      await this.cart.update(product.sku, { quantity: existingProduct.quantity + 1 });
    } else {
      product.quantity = 1;  
      await this.cart.add(product);
    }
  }

  async getCartItems() {
    return await this.cart.toArray();
  }

  async removeFromCart(sku: string) {
    await this.cart.delete(sku);
  }

  async clearCart() {
    await this.cart.clear();
  }
}
