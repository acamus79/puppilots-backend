import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from '@puppilots/shared-services';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
