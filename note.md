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

# B2:

- Cấu hình routing:

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

```js
  API = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.API}`);
  }
  getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.API}/${id}`);
  }
```
