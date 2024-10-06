import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { CartService } from '../services/cart.service';
import { ToastService } from '../services/toaster.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  womenData:any[] = [];

  constructor(
    private dataService: DataService,
    private cartService: CartService,
    private toastService: ToastService
  ) {}

  async ngOnInit() {
    this.getWomenData('Women');
  }

  async getWomenData(category:string){
    await this.dataService.loadCSVData();
    this.womenData = this.dataService.getCategoryData(category);

    const cartItems = await this.cartService.getCartItems();
    const cartSkus = new Set(cartItems.map(item => item.sku)); 

    this.womenData = this.womenData.map(product => ({
      ...product,
      inCart: cartSkus.has(product.sku) 
    }));

    console.log('Updated Men Data with inCart:', this.womenData);
  }

  async addToCart(product: any) {
    await this.cartService.addToCart(product);
    product.inCart = true;
    this.toastService.showToast(`${product.name} removed from cart.`, 'success');
    console.log('Product added to cart:', product);
  }

  async removeFromCart(product:any) {
    await this.cartService.removeFromCart(product.sku);
    product.inCart = false;
    this.toastService.showToast(`${product.name} removed from cart.`, 'error');
    console.log(`Product with SKU ${product.sku} removed from cart`);
  }

  getSecureImageUrl(imageUrl: string): string {
    // Replace HTTP with HTTPS if needed
    if (imageUrl.startsWith('http://')) {
      return imageUrl.replace('http://', 'https://');
    }
    return imageUrl; // Already secure
  }
}
