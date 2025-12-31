import { Module } from '@nestjs/common';
import { TimeController } from './controller/time.controller';
import { TimeService } from './service/time.service';

@Module({controllers: [TimeController], providers: [TimeService]})
export class TimeModule {}
