import { Document, Schema, Model, model } from 'mongoose';
import { DefaultSchemaOptions } from '../../../models/shared';


// ------------------------------------------
// Interface declaration
export interface IHelmet extends Document {
  _id:string
  start: string;
  finish: string;
}

// ------------------------------------------
// Schema definition
const helmetSchema = new Schema(
  {
    _id: {type: String, required: true},
    start: {type: String, required: true},
    finsih: {type: String, required: true},

  },
  { ...DefaultSchemaOptions }
);

// ------------------------------------------
// Schema model exports
export const HelmetModel: Model<IHelmet> = model<IHelmet>(
  'Helmet', helmetSchema, 'Helmet'
);
