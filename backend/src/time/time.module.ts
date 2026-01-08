import { Module } from '@nestjs/common';
import { TimeController } from './controller/time.controller';
import { TimeService } from './service/time.service';
import { DatabaseModule } from 'src/common/database.module';
import { timeEntryProviders } from './model/entity/time-entry.providers';

@Module({imports: [DatabaseModule], controllers: [TimeController], providers: [TimeService, ...timeEntryProviders]})
export class TimeModule {}
