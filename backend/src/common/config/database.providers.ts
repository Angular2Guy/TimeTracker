
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
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
