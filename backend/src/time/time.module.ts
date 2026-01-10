import { Module } from '@nestjs/common';
import { TimeController } from './controller/time.controller';
import { TimeService } from './service/time.service';
import { CommonModule} from 'src/common/common.module';
import { timeEntryProviders } from './model/entity/time-entry.providers';

@Module({imports: [CommonModule], controllers: [TimeController], providers: [TimeService, ...timeEntryProviders]})
export class TimeModule {}
