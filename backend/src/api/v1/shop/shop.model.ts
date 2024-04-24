import { Document, Schema, Model, model } from 'mongoose';
import { DefaultSchemaOptions } from '../../../models/shared';


// ------------------------------------------
// Interface declaration
export interface IShop extends Document {
  name: string;
  /*The products and the prices*/
  //chicken
  chickenWhole: number;
  chickenBreasts: number;
  chickenDrums: number;
  chickenLegs: number;

  //fruits
  pineapple: number;
  mango: number;
  avocado: number;

  //soda
  cocaCola: number;
  redBull: number;
  gatorad: number;

  //snacks
  chips: number;
  popCorn: number;
  biscuits: number;

  //bathroom
  tootbrush: number;
  toothpaste: number;
  dentalFloss: number;
}

// ------------------------------------------
// Schema definition
const shopSchema = new Schema(
  {
    name: { type: String, required: true },
    chickenWhole: { type: Number, required: true },
    chickenBreasts: { type: Number, required: true },
    chickenDrums: { type: Number, required: true },
    chickenLegs: { type: Number, required: true },
    pineapple: { type: Number, required: true },
    mango: { type: Number, required: true },
    avocado: { type: Number, required: true },
    cocaCola: { type: Number, required: true },
    redBull: { type: Number, required: true },
    gatorad: { type: Number, required: true },
    chips: { type: Number, required: true },
    popCorn: { type: Number, required: true },
    biscuits: { type: Number, required: true },
    tootbrush: { type: Number, required: true },
    toothpaste: { type: Number, required: true },
    dentalFloss: { type: Number, required: true },
  },
  { ...DefaultSchemaOptions }
);

// ------------------------------------------
// Schema model exports
export const ShopModel: Model<IShop> = model<IShop>(
  'Shop', shopSchema, 'Shop'
);
