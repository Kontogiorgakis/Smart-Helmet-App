import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShopModel } from '../../models/shops/shop.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private hostURl: string;

  constructor(private http: HttpClient) {
    this.hostURl = environment.host;
  }

  public getAll(): Observable<ShopModel[]> {
    return this.http
      .get<ShopModel[]>(`${this.hostURl}/api/shops`)
      .pipe(map(result => _.map(result, (t) => new ShopModel(t))));
  }

  public getById(id: string): Observable<ShopModel> {
    return this.http
      .get<ShopModel>(`${this.hostURl}/api/shops/${id}`)
      .pipe(map(result => new ShopModel(result)));
  }

  public create(resource: ShopModel): Observable<ShopModel> {
    return this.http
      .post<ShopModel>(`${this.hostURl}/api/shops`, resource)
      .pipe(map(result => new ShopModel(result)));
  }

  public update(resource: ShopModel): Observable<ShopModel> {
    return this.http
      .put<ShopModel>(`${this.hostURl}/api/shops/${resource._id}`, resource)
      .pipe(map(result => new ShopModel(result)));
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.hostURl}/api/shops/${id}`);
  }

}
