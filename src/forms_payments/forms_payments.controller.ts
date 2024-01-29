import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { FormsPaymentsService } from './forms_payments.service';
import { CreateFormsPaymentDto } from './dto/create-forms_payment.dto';
import { UpdateFormsPaymentDto } from './dto/update-forms_payment.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('forms-payments')
export class FormsPaymentsController {
  constructor(private readonly formsPaymentsService: FormsPaymentsService) {}

  @Post('create')
  create(@Body() createFormsPaymentDto: CreateFormsPaymentDto) {
    return this.formsPaymentsService.create(createFormsPaymentDto);
  }

  @Get('find-all')
  findAll() {
    return this.formsPaymentsService.findAll();
  }

  @Get('find-one/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.formsPaymentsService.findOne(id);
  }

  @Patch('update/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFormsPaymentDto: UpdateFormsPaymentDto,
  ) {
    return this.formsPaymentsService.update(id, updateFormsPaymentDto);
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.formsPaymentsService.remove(id);
  }
}
