import { Test, TestingModule } from '@nestjs/testing';
import { PuppetService } from './puppet.service';

describe('PuppetService', () => {
  let service: PuppetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PuppetService],
    }).compile();

    service = module.get<PuppetService>(PuppetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
