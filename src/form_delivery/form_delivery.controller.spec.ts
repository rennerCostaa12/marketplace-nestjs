import { Test, TestingModule } from '@nestjs/testing';
import { FormDeliveryController } from './form_delivery.controller';
import { FormDeliveryService } from './form_delivery.service';

describe('FormDeliveryController', () => {
  let controller: FormDeliveryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormDeliveryController],
      providers: [FormDeliveryService],
    }).compile();

    controller = module.get<FormDeliveryController>(FormDeliveryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
