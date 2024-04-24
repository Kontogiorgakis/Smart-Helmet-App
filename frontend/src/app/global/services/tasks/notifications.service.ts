import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationModel } from '../../models/notifications/notifications.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private hostURl: string;

  constructor(private http: HttpClient) {
    this.hostURl = environment.host;
  }

  public getAll(): Observable<NotificationModel[]> {
    return this.http
      .get<NotificationModel[]>(`${this.hostURl}/api/notifications`)
      .pipe(map(result => _.map(result, (t) => new NotificationModel(t))));
  }

  public getById(id: string): Observable<NotificationModel> {
    return this.http
      .get<NotificationModel>(`${this.hostURl}/api/notifications/${id}`)
      .pipe(map(result => new NotificationModel(result)));
  }

  public create(resource: NotificationModel): Observable<NotificationModel> {
    return this.http
      .post<NotificationModel>(`${this.hostURl}/api/notifications`, resource)
      .pipe(map(result => new NotificationModel(result)));
  }

  public update(resource: NotificationModel): Observable<NotificationModel> {
    return this.http
      .put<NotificationModel>(`${this.hostURl}/api/notifications/${resource._id}`, resource)
      .pipe(map(result => new NotificationModel(result)));
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.hostURl}/api/notifications/${id}`);
  }

}
