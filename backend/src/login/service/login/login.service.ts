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
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { LoginRequest, LoginResponse } from 'src/login/model/dto/login';
import { User, UserRole } from 'src/login/model/entity/user';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { userRepoKey } from '../../model/entity/user.providers';
import { TokenPayload } from 'src/common/model/dto/token';

@Injectable()
export class LoginService {
  constructor(@Inject(userRepoKey) private usersRepository: Repository<User>,private jwtService: JwtService) {}
  
private async hashPassword(password: string): Promise<string> {
  return argon2.hash(password, {
    type: argon2.argon2id, // BEST PRACTICE
    memoryCost: 2 ** 16,   // 64 MB
    timeCost: 3,
    parallelism: 1,
  });
}

private async verifyPassword(password: string, hash: string): Promise<boolean> {
  return argon2.verify(hash, password);
}

  public async createUser(signinRequest: LoginRequest): Promise<string> {
    const user = await this.usersRepository.findOneBy({email: signinRequest.email});
    if (user) {
      throw new Error('User already exists');
    }
    const hashedPassword = await this.hashPassword(signinRequest.password);
    const newUser = this.usersRepository.create({
      email: signinRequest.email,
      password: hashedPassword,
      role: UserRole.USER,
      disabled: false,
      uuid: uuidv4(),
      createdBy: signinRequest.email.split('@')[0],
      lastChangedBy: signinRequest.email.split('@')[0],
    } as User);
    await this.usersRepository.save(newUser);
    return '';
  }

  public async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    let user = await this.usersRepository.findOneBy({email: loginRequest.email});
    if (!user || user.disabled) {
      throw new Error('invalid user');
    }
    const isPasswordValid = await this.verifyPassword(loginRequest.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    if(!user.uuid) {
      user.uuid = uuidv4();
      user = await this.usersRepository.save(user);
    }
    const payload = {
      Username: user.email.split('@')[0],
      Uuid: user.uuid,
      Subject: 'TimeTracking',
      Roles: user.role.split(',').map(role => role.trim()),
      Issuer: 'TimeTracker',
      IssuedAt: new Date(Date.now()).toISOString(),
      Expiration: new Date(Date.now() + (60 * 1000)).toISOString(), 
    } as TokenPayload;    
    return { token: this.jwtService.sign(payload), roles: payload.Roles };
  }
}
