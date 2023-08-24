import { Test, TestingModule } from '@nestjs/testing';
import { WalkService } from './walk.service';

describe('WalkService', () => {
  let service: WalkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalkService],
    }).compile();

    service = module.get<WalkService>(WalkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
