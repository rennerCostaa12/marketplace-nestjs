import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { StatusSalesService } from './status_sales.service';
import { CreateStatusSaleDto } from './dto/create-status_sale.dto';
import { UpdateStatusSaleDto } from './dto/update-status_sale.dto';

@Controller('status-sales')
export class StatusSalesController {
  constructor(private readonly statusSalesService: StatusSalesService) {}

  @Post()
  create(@Body() createStatusSaleDto: CreateStatusSaleDto) {
    return this.statusSalesService.create(createStatusSaleDto);
  }

  @Get()
  findAll() {
    return this.statusSalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.statusSalesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStatusSaleDto: UpdateStatusSaleDto,
  ) {
    return this.statusSalesService.update(+id, updateStatusSaleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.statusSalesService.remove(+id);
  }
}
