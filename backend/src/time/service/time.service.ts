import { Injectable } from '@nestjs/common';

@Injectable()
export class TimeService {
  getHello(): string {
    return 'Hello World!';
  }
}
