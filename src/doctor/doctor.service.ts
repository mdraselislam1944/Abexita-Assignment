import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(private prisma: PrismaService) {}
  create(createDoctorDto: CreateDoctorDto) {
    const result = this.prisma.doctor.create({ data: createDoctorDto });
    return result;
  }

  findAll() {
    return this.prisma.doctor.findMany();
  }

  findOne(id: number) {
    return this.prisma.doctor.findUnique({
      where: { id: id },
    });
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return this.prisma.doctor.upsert({
      where: { id: id },
      update: updateDoctorDto as Prisma.doctorUpdateInput,
      create: updateDoctorDto as Prisma.doctorCreateInput,
    });
  }

  remove(id: number) {
    return this.prisma.doctor.delete({ where: { id: id } });
  }
}
