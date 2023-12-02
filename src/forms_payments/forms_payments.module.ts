import { Module } from '@nestjs/common';
import { FormsPaymentsService } from './forms_payments.service';
import { FormsPaymentsController } from './forms_payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormsPayment } from './entities/forms_payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormsPayment])],
  controllers: [FormsPaymentsController],
  providers: [FormsPaymentsService],
})
export class FormsPaymentsModule {}
