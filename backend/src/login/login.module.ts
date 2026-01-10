import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { LoginController } from './controller/login/login.controller';
import { LoginService } from './service/login/login.service';

@Module({imports: [CommonModule],controllers: [LoginController], providers: [LoginService]})
export class LoginModule {}
