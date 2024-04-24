import { Document, Schema, Model, model } from 'mongoose';
import { DefaultSchemaOptions } from '../../../models/shared';


// ------------------------------------------
// Interface declaration
export interface IProduct extends Document {
  name: string;
  counter: number;
  minimum: number;
  liked: boolean;
}

// ------------------------------------------
// Schema definition
const productSchema = new Schema(
  {
    name: { type: String, required: true },
    counter: { type: Number, required: true },
    minimum: {type: Number, required: true},
    liked: {type: Boolean, required: true},
  },
  { ...DefaultSchemaOptions }
);

// ------------------------------------------
// Schema model exports
export const ProductModel: Model<IProduct> = model<IProduct>(
  'Product', productSchema, 'Product'
);
