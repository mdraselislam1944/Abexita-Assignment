/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class AppService {
  getHello(): string {
    const filePath = join(__dirname, '..', 'view', 'index.html'); 
    return readFileSync(filePath, 'utf-8'); 
  }
}
