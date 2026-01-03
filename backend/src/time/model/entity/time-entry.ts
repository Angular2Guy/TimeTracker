import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date;

    @Column({ type: 'varchar', length: 50 })
    createdBy: string;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    lastChangedDateTime: Date;

    @Column({ type: 'varchar', length: 50 })
    lastChangedBy: string;
}

export class TimeEntry extends BaseEntity {
    @Column({type: 'varchar', length: 100})
    comment: string;

    @Column({type: 'integer'})
    duration: number; // duration in minutes

    @Column({type: 'timestamptz'})
    entryDate: Date;
}