import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleDestroy, OnModuleInit
{
  async onModuleDestroy() {
    console.log('database is disconnected:*************');
    await this.$disconnect();
  }
  async onModuleInit() {
    console.log('database is connected:*****************');
    await this.$connect();
  }
}
