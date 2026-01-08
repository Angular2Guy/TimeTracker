import { Module } from '@nestjs/common';
import { TimeModule } from './time/time.module';

@Module({
  imports: [TimeModule],
})
export class AppModule {}
