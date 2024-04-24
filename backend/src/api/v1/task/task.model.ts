import { Document, Schema, Model, model } from 'mongoose';
import { DefaultSchemaOptions } from '../../../models/shared';


// ------------------------------------------
// Interface declaration
export interface ITask extends Document {
  type: string;
  name: string;
  quantity: string;
  store: string;
  price: string;
  place: string;
  status: string;
}

// ------------------------------------------
// Schema definition
const taskSchema = new Schema(
  {
    type: { type: String, required: true },
    name: { type: String, required: true },
    store: { type: String, required: true },
    quantity: {type: String, required: true},
    price: {type: String, required: true},
    status: {type: String, required: true},
  },
  { ...DefaultSchemaOptions }
);

// ------------------------------------------
// Schema model exports
export const TaskModel: Model<ITask> = model<ITask>(
  'Task', taskSchema, 'Task'
);
