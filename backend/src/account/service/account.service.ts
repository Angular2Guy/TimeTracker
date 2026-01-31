import { Inject, Injectable } from '@nestjs/common';
import { timeAccountRepoKey } from '../model/entity/time-account.providers';
import { TimeAccount } from '../model/entity/time-account';
import { Repository } from 'typeorm';
import { AccountDto } from '../model/dto/account-dto';

@Injectable()
export class AccountService {
    constructor(@Inject(timeAccountRepoKey) private timeAccountRepository: Repository<TimeAccount>) {}

    public async getAccountsForManager(managerId: string): Promise<AccountDto[]> {
        const accountEntities = await this.timeAccountRepository.find({where: {managerId: managerId}, relations: ['users']});
        return accountEntities.map(accountEntity => ({
            id: accountEntity.id,
            name: accountEntity.name,
            description: accountEntity.description,
            duration: accountEntity.duration,
            startDate: accountEntity.startDate,
            endDate: accountEntity.endDate,
            managerId: accountEntity.managerId,
            userIds: accountEntity.users.map(user => user.id)
        }));
    }
}
