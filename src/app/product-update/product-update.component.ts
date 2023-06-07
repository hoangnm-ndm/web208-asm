import { IProduct } from '../interface/IProduct';
import { ProductService } from '../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css'],
})
export class ProductUpdateComponent implements OnInit {
  product!: IProduct;
  productForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(255),
        ],
      ],
      price: [0, [Validators.required, Validators.min(0)]],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.productService.getProductById(id).subscribe(
          (data: IProduct) => {
            this.product = data;
            this.productForm.patchValue({
              name: this.product.name,
              price: this.product.price,
            });
          },
          (error) => {
            console.log(error.message);
          }
        );
      }
    });
  }

  onHandleSubmit(): void {
    if (this.productForm.valid && this.product) {
      const updatedProduct: IProduct = {
        ...this.product,
        name: this.productForm.value.name,
        price: this.productForm.value.price,
      };

      this.productService.updateProduct(updatedProduct).subscribe(
        (product) => {
          console.log('Product updated successfully', product);
        },
        (error) => {
          console.error('Failed to update product', error);
        }
      );
    }
  }
}
