import { Inject, Injectable } from '@nestjs/common';
import { timeAccountRepoKey } from '../model/entity/time-account.providers';
import { TimeAccount } from '../model/entity/time-account';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
    constructor(@Inject(timeAccountRepoKey) private timeAccountRepository: Repository<TimeAccount>) {}

    
}
