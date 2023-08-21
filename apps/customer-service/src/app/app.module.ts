import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from '@puppilots/shared-services';
import { PuppetController } from './puppet.controller';
import { PuppetService } from './puppet.service';

@Module({
  imports: [],
  controllers: [AppController, PuppetController],
  providers: [AppService, PrismaService, PuppetService],
})
export class AppModule {}
