import { Injectable } from '@nestjs/common';
import { CreateLocationInput } from './dto/create-location.input';
import { UpdateLocationInput } from './dto/update-location.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}
  async create(createLocationInput: CreateLocationInput) {
    return await this.prisma.location.create({
      data: {
        island: createLocationInput.island,
        description: createLocationInput.description,
      },
    });
  }

  findAll() {
    return this.prisma.location.findMany();
  }

  findOne(id: number) {
    return this.prisma.location.findUnique({ where: { id } });
  }

  update(id: number, updateLocationInput: UpdateLocationInput) {
    return this.prisma.location.update({
      where: { id },
      data: {
        island: updateLocationInput.island,
        description: updateLocationInput.description,
      },
    });
  }

  async remove(id: number) {
    let found_item = await this.prisma.location.findFirst({ where: { id } });
    let del_res = await this.prisma.location.delete({ where: { id } });
    return found_item;
  }
}
