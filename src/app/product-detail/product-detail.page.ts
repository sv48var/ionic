import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { CartService } from '../services/cart.service';
import { ToastService } from '../services/toaster.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  product:any;
  currentIndex: number = 0;
  startX: number = 0;
  endX: number = 0;
  moreLikeProducts:any[] = [];

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private cartService: CartService,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    const sku = this.route.snapshot.paramMap.get('sku');
    if (sku) {
      this.product = this.dataService.getProductBySKU(sku);
      console.log(this.product);
  
      const cartItems = await this.cartService.getCartItems();
      const cartSkus = new Set(cartItems.map(item => item.sku));
  
      this.product.inCart = cartSkus.has(this.product.sku);
      this.getMoreLikeProducts(this.product.brand, this.product.gender);
    }
  }
  

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true
  };  

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

  nextSlide() {
    if (this.currentIndex < this.product.images.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; 
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.product.images.length - 1; 
    }
  }

  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
  }

  onTouchMove(event: TouchEvent) {
    this.endX = event.touches[0].clientX;
  }

  onTouchEnd() {
    if (this.startX - this.endX > 50) {
      this.nextSlide(); 
    } else if (this.endX - this.startX > 50) {
      this.prevSlide();  
    }
    this.startX = 0; 
    this.endX = 0;
  }

  selectImage(index: number) {
    this.currentIndex = index;
  }

  getSecureImageUrl(imageUrl: string): string {
    if (imageUrl.startsWith('http://')) {
      return imageUrl.replace('http://', 'https://');
    }
    return imageUrl;
  }

  async getMoreLikeProducts(brand:string, gender:string){
    this.moreLikeProducts = this.dataService.getRequiredProducts(brand, gender);
    console.log(this.moreLikeProducts)
  }
}
