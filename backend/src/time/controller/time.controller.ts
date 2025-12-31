import { Controller, Get } from '@nestjs/common';
import { TimeService } from '../service/time.service';

@Controller('/rest/time')
export class TimeController {
  constructor(private readonly timeService: TimeService) {}

  @Get('/day')
  getHello(): string {
    return this.timeService.getHello();
  }
}
