export interface DayTimeDto {
    id: string;
    comment: string;
    duration: number;
    entryDate: Date;
    timeAccountId: string;
    dayTimeDtos: {
        name: string;
        description: string;
        duration: number;
        startDate: Date;
        endDate: Date;
    };
}
