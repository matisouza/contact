import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventSubscriberController } from './event.service';

@Module({
  imports: [],
  controllers: [AppController, EventSubscriberController],
  providers: [AppService],
})
export class AppModule {}
