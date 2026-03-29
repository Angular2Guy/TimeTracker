import type { TimeAccountDto } from "./time-account";

export interface UserAccountDto {
    id?: string;
    day: Date;
    timeWorked: number;
    userId: string;
    timeAccount: TimeAccountDto;
}