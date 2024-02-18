import { AuditEntity } from "src/common/db/customBaseEntites/AuditEntity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";


@Entity('templates')
export class Templates extends AuditEntity{
    @Column()
    title: string;

    @Column()
    path: string;
}