import { Test, TestingModule } from '@nestjs/testing';
import { RequesterResolver } from './requester.resolver';
import { RequesterService } from './requester.service';

describe('RequesterResolver', () => {
  let resolver: RequesterResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequesterResolver, RequesterService],
    }).compile();

    resolver = module.get<RequesterResolver>(RequesterResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
