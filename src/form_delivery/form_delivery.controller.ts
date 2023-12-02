import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { FormDeliveryService } from './form_delivery.service';
import { CreateFormDeliveryDto } from './dto/create-form_delivery.dto';
import { UpdateFormDeliveryDto } from './dto/update-form_delivery.dto';

@Controller('form-delivery')
export class FormDeliveryController {
  constructor(private readonly formDeliveryService: FormDeliveryService) {}

  @Post()
  create(@Body() createFormDeliveryDto: CreateFormDeliveryDto) {
    return this.formDeliveryService.create(createFormDeliveryDto);
  }

  @Get('find-all')
  findAll() {
    return this.formDeliveryService.findAll();
  }

  @Get('find-one/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.formDeliveryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFormDeliveryDto: UpdateFormDeliveryDto,
  ) {
    return this.formDeliveryService.update(id, updateFormDeliveryDto);
  }
}
