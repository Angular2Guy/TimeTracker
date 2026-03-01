import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccountService } from '../service/account.service';
import type { AccountDto } from '../model/dto/account-dto';

@Controller('/rest/account')
export class AccountController {
    constructor(private accountService: AccountService) { }

    @Get('/manager/:userId')
    public async getAccountsForManager(@Param('userId') userId: string): Promise<AccountDto[]> {        
        const value = await this.accountService.getAccountsForManager(userId);                    
        return value;            
    }

    @Post('/:userId')
    public async saveAccount(@Param('userId') userId: string, @Body() accountDto: AccountDto): Promise<AccountDto> {        
        const value = await this.accountService.saveAccount(userId, accountDto);                    
        return value;
    }
}
