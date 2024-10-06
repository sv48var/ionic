import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { CartService } from '../services/cart.service';
import { ToastService } from '../services/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  menData:any[] = [];

  constructor(
    private dataService: DataService,
    private cartService: CartService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getMenData('Men');
  }

  async getMenData(category:string){
    await this.dataService.loadCSVData();
    this.menData = this.dataService.getCategoryData(category);

    const cartItems = await this.cartService.getCartItems();
    const cartSkus = new Set(cartItems.map(item => item.sku)); 

    this.menData = this.menData.map(product => ({
      ...product,
      inCart: cartSkus.has(product.sku) 
    }));

    console.log('Updated Men Data with inCart:', this.menData);
  }

  // In your component.ts file
getSecureImageUrl(imageUrl: string): string {
  // Replace HTTP with HTTPS if needed
  if (imageUrl.startsWith('http://')) {
    return imageUrl.replace('http://', 'https://');
  }
  return imageUrl; // Already secure
}

  viewProductDetail(product:any){
    this.router.navigate(['product-detail', product.sku]);
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
}
