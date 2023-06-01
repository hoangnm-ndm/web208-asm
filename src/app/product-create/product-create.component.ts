import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { IProduct } from '../interface/IProduct';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent {
  productForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    price: [0],
  });

  constructor(
    private formBuilder: UntypedFormBuilder,
    private productService: ProductService
  ) {}
  onHandleSubmit() {
    const product: IProduct = {
      id: '',
      name: this.productForm.value.name || '',
      price: this.productForm.value.price || 0,
    };

    this.productService.addProduct(product).subscribe((product) => {
      alert(`Thêm sản phẩm thành công: ${product.name}`);
    });
  }
}
