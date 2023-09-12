import { Module } from '@nestjs/common';
import { StatusSalesService } from './status_sales.service';
import { StatusSalesController } from './status_sales.controller';
import { StatusSale } from './entities/status_sale.entity';
import { Admin } from 'src/admins/entities/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StatusSale, Admin])],
  controllers: [StatusSalesController],
  providers: [StatusSalesService],
})
export class StatusSalesModule {}
