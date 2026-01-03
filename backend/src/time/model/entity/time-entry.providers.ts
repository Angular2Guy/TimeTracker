
import { DataSource } from 'typeorm';
import { TimeEntry } from './time-entry';
import { databaseProvidersKey } from '../../../common/config/database.providers';

export const timeEntryRepoKey = 'TIME_ENTRY_REPOSITORY';

export const timeEntryProviders = [
  {
    provide: timeEntryRepoKey,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TimeEntry),
    inject: [databaseProvidersKey],
    },
];
