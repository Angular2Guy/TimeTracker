import { Controller, Get, Param } from '@nestjs/common';
import { AccountService } from '../service/account.service';
import { AccountDto } from '../model/dto/account';

@Controller('/rest/account')
export class AccountController {
    constructor(private accountService: AccountService) { }

    @Get('/manager/:userId')
    public async getAccountsForManager(@Param('userId') userId: string): Promise<AccountDto[]> {
        return this.accountService.getAccountsForManager(userId);            
    }
}
