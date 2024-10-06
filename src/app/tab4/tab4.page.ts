import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { CartService } from '../services/cart.service';
import { ToastService } from '../services/toaster.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  kidsData:any[] = [];

  constructor(
    private dataService: DataService,
    private cartService: CartService,
    private toastService: ToastService
  ) {}

  async ngOnInit() {
    this.getKidsData();
  }
  
  async getKidsData(){
    await this.dataService.loadCSVData();
  
    const boysData = this.dataService.getCategoryData('Boys');
    const girlsData = this.dataService.getCategoryData('Girls');
  
    this.kidsData = [...girlsData, ...boysData];
  

    const cartItems = await this.cartService.getCartItems();
    const cartSkus = new Set(cartItems.map(item => item.sku)); 

    this.kidsData = this.kidsData.map(product => ({
      ...product,
      inCart: cartSkus.has(product.sku) 
    }));

    console.log('Updated Men Data with inCart:', this.kidsData);
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
