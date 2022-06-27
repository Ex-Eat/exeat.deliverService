import { Connection, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { DeliverDocument, Deliver } from '../schemas/deliver.schema';
import { ICreateDeliverDto } from '../dto/create-deliver.dto';

@Injectable()
export class DeliverService {
  constructor(
    @InjectModel(Deliver.name) private deliverModel: Model<DeliverDocument>,
    @InjectConnection() private connection: Connection,
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
