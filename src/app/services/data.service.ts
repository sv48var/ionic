// src/app/services/data.service.ts
import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: any[] = [];

  constructor() {
    // this.loadCSVData();
  }

  loadCSVData(): Promise<void> {
    return new Promise((resolve) => {
      Papa.parse('assets/data.csv', {
        download: true,
        header: true,
        complete: (result) => {
          this.data = result.data.map((item:any) => ({
            ...item,
            images: item.images ? item.images.split(' ~ ') : [] 
          }));
          console.log('Parsed Data with Images Array:', this.data); 
          resolve(); 
        }
      });
    });
  }

  getCategoryData(gender: string) {
    return this.data.filter(item => item.gender === gender);
  }

  getProductBySKU(sku: string) {
    return this.data.find(product => product.sku === sku);
  }  

  getRequiredProducts(brand:string, gender:string) {
    return this.data.filter(product => (product.brand === brand && product.gender === gender))
  }
}

