import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar, private productService: ProductService, private router: Router) { }

  addProduct(productLabel: string, price: any, description: string) {
    const product = {} as Product;
    product.price = price;
    product.shortLabel = productLabel;
    product.description = description;
    this.productService.addProduct(product).subscribe(
      data => {
        this._snackBar.open("produit ajouté", '', {
          duration: 1000
        });
      }
    );
  }

  ngOnInit(): void {
  }

}
