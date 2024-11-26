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

  async findAll(keywords: string[]): Promise<any> {
    const searchQuery = keywords.join(' | ');

    const result = await this.prisma.$queryRaw`
      SELECT * FROM "doctor"
      WHERE
        to_tsvector("type") @@ to_tsquery(${searchQuery})
        OR to_tsvector("orgOrPracticeId") @@ to_tsquery(${searchQuery})
        OR to_tsvector("usernameOrBusinessUrl") @@ to_tsquery(${searchQuery})
        OR to_tsvector("name") @@ to_tsquery(${searchQuery})
        OR to_tsvector("category") @@ to_tsquery(${searchQuery})
        OR EXISTS (
          SELECT 1 FROM unnest("subCategory") AS sub
          WHERE to_tsvector(sub) @@ to_tsquery(${searchQuery})
        )
        OR EXISTS (
          SELECT 1 FROM unnest("zones") AS zone
          WHERE to_tsvector(zone) @@ to_tsquery(${searchQuery})
        )
        OR EXISTS (
          SELECT 1 FROM unnest("branches") AS branch
          WHERE to_tsvector(branch) @@ to_tsquery(${searchQuery})
        )
        OR to_tsvector("areaOfPractice") @@ to_tsquery(${searchQuery})
    `;

    return result;
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
