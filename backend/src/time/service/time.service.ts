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
import { AccountService } from 'src/account/service/account.service';

@Injectable()
export class TimeService {
  private readonly logger = new Logger(AccountService.name, { timestamp: true });
  
    constructor(@Inject(timeEntryRepoKey) private timeEntryRepository: Repository<TimeEntry>) {}
  
  getTimes(date: Date, accountIds: string[]): Promise<TimeDto[]> {
    const result = this.timeEntryRepository.find({
      where: {
        entryDate: date,
        timeAccount: {
          id: In(accountIds)
        }
      }
    }).then(entries => entries.map(entry => ({
      id: entry.id,
      comment: entry.comment,
      duration: entry.duration,
      entryDate: entry.entryDate,
      timeAccountId: entry.timeAccount.id
    })));
    this.logger.log(result)
    return result;
  }
}
