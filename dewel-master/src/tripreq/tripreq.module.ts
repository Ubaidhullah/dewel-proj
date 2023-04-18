import { Module } from '@nestjs/common';
import { TripReqService } from './tripreq.service';
import { TripReqResolver } from './tripreq.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [TripReqResolver, TripReqService, PrismaService],
})
export class TripReqModule {}
