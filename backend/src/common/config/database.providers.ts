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
import { DataSource } from 'typeorm';

export const databaseProvidersKey = 'DATA_SOURCE';

export const databaseProviders = [
  {
    provide: databaseProvidersKey,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'sven1',
        password: 'sven1',
        database: 'timetracker',
        entities: [
            __dirname + '/../../**/model/entity/*.{ts,js}',
            __dirname + '/../**/model/entity/*.{ts,js}', 
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
