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
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles-decorator';
import { AccountService } from 'src/account/service/account.service';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(AccountService.name, { timestamp: true });

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [
        context.getHandler(),
        context.getClass(),
      ],
    );

    if (!requiredRoles) {
      return true; // no role restriction
    }

    const request = context.switchToHttp().getRequest();
    const authorization = request.headers?.authorization as string | undefined;    
    let roles: string[] = [];

    if (authorization?.startsWith('Bearer ')) {
      const token = authorization.substring(7);
      const payloadSegment = token.split('.')[1];
      if (payloadSegment) {
        try {
          const decoded = Buffer.from(payloadSegment, 'base64').toString('utf8');
          const payload = JSON.parse(decoded) as { Roles?: string[] };
          roles = payload.Roles ?? [];
        } catch {
          roles = [];
        }
      }
    }

    return requiredRoles.some(role => roles.includes(role));
  }
}