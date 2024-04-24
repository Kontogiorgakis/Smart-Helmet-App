import { Document, Schema, Model, model } from 'mongoose';
import { DefaultSchemaOptions } from '../../../models/shared';


// ------------------------------------------
// Interface declaration
export interface INotification extends Document {
  lat: string;
  lon: string;
  message: string;
  completed: boolean;
}

// ------------------------------------------
// Schema definition
const notificationSchema = new Schema(
  {
    lat: { type: String, required: true },
    lon: {type: String, required: true },
    message: { type: String, required: true },
    completed: {type: Boolean, required: true},
  },
  { ...DefaultSchemaOptions }
);

// ------------------------------------------
// Schema model exports
export const NotificationModel: Model<INotification> = model<INotification>(
  'Notification', notificationSchema, 'Notification'
);
