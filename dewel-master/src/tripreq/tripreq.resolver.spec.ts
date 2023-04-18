import { Test, TestingModule } from '@nestjs/testing';
import { TripReqResolver } from './tripreq.resolver';
import { TripReqService } from './tripreq.service';

describe('TripResolver', () => {
  let resolver: TripReqResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripReqResolver, TripReqService],
    }).compile();

    resolver = module.get<TripReqResolver>(TripReqResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
