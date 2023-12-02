import { Module } from '@nestjs/common';
import { FormDeliveryService } from './form_delivery.service';
import { FormDeliveryController } from './form_delivery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormDelivery } from './entities/form_delivery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormDelivery])],
  controllers: [FormDeliveryController],
  providers: [FormDeliveryService],
})
export class FormDeliveryModule {}
