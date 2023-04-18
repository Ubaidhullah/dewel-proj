import { Injectable } from '@nestjs/common';
import { CreateTripReqInput } from './dto/create-tripreq.input';
import { UpdateTripReqInput } from './dto/update-tripreq.input';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class TripReqService {
  constructor(private prisma: PrismaService) {}
  async create(CreateTripReqInput: CreateTripReqInput) {
    return await this.prisma.tripreq.create({
      data: {
        requester: CreateTripReqInput.requester,
        departureDate: CreateTripReqInput.departureDate,
        returnDate: CreateTripReqInput.returnDate,
        destinationId: Number(CreateTripReqInput.destination),
      },
    });
  }

  async findAll() {
    let found = await this.prisma.tripreq.findMany({
      include: { destination: true },
    });
    return found.map((item) => ({
      ...item,
      destination: item.destination.island,
    }));
  }

  findOne(id: number) {
    return this.prisma.tripreq.findUnique({ where: { id } });
  }

  update(id: number, updateTripInput: UpdateTripReqInput) {
    return this.prisma.tripreq.update({
      where: { id },
      data: {
        requester: updateTripInput.requester,
        departureDate: updateTripInput.departureDate,
        returnDate: updateTripInput.returnDate,
        destinationId: Number(updateTripInput.destination),
      },
    });
  }

  remove(id: number) {
    return this.prisma.tripreq.delete({ where: { id } });
  }
}
