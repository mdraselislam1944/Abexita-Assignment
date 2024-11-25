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
    const searchQuery = keywords.map((keyword) => `${keyword}:*`).join(' | ');
    console.log('Search Query:', searchQuery);

    const result = await this.prisma.$queryRaw<any[]>`
      SELECT *, 
             ts_rank("textSearch", to_tsquery('english', ${searchQuery})) AS rank
      FROM "doctor"
      WHERE "textSearch" @@ to_tsquery('english', ${searchQuery})
      ORDER BY rank DESC
    `;

    // Fallback: If no results, return all rows
    if (result.length === 0) {
      console.log('No matches found. Returning all records as fallback.');
      return this.prisma.doctor.findMany();
    }

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
