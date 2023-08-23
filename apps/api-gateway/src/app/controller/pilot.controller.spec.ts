import { Test, TestingModule } from '@nestjs/testing';
import { PilotController } from './pilot.controller';

describe('PilotController', () => {
  let controller: PilotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PilotController],
    }).compile();

    controller = module.get<PilotController>(PilotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
