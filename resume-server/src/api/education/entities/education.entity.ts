import { Cv } from "src/api/cv/entities/cv.entity";
import { AuditEntity } from "src/common/db/customBaseEntites/AuditEntity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";


@Entity('education')
export class Education extends AuditEntity{
    @Column()
    title: string;

    @Column()
    school: string;

    @Column()
    place: string;

    @Column()
    start: string;

    @Column()
    end: string;

    @Column()
    description: string;

    @ManyToOne(() => Cv, cv => cv.educations)
    @JoinColumn({ name: 'cv_id' })
    cv: Cv;
}