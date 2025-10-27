import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RequestLogDocument = RequestLog & Document;

@Schema({ timestamps: true })
export class RequestLog {
  @Prop({ required: true })
  clientId!: string;

  @Prop({ required: true })
  path!: string;

  @Prop({ required: true })
  method!: string;

  @Prop()
  ip?: string;

  @Prop()
  userAgent?: string;

  @Prop({ type: Object })
  meta?: Record<string, unknown>;
}

export const RequestLogSchema = SchemaFactory.createForClass(RequestLog);
