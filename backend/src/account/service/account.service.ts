import { Inject, Injectable, Logger } from '@nestjs/common';
import { timeAccountRepoKey } from '../model/entity/time-account.providers';
import { TimeAccount } from '../model/entity/time-account';
import { In, Repository } from 'typeorm';
import { AccountDto } from '../model/dto/account-dto';
import { userRepoKey } from 'src/login/model/entity/user.providers';
import { User } from 'src/login/model/entity/user';

@Injectable()
export class AccountService {
    private readonly logger = new Logger(AccountService.name, { timestamp: true });

    constructor(@Inject(timeAccountRepoKey) private timeAccountRepository: Repository<TimeAccount>,
        @Inject(userRepoKey) private userRepository: Repository<User>) {}

    public async getAccountsForManager(managerId: string): Promise<AccountDto[]> {
        const accountEntities = await this.timeAccountRepository.find({where: {managerId: managerId}, relations: {users: true}});
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

    public async saveAccount(userUuid: string, accountDto: AccountDto): Promise<AccountDto> {
        let accountEntity = await this.timeAccountRepository.findOne({where: {id: accountDto.id}, relations: {users: true}});
        if(accountEntity && accountEntity.managerId !== userUuid) {
            return {} as AccountDto;
        }
        const managerUser = await this.userRepository.findOneBy({uuid: userUuid});        
        if(!accountEntity) {
            accountEntity = this.timeAccountRepository.create({
                name: accountDto.name,
                description: accountDto.description,
                duration: accountDto.duration,
                startDate: accountDto.startDate,
                endDate: accountDto.endDate,    
                managerId: userUuid,
                createdBy: managerUser?.email,
                createDateTime: new Date(),
                lastChangedDateTime: new Date(),
                lastChangedBy: managerUser?.email
            });            
        }                
        const myUsers = await this.userRepository.find({where: {id: In(accountDto.userIds)}})
        accountEntity.users = myUsers;          
        accountEntity.lastChangedBy = managerUser?.email ?? accountEntity.lastChangedBy;  
        accountEntity.lastChangedDateTime = new Date();
        accountEntity = await this.timeAccountRepository.save(accountEntity);
        return accountDto;
    }
}
