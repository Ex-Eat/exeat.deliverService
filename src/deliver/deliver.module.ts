import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeliverController } from './deliver.controller';
import { DeliverService } from './deliver.service';
import { Deliver, DeliverSchema } from '../schemas/deliver.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Deliver.name, schema: DeliverSchema }]),
    HttpModule,
  ],
  controllers: [DeliverController],
  providers: [DeliverService],
})
export class DeliverModule {}
