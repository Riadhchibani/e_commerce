import { Component, OnInit } from '@angular/core';
import { Router } from 'express';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router) { }

  addProduct(productLabel: string, price: any, description: string) {
    const product = {} as Product;
   // product.price = price;
    product.shortLabel = productLabel;
    product.description = description; 
    //this.productService.addProduct(product);
  }

  ngOnInit(): void {
  }

}
