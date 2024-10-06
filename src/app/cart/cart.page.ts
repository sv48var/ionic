import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;

  constructor(private cartService: CartService) {}

  async ngOnInit() {
    this.cartItems = await this.cartService.getCartItems();
    this.calculateTotal();
  }

  removeFromCart(sku: string) {
    this.cartService.removeFromCart(sku);
    this.cartItems = this.cartItems.filter(item => item.sku !== sku);
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalAmount = this.cartItems.reduce((total, item) => total + parseInt(item.price, 10), 0);
  }

  getSecureImageUrl(imageUrl: string): string {
    if (imageUrl.startsWith('http://')) {
      return imageUrl.replace('http://', 'https://');
    }
    return imageUrl;
  }

  proceedToBuy(){

  }
}
