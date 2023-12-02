import { Test, TestingModule } from '@nestjs/testing';
import { FormsPaymentsService } from './forms_payments.service';

describe('FormsPaymentsService', () => {
  let service: FormsPaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormsPaymentsService],
    }).compile();

    service = module.get<FormsPaymentsService>(FormsPaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
