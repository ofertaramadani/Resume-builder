import { Cv } from "src/api/cv/entities/cv.entity";
import { AuditEntity } from "src/common/db/customBaseEntites/AuditEntity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";


@Entity('Skill')
export class Skill extends AuditEntity {
    @Column()
    name:string;

    @ManyToOne(() => Cv, cv => cv.skills)
    @JoinColumn({ name: 'cv_id' })
    cv: Cv;
}