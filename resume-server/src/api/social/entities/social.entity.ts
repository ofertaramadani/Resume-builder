import { Cv } from "src/api/cv/entities/cv.entity";
import { AuditEntity } from "src/common/db/customBaseEntites/AuditEntity";
import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";

@Entity('Social')
export class Social extends AuditEntity {
    @Column()
    name:string

    @Index()
    @Column({nullable: true})
    cv_id: number;

    @ManyToOne(() => Cv, cv => cv.socials)
    @JoinColumn({ name: 'cv_id' })
    cv: Cv;
}