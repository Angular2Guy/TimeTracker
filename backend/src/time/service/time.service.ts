import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TimeEntry } from '../model/entity/time-entry';
import { timeEntryRepoKey } from '../model/entity/time-entry.providers';

@Injectable()
export class TimeService {
    constructor(@Inject(timeEntryRepoKey) private timeEntryRepository: Repository<TimeEntry>) {}
  
  getHello(): string {
    return 'Hello World!';
  }
}
