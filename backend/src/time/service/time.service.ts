/**
 *    Copyright 2023 Sven Loesekann
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { TimeEntry } from '../model/entity/time-entry';
import { timeEntryRepoKey } from '../model/entity/time-entry.providers';
import { TimeDto } from '../model/dto/time-dto';

@Injectable()
export class TimeService {
  private readonly logger = new Logger(TimeService.name, { timestamp: true });
  
    constructor(@Inject(timeEntryRepoKey) private timeEntryRepository: Repository<TimeEntry>) {}
  
  async getTimes(date: Date, accountIds: string[]): Promise<TimeDto[]> {
    this.logger.debug(`Getting times for date ${date} and accountIds ${accountIds.join(',')}`);
    const result = await this.timeEntryRepository.find({
      where: {
        entryDate: date,
        timeAccount: {
          id: In(accountIds)
        }
      }
    });
    const timeDtos = result.map(entry => ({
      id: entry.id,
      comment: entry.comment,
      duration: entry.duration,
      entryDate: entry.entryDate,
      timeAccountId: entry.timeAccount.id
    }));
    this.logger.debug(timeDtos)
    return timeDtos;
  }

  async saveTime(date: Date, accountId: string, timeDto: TimeDto): Promise<TimeDto> {
    this.logger.debug(`Posting time for date ${date}, accountId ${accountId} and timeDto ${JSON.stringify(timeDto)}`);
    let timeEntry = await this.timeEntryRepository.findOne({ where: { id: timeDto.id, timeAccount: { id: accountId }, entryDate: date } });
    if (!timeEntry) {
      timeEntry = this.timeEntryRepository.create({
        id: timeDto.id,
        comment: timeDto.comment,
        duration: timeDto.duration,
        entryDate: date,
      timeAccount: {
        id: accountId
      }
    });
    } else {
      timeEntry.comment = timeDto.comment;
      timeEntry.duration = timeDto.duration;
      timeEntry.entryDate = date;
    }
    return this.timeEntryRepository.save(timeEntry).then(savedEntry => ({
      id: savedEntry.id,
      comment: savedEntry.comment,
      duration: savedEntry.duration,
      entryDate: savedEntry.entryDate,
      timeAccountId: savedEntry.timeAccount.id
    }));
  }
}
