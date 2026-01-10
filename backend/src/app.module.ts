import { Module } from '@nestjs/common';
import { TimeModule } from './time/time.module';
import { LoginController } from './login/controller/login/login.controller';
import { LoginService } from './login/service/login/login.service';
import { LoginModule } from './login/login.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [TimeModule, LoginModule, CommonModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class AppModule {}
