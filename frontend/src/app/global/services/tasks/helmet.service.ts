import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HelmetModel } from '../../models/helmet/helmet.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class HelmetService {

  private hostURl: string;

  constructor(private http: HttpClient) {
    this.hostURl = environment.host;
  }

  public getAll(): Observable<HelmetModel[]> {
    return this.http
      .get<HelmetModel[]>(`${this.hostURl}/api/helmet`)
      .pipe(map(result => _.map(result, (t) => new HelmetModel(t))));
  }

  public getById(id: string): Observable<HelmetModel> {
    return this.http
      .get<HelmetModel>(`${this.hostURl}/api/helmet/${id}`)
      .pipe(map(result => new HelmetModel(result)));
  }

  public create(resource: HelmetModel): Observable<HelmetModel> {
    console.log("xilia kommatia")
    return this.http
      .post<HelmetModel>(`${this.hostURl}/api/helmet`, resource)
      .pipe(map(result => new HelmetModel(result)));
  }

  public update(resource: HelmetModel): Observable<HelmetModel> {
    return this.http
      .put<HelmetModel>(`${this.hostURl}/api/helmet/${resource._id}`, resource)
      .pipe(map(result => new HelmetModel(result)));
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.hostURl}/api/helmet/${id}`);
  }

}
