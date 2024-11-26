import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import nlp from 'compromise';
import { PorterStemmer } from 'natural';
import { removeStopwords } from 'stopword';
import fuzzball from 'fuzzball';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @Get()
  async findAll(@Query('keywords') keywords: string) {
    const newString = removeStopwords(keywords.split(' ')).join(' ');
    const cleanString = newString.replace(/[^\w\s]/gi, '');
    const doc = nlp(cleanString);
    const nouns = doc.nouns().out('array');
    const adjectives = doc.adjectives().out('array');
    const words = [...new Set([...nouns, ...adjectives])];
    const splitWords = words.flatMap((word) => word.split(' '));
    const stemmedWords = splitWords.map((word) =>
      PorterStemmer.stem(word.toLowerCase()),
    );
    return this.doctorService.findAll(stemmedWords);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(+id, updateDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(+id);
  }
}
