import { Document, Schema, Model, model } from 'mongoose';
import { DefaultSchemaOptions } from '../../../models/shared';


// ------------------------------------------
// Interface declaration
export interface IItem extends Document {
  lat: string;
  lon: string;
  image: string;
  name: string;
  location: string;
  isAvailable: boolean;
  selected: boolean;
}

// ------------------------------------------
// Schema definition
const itemSchema = new Schema(
  {
    lat: {type: String, required: true},
    lon: {type: String, required: true},
    image: {type: String, required: true},
    name: {type: String, required: true},
    location: {type: String, required: true},
    isAvailable: {type: Boolean, required: true},
    selected: {type: Boolean, required: true}
  },
  { ...DefaultSchemaOptions }
);

// ------------------------------------------
// Schema model exports
export const ItemModel: Model<IItem> = model<IItem>(
  'Item', itemSchema, 'Item'
);
