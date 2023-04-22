import { Module } from '@nestjs/common';
import { RequesterService } from './requester.service';
import { RequesterResolver } from './requester.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [RequesterResolver, RequesterService, PrismaService]
})
export class RequesterModule {}
