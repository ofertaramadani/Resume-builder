import { Cv } from "src/api/cv/entities/cv.entity";
import { AuditEntity } from "src/common/db/customBaseEntites/AuditEntity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('experience')
export class Experience extends AuditEntity {
    @Column()
    title:string;

    @Column()
    employer:string;

    @Column()
    place:string;

    @Column()
    start:string;

    @Column()
    end:string;

    @Column()
    description:string;

    @ManyToOne(() => Cv, cv => cv.experiences)
    @JoinColumn({ name: 'cv_id' })
    cv: Cv;
}