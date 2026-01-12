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
import { databaseProvidersKey } from '../../../common/config/database.providers';
import { DataSource } from "typeorm";
import { User } from './user';

export const userRepoKey = 'USER_REPOSITORY';

export const userProviders = [
  {
    provide: userRepoKey,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [databaseProvidersKey],
    },
];