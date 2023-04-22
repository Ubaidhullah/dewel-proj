import { Injectable } from '@nestjs/common';
import { CreateRequesterInput } from './dto/create-requester.input';
import { UpdateRequesterInput } from './dto/update-requester.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RequesterService {
  constructor (private prisma: PrismaService) {}
  async create(createRequesterInput: CreateRequesterInput) {
    return await this.prisma.requester.create({
      data: {
        name: createRequesterInput.name,
        email: createRequesterInput.email,
        },
        });
  }

  findAll() {
    return this.prisma.requester.findMany();
  }

  findOne(id: number) {
    return this.prisma.requester.findUnique({ where: { id } });
  }

  update(id: number, updateRequesterInput: UpdateRequesterInput) {
    return this.prisma.requester.update({
      where: { id },
      data: {
        name: updateRequesterInput.name,
        email: updateRequesterInput.email,
      },
    });
  }


  async remove(id: number) {
    let found_item = await this.prisma.requester.findFirst({ where: { id } });
    let del_res = await this.prisma.requester.delete({ where: { id } });
    return found_item;
  }
}
