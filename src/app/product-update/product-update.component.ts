import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../interface/IProduct';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css'],
})
export class ProductUpdateComponent {
  product!: IProduct;
  productForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    price: [0],
  });

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: ActivatedRoute
  ) {
    this.router.paramMap.subscribe((params) => {
      const id = String(params.get('id'));
      this.productService.getProductById(id).subscribe(
        (data) => {
          console.log(data);
          this.product = data;

          this.productForm.patchValue({
            name: data.name,
            price: data.price,
          });
        },
        (error) => console.log(error.message)
      );
    });
  }
  onHandleSubmit() {
    if (this.productForm.valid) {
      const product: IProduct = {
        id: '',
        name: this.productForm.value.name || '',
        price: this.productForm.value.price || 0,
      };

      this.productService.updateProduct(product).subscribe((product) => {
        console.log(product);
        console.log('product', product);
      });
    }
  }
}
