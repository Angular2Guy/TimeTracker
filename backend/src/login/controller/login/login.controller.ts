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
import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from '../../service/login/login.service';
import type { LoginRequest, LoginResponse } from '../../model/dto/login';
import { Observable, of } from 'rxjs';

@Controller('/rest')
export class LoginController {
    constructor(private loginService: LoginService) { }

    @Post('/signin')
    public async signIn(@Body() singinRequest: LoginRequest): Promise<LoginResponse> {
      let token = await this.loginService.createUser(singinRequest);
      return Promise.resolve({token: token} as LoginResponse);
    }

    @Post('/login')
    public async login(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
      let token = await this.loginService.login(loginRequest);
      return Promise.resolve({token: token} as LoginResponse);
    }
}
