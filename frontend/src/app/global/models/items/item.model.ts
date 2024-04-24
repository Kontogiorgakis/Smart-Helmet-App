export class ItemModel {

  public _id!: string; // generated by mongoDB
  public lat!: string;
  public lon!: string;
  public image!: string;
  public name!: string;
  public location!: string;
  public isAvailable!: boolean;
  public selected?: boolean
  //public where!: string;
  public createdAt!: Date; // generated by mongoDB
  constructor(model?: any) {
    Object.assign(this, model);
  }
}
