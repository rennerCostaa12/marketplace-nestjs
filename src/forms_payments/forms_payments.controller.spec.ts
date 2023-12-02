import { Test, TestingModule } from '@nestjs/testing';
import { FormsPaymentsController } from './forms_payments.controller';
import { FormsPaymentsService } from './forms_payments.service';

describe('FormsPaymentsController', () => {
  let controller: FormsPaymentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormsPaymentsController],
      providers: [FormsPaymentsService],
    }).compile();

    controller = module.get<FormsPaymentsController>(FormsPaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
