import { Injectable } from '@nestjs/common';
import { CreateTripInput } from './dto/create-trip.input';
import { UpdateTripInput } from './dto/update-trip.input';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class TripService {
  constructor(private prisma: PrismaService) {}
  async create(createTripInput: CreateTripInput) {
    return await this.prisma.trip.create({
      data: {
        requester: createTripInput.requester,
        departureDate: createTripInput.departureDate,
        returnDate: createTripInput.returnDate,
        estimatedBudget: createTripInput.estimatedBudget,
        estimatedDuration: createTripInput.estimatedDuration,
        destinationId: Number(createTripInput.destination),
        estimatedTravelers: createTripInput.estimatedTravelers,
      },
    });
  }

  async findAll() {
    let found = await this.prisma.trip.findMany({
      include: { destination: true },
    });
    return found.map((item) => ({
      ...item,
      destination: item.destination.island,
    }));
  }

  findOne(id: number) {
    return this.prisma.trip.findUnique({ where: { id } });
  }

  update(id: number, updateTripInput: UpdateTripInput) {
    return this.prisma.trip.update({
      where: { id },
      data: {
        requester: updateTripInput.requester,
        departureDate: updateTripInput.departureDate,
        returnDate: updateTripInput.returnDate,
        estimatedBudget: updateTripInput.estimatedBudget,
        estimatedDuration: updateTripInput.estimatedDuration,
        destinationId: Number(updateTripInput.destination),
        estimatedTravelers: updateTripInput.estimatedTravelers,
      },
    });
  }

  remove(id: number) {
    return this.prisma.trip.delete({ where: { id } });
  }
}
