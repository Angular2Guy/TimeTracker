import { Module } from '@nestjs/common';
import { TimeModule } from './time/time.module';
import { DatabaseModule } from './common/database.module';

@Module({
  imports: [TimeModule, DatabaseModule],
})
export class AppModule {}
