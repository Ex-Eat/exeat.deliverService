import { Controller, Get, Post } from '@nestjs/common';
import { DeliverService } from './deliver.service';
import { Deliver } from '../schemas/deliver.schema';
import { ICreateDeliverDto } from '../dto/create-deliver.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('deliver')
export class DeliverController {
  constructor(private readonly deliverService: DeliverService) {}

  @MessagePattern({ cmd: 'createDeliver' })
  create(data: string): Promise<Deliver> {
    const deliver: ICreateDeliverDto = JSON.parse(data);
    return this.deliverService.create(deliver);
  }

  @MessagePattern({ cmd: 'getDeliver' })
  get(data: string): Promise<Deliver> {
    const parsedData = JSON.parse(data);
    return this.deliverService.get(parsedData.globalUserId);
  }

  @MessagePattern({ cmd: 'updateDeliver' })
  update(data: string): Promise<Deliver> {
    const parsedData = JSON.parse(data);
    return this.deliverService.update(parsedData.filter, parsedData.update);
  }

  @MessagePattern({ cmd: 'deleteDeliver' })
  delete(data: string): Promise<{ error: boolean; message: string }> {
    const parsedData = JSON.parse(data);
    return this.deliverService.delete(parsedData.globalUserId);
  }
}
