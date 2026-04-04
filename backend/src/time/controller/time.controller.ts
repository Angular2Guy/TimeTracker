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
import { Controller, Get, Param } from '@nestjs/common';
import { TimeService } from '../service/time.service';
import { UserRole } from 'src/login/model/entity/user';
import { Roles } from '../../common/security/roles-decorator';
import { TimeDto } from '../model/dto/time-dto';

@Roles(UserRole.USER)
@Controller('/rest/time')
export class TimeController {
  constructor(private readonly timeService: TimeService) {}

  @Get('/day/:date/accounts/:accountIds')
  getTimes(@Param('date') date: string, @Param('accountIds') accountIds: string): Promise<TimeDto[]> {    
    return this.timeService.getTimes(new Date(Date.parse(date)), accountIds.split(',').map(id => id.trim()));
  }
}
