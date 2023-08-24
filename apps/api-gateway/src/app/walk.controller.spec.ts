import { Test, TestingModule } from '@nestjs/testing';
import { WalkController } from './walk.controller';

describe('WalkController', () => {
  let controller: WalkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalkController],
    }).compile();

    controller = module.get<WalkController>(WalkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
