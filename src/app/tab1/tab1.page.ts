import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit,OnDestroy{

  categories = [
    { id: '1', name: 'Sale', image: './assets/img/sale.avif', route: '/tabs/tab1' },
    { id: '2', name: 'Men', image: './assets/img/men.avif', route: '/tabs/tab2' },
    { id: '3', name: 'Women', image: './assets/img/women.avif', route: '/tabs/tab3' },
    { id: '4', name: 'Kids', image: './assets/img/kids.avif', route: '/tabs/tab4' },
    { id: '5', name: 'Unisex', image: './assets/img/unisex.avif', route: '/tabs/tab5' },
  ];

  carouselImages1 = [
    './assets/img/image_1.avif' ,
    './assets/img/image_2.webp' ,
    './assets/img/image_3.avif' ,
    './assets/img/image_4.avif' ,
    './assets/img/image_5.avif' ,
 ];

 carouselImages2 = [
  './assets/img/img1.webp' ,
  './assets/img/img2.jpg' ,
  './assets/img/img3.avif' ,
  './assets/img/img4.jpg' ,
  './assets/img/img5.avif' ,
];
  
currentIndex1 = 0;
currentIndex2 = 0;
slideInterval1: any;
slideInterval2: any;
  startX = 0;

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.startAutoSlide1();
    this.startAutoSlide2();
  }

  ngOnDestroy() {
    this.stopAutoSlide1();
    this.stopAutoSlide2();
  }

  goToCategory(route: string) {
    this.router.navigate([route]);
  }

  startAutoSlide1() {
    this.slideInterval1 = setInterval(() => {
      this.nextSlide1();
    }, 3000); 
  }

  startAutoSlide2() {
    this.slideInterval2 = setInterval(() => {
      this.nextSlide2();
    }, 3000);
  }

  stopAutoSlide1() {
    if (this.slideInterval1) {
      clearInterval(this.slideInterval1);
    }
  }

  stopAutoSlide2() {
    if (this.slideInterval2) {
      clearInterval(this.slideInterval2);
    }
  }

  nextSlide1() {
    this.currentIndex1 = (this.currentIndex1 + 1) % this.carouselImages1.length;
  }

  nextSlide2() {
    this.currentIndex2 = (this.currentIndex2 + 1) % this.carouselImages2.length;
  }

  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
    this.stopAutoSlide1();
    this.stopAutoSlide2();
  }

  onTouchMove(event: TouchEvent, carousel: number) {
    const touchX = event.touches[0].clientX;
    const diffX = this.startX - touchX;

    if (diffX > 50) {
      if (carousel === 1) {
        this.nextSlide1();
      } else {
        this.nextSlide2();
      }
    } else if (diffX < -50) {
      if (carousel === 1) {
        this.currentIndex1 = (this.currentIndex1 - 1 + this.carouselImages1.length) % this.carouselImages1.length;
      } else {
        this.currentIndex2 = (this.currentIndex2 - 1 + this.carouselImages2.length) % this.carouselImages2.length;
      }
    }
  }

  onTouchEnd() {
    this.startAutoSlide1(); 
    this.startAutoSlide2(); 
  }
}
