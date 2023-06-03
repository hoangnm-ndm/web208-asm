import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../interface/IProduct';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
  product!: IProduct;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.route.paramMap.subscribe((param) => {
      const id = String(param.get('id'));
      this.productService.getProductById(id).subscribe(
        (product) => {
          this.product = product;
        },
        (error) => console.log(error.message)
      );
    });
  }
}
