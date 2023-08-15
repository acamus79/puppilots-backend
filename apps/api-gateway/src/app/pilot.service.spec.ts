import { Test, TestingModule } from '@nestjs/testing';
import { PilotService } from './pilot.service';

describe('PilotService', () => {
  let service: PilotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PilotService],
    }).compile();

    service = module.get<PilotService>(PilotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
