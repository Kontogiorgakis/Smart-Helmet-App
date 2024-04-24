import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ProductModel} from '../../models/product/product.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private hostURl: string;

  constructor(private http: HttpClient) {
    this.hostURl = environment.host;
    console.log(this.hostURl)
  }

  public getAll(): Observable<ProductModel[]> {
    return this.http
      .get<ProductModel[]>(`${this.hostURl}/api/products`)
      .pipe(map(result => _.map(result, (t) => new ProductModel(t))));
  }

  public getById(id: string): Observable<ProductModel> {
    return this.http
      .get<ProductModel>(`${this.hostURl}/api/products/${id}`)
      .pipe(map(result => new ProductModel(result)));
  }

  public create(resource: ProductModel): Observable<ProductModel> {
    return this.http
      .post<ProductModel>(`${this.hostURl}/api/products`, resource)
      .pipe(map(result => new ProductModel(result)));
  }

  public update(resource: ProductModel): Observable<ProductModel> {
    return this.http
      .put<ProductModel>(`${this.hostURl}/api/products/${resource._id}`, resource)
      .pipe(map(result => new ProductModel(result)));
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.hostURl}/api/products/${id}`);
  }

}
