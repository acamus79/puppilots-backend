import { Test, TestingModule } from '@nestjs/testing';
import { PuppetController } from './puppet.controller';

describe('PuppetController', () => {
  let controller: PuppetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PuppetController],
    }).compile();

    controller = module.get<PuppetController>(PuppetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
