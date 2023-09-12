import { Test, TestingModule } from '@nestjs/testing';
import { StatusSalesController } from './status_sales.controller';
import { StatusSalesService } from './status_sales.service';

describe('StatusSalesController', () => {
  let controller: StatusSalesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusSalesController],
      providers: [StatusSalesService],
    }).compile();

    controller = module.get<StatusSalesController>(StatusSalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
