import { Location } from '../schemas/deliver.schema';

export interface ICreateDeliverDto {
  globalUserId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthDate: Date;
  termsOfUse: boolean;
  location: Location;
  patronageCode: string;
  notification: boolean;
  movingRadius: number;
}
export interface ICreateLocationDto {
  address: string;
  lat: number;
  lng: number;
}
