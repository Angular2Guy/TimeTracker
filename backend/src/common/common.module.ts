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
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { databaseProviders } from './config/database.providers';
import { JwtStrategy } from './security/jwt.strategy';

export const defaultSecret = process.env.JWT_SECRET ?? uuidv4();

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: defaultSecret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [...databaseProviders, JwtStrategy],
  exports: [...databaseProviders, PassportModule, JwtModule],
})
export class CommonModule {}
