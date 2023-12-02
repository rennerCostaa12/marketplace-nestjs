import { Test, TestingModule } from '@nestjs/testing';
import { FormDeliveryService } from './form_delivery.service';

describe('FormDeliveryService', () => {
  let service: FormDeliveryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormDeliveryService],
    }).compile();

    service = module.get<FormDeliveryService>(FormDeliveryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
