import { BaseEntity } from "../../../common/model/entity/base";
import { Column } from "typeorm";

export class TimeEntry extends BaseEntity {
    @Column({type: 'varchar', length: 100})
    comment: string;

    @Column({type: 'integer'})
    duration: number; // duration in minutes

    @Column({type: 'timestamptz'})
    entryDate: Date;
}