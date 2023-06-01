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

  { path: "product/:id", component: ProductDetailComponent },
  { path: "product-create", component: ProductCreateComponent },
  { path: "products-update/:id", component: ProductUpdateComponent },
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

# B7: Xây dựng tính năng xoá

# B8: Xây dựng tính năng/trang create new product (form)

# B9: Xây dựng tính năng/trang update product

# B10: Xây dựng trang product detail

# B11: Xây dựng tính năng register

# B12: Xây dựng tính năng login

# B13: Xây dựng tính năng phân quyền

- Khi đăng nhập và có quyền admin -> chuyển về trang products-list
- Khi chưa đăng nhập, thông báo chưa đăng nhập
- Khi đã đăng nhập quyền member -> hiển thị trang products-list với tính năng thêm, sửa, xoá bị disnable
