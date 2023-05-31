import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../interface/IProduct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  API = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.API}`);
  }
  getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.API}/${id}`);
  }
}
