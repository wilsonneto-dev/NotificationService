import { Body, Controller, Get, Post } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { brotliDecompressSync } from 'zlib';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  list() {
    const out = this.prismaService.notification.findMany();
    return out;
  }

  @Post()
  create(@Body() { name, active }: { name: string; active: boolean }) {
    console.log(name, active);
    return this.prismaService.user.create({
      data: {
        name,
        id: randomUUID(),
        active,
      },
    });
  }
}
