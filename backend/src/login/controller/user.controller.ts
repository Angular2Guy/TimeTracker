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
import { Controller, Get } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserDto } from '../model/dto/user-dto';

//@Public()
@Controller('/rest/user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('/all')
    public async getAllUsers(): Promise<UserDto[]> {
        return (await this.userService.getAllUsers()).map(user => ({
            id: user.id,
            username: user.username,
            roles: user.role.split(',').map(role => role.trim()),
            email: user.email,
            uuid: user.uuid
        } as UserDto));
    }
}
