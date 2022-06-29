import { Connection, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Deliver, DeliverDocument, Location } from '../schemas/deliver.schema';
import { ICreateDeliverDto } from '../dto/create-deliver.dto';
import { lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { config } from '../config';

@Injectable()
export class DeliverService {
  constructor(
    @InjectModel(Deliver.name) private deliverModel: Model<DeliverDocument>,
    @InjectConnection() private connection: Connection,
    private _httpService: HttpService,
  ) {}

  async create(createDeliverDto: ICreateDeliverDto): Promise<Deliver> {
    const createdDeliverDto = new this.deliverModel(createDeliverDto);
    return createdDeliverDto.save();
  }

  async update(filter, update): Promise<Deliver> {
    const oldDoc = await this.deliverModel.updateOne(filter, update);
    return await this.deliverModel.findOne(filter).exec();
  }

  async findAll(): Promise<Deliver[]> {
    return this.deliverModel.find().exec();
  }

  async get(globalUserId: number): Promise<Deliver> {
    return await this.deliverModel
      .findOne({ globalUserId: globalUserId })
      .exec();
  }

  async geocoding(address: string): Promise<Location> {
    const response = await lastValueFrom(
      this._httpService
        .get(
          'https://api.geoapify.com/v1/geocode/search?text=' +
            encodeURI(address) +
            '&apiKey=' +
            config.GEOCODING_API_KEY,
        )
        .pipe(map((response) => response.data)),
    );

    console.log('test');

    return {
      lat: response.features[0].properties.lat,
      lng: response.features[0].properties.lon,
      address: response.features[0].properties.formatted,
    };
  }

  async delete(
    globalUserId: number,
  ): Promise<{ error: boolean; message: string }> {
    return this.deliverModel
      .deleteOne({ globalUserId: globalUserId })
      .then(function () {
        return { error: false, message: 'user deleted' };
      })
      .catch(function (error) {
        return { error: true, message: error };
      });
  }
}
