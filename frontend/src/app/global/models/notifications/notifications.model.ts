export class NotificationModel {
  public _id!: string; // generated by mongoDB
  public lat!: string;
  public lon!: string;
  public message!: string;
  public completed!: boolean;
  //public where!: string;
  public createdAt!: Date; // generated by mongoDB
  constructor(model?: any) {
    Object.assign(this, model);
  }

}
