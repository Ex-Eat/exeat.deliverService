import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Location {
  @Prop({ required: true })
  address: string;
  @Prop({ required: true })
  lat: number;
  @Prop({ required: true })
  lng: number;
}

export const LocationSchema = SchemaFactory.createForClass(Location);

@Schema({ timestamps: true })
export class Deliver {
  @Prop({ required: true })
  globalUserId: number;
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true })
  phoneNumber: string;
  @Prop({ required: true })
  birthDate: Date;
  @Prop({ required: true })
  termsOfUse: boolean;
  @Prop({ required: true, type: LocationSchema })
  location: Location;
  @Prop({ required: true })
  patronageCode: string;
  @Prop({ required: true })
  notification: boolean;
  @Prop({ required: true })
  movingRadius: number;
}

export type DeliverDocument = Deliver & Document;
export const DeliverSchema = SchemaFactory.createForClass(Deliver);
