# B1:

```
ng new assignment
cd assignment
npm i concurrently json-server

```

- config alias in package.json:

```
"dev": "concurrently \"json-server -w db.json\" \"ng serve -o\""
```

- Trong db.json:

```json
{
  "products": [
    { "id": "1", "name": "product A", "price": 200 },
    { "id": "2", "name": "product B", "price": 200 },
    { "id": "3", "name": "product C", "price": 200 },
    { "id": "4", "name": "product D", "price": 200 }
  ],
  "users": [{ "id": "1", "username": "hoangnm", "password": "1234567" }]
}
```

```
npm run dev
```

# B2: Cấu hình routing:

- Tại file app-routing.module.ts, thêm nội dung:

```js
const routes: Routes = [
  { path: "", component: ProductsListComponent },
  { path: "product-create", component: ProductCreateComponent },
  { path: "products-update/:id", component: ProductUpdateComponent },
  { path: "product-detail/:id", component: ProductDetailComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
];
```

- dùng terminal để generate tất cả những component còn thiếu ở trên.

- Tại app.component.html:

```html
<router-outlet></router-outlet>
```

# B3: Tạo interface:

- Tạo folder interface.
- Tạo 2 file IProduct.ts và IUser.ts trong folder interface với nội dung lần lượt tương ứng:

```js
export interface IProduct {
  id: string;
  name: string;
  price: number;
}
```

```js
export interface IUser {
  id: string;
  username: string;
  password: string;
}
```

# B4: Tạo services/product:

```
ng g s services/product
```

- Trong file services/product, cấu hình các method:
  (đổi đường dẫn API theo đúng serve mà bạn đang có)

```js
export class ProductService {
  API = 'http://localhost:3000/products';

  constructor(public http: HttpClient) {}
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.API}`);
  }
  getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.API}/${id}`);
  }

  addProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.API}`, product);
  }
  updateProduct(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.API}/${product.id}`, product);
  }
  deleteProduct(id: string): Observable<IProduct> {
    return this.http.delete<IProduct>(`${this.API}/${id}`);
  }
}
```

- Khi sử dụng HttpClient, bạn sẽ gặp lỗi:

```error
core.mjs:10162 ERROR Error: Uncaught (in promise): NullInjectorError: R3InjectorError(AppModule)[ProductService -> HttpClient -> HttpClient]:
  NullInjectorError: No provider for HttpClient!
NullInjectorError: R3InjectorError(AppModule)[ProductService -> HttpClient -> HttpClient]:
  NullInjectorError: No provider for HttpClient!
```

- Lúc này cần phải import HttpClientModule trong app.module.ts:

```js
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

# B5: get products-list

Trong products-list/products-list.component.ts, gọi ra danh sách sản phẩm:

```js
export class ProductsListComponent {
  products: IProduct[] = [];
  constructor(private productService: ProductService) {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => console.log(error.message)
    );
  }
}
```

- Đoạn code trên:
  - khởi tạo 1 biến products
  - Những nội dung trong hàm constructor sẽ được khởi chạy khi component được gọi
  - trong hàm constructor(), gọi service getProducts mà chúng ta đã xây dựng.

# B6: Xây dựng giao diện trang product-list:

- Cài đặt bootstrap:

```
npm i bootstrap
```

- Thêm thư viện boostrap vào trong angular.json. mục projects/architect/build/options:

```json
"styles": [
  "./node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
],
"scripts": ["./node_modules/bootstrap/dist/js/bootstrap.min.js"]
```

- Trong products-list/products-list.component.html, hãy thêm:

```html
<a routerLink="product-create">Create New</a>
<div class="container">
  <div class="row">
    <div class="col-3">STT</div>
    <div class="col-3">Name</div>
    <div class="col-3">Price</div>
    <div class="col-3">Action</div>
  </div>
  <div class="row" *ngFor="let product of products; index as i">
    <div class="col-3">{{ i + 1 }}</div>
    <div class="col-3">{{ product.name }}</div>
    <div class="col-3">{{ product.price }}</div>
    <div class="col-3">
      <button>View Detail</button>
      <button>Delete</button>
      <button>Update</button>
    </div>
  </div>
</div>
```

- khởi chạy `ng s -o ` và kiểm tra xem đã hiển thị được danh sách sản phẩm hay chưa.

# B7: Xây dựng tính năng/trang create new product (form)

- Tại trang products-list, thay đổi đường dẫn create-new để sau khi nhấn sẽ chuyển sang trang create-new:

```html
<a routerLink="product-create">Create New</a>
```

- Tại template của product-create, thêm form:

```html
<div class="container">
  <form [formGroup]="productForm" (ngSubmit)="onHandleSubmit()">
    <input type="text" formControlName="name" />
    <input type="number" formControlName="price" />
    <button type="submit" [disabled]="!productForm.valid">Thêm</button>
  </form>
</div>
```

- Tại component của product-create, tạo FormControl:

```js
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

```

- Lưu ý: khi dùng formGroup trong template, bạn cần import ReactiveFormsModule trong mục app.module.ts:

```ts
  imports: [
    ...
    ReactiveFormsModule,
  ],
```

# B8: Xây dựng tính năng xoá

- Tại template của trang products-list, thêm sự kiện cho button "Xoá":

```html
<button class="btn btn-danger" (click)="delete(item.id!)">Xóa</button>
```

- Tại component của trang products-list, hãy khai báo chức năng xoá:

```ts
  delete(id: string) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id)
    })
  }
```

# B9: Xây dựng tính năng/trang update product

- Sửa lại nội dung nút bấm trong trong template product-list:

```html
<div class="col-3 d-flex justify-content-around">
  <button>View Detail</button>
  <button class="btn btn-danger" (click)="delete(product.id!)">Xóa</button>
  <a class="btn" [routerLink]="'products-update/' + product.id">Update</a>
</div>
```

- Tại template của trang product-update, tạo form:

```html
<div class="container">
  <form (ngSubmit)="onHandleSubmit()" [formGroup]="productForm">
    <input type="text" formControlName="name" placeholder="Tên sản phẩm" />
    <input type="number" formControlName="price" placeholder="Giá sản phẩm" />
    <button>Cập nhật sản phẩm</button>
  </form>
</div>
```

- Tại product-update.component.ts, thực hiện các việc sau:

```ts
import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { IProduct } from "../interface/IProduct";
import { ProductService } from "../services/product.service";

@Component({
  selector: "app-product-update",
  templateUrl: "./product-update.component.html",
  styleUrls: ["./product-update.component.css"],
})
export class ProductUpdateComponent {
  product!: IProduct;
  // Khởi tạo biến product có interface: IProduct
  // Dấu "!" hiển thị rằng biến này sẽ được gán giá trị sau, lần đầu khởi tạo sẽ không có giá trị ban đầu.
  productForm = this.formBuilder.group({
    name: ["", [Validators.required, Validators.minLength(4)]],
    price: [0],
  });
  // productForm sẽ tạo ra giá trị default và validation cho Form như trên

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private router: ActivatedRoute) {
    this.router.paramMap.subscribe((params) => {
      const id = String(params.get("id"));
      // lấy ra id của sản phẩm
      this.productService.getProductById(id).subscribe(
        // Tìm ra sản phẩm theo id và patchValue vào form
        (data) => {
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
      // Khi nhấn submit, khởi tạo sẵn giá trị cho product lấy từ form người dùng nhập hoặc để default value
      const product: IProduct = {
        id: "",
        name: this.productForm.value.name || "",
        price: this.productForm.value.price || 0,
      };

      this.productService.updateProduct(product).subscribe((product) => {
        alert(`Cập nhật sản phẩm thành công: ${product.name}`);
        // console.log("product", product);
      });
    }
  }
}
```

# B10: Xây dựng trang product detail

- Tại template product-detail, xây dựng giao diện:

```html
<div class="container">
  <div *ngIf="product">
    <h2>{{ product.name }}</h2>
    <p>Giá: {{ product.price }}</p>
  </div>
</div>
```

- Tại component product-detail, thực hiện get product dựa vào id.

```ts
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
```

# B11: Xây dựng tính năng register

# B12: Xây dựng tính năng login

# B13: Xây dựng tính năng phân quyền, bảo vệ secret router

- Khi đăng nhập và có quyền admin -> chuyển về trang products-list
- Khi chưa đăng nhập, thông báo chưa đăng nhập
- Khi đã đăng nhập quyền member -> hiển thị trang products-list với tính năng thêm, sửa, xoá bị disnable
