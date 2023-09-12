import { Test, TestingModule } from '@nestjs/testing';
import { StatusSalesService } from './status_sales.service';

describe('StatusSalesService', () => {
  let service: StatusSalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusSalesService],
    }).compile();

    service = module.get<StatusSalesService>(StatusSalesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
