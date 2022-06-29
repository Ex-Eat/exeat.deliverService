import { Location } from '../schemas/deliver.schema';

export interface ICreateDeliverDto {
  globalUserId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  termsOfUse: boolean;
  location: Location;
  patronageCode: string;
  notification: boolean;
}
export interface ICreateLocationDto {
  address: string;
  lat: number;
  lng: number;
}
