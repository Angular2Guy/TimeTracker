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
import { TimeAccount } from "src/account/model/entity/time-account";
import { TTBaseEntity } from "../../../common/model/entity/base";
import {Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";

export enum UserRole {
    USER = 'user',
    PM = 'pm',
    ADMIN = 'admin',
  }

@Entity()
export class User extends TTBaseEntity {  
    @Column({type: 'varchar', length: 100})
    email: string;

    @Column({type: 'varchar', length: 100})
    username: string;

    @Column({type: 'varchar', length: 100})
    password: string; 

    @Column({type: 'varchar', length: 50})
    role: UserRole;

    @Column({type: 'varchar', length: 50})
    uuid: string;
    
    @Column({type: 'boolean'})
    disabled: boolean;

     @ManyToMany(() => TimeAccount, (timeAccount) => timeAccount.users)
    @JoinTable()
    timeAccounts: TimeAccount[];
}