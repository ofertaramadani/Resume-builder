import { Entity, OneToMany, JoinColumn, Column, ManyToOne } from 'typeorm';
import { AuditEntity } from 'src/common/db/customBaseEntites/AuditEntity';
import { Experience } from 'src/api/experience/entities/experience.entity';
import { Education } from 'src/api/education/entities/education.entity';
import { Skill } from 'src/api/skill/entities/skill.entity';
import { Social } from 'src/api/social/entities/social.entity';
import { User } from 'src/api/user/entities/user.entity';

@Entity('cv')
export class Cv extends AuditEntity {
  @Column()
  title:string

  @Column({ nullable: true })
  photo:string

  @Column()
  firstname:string

  @Column()
  lastname:string

  @Column()
  email:string

  @Column()
  phone:string

  @Column()
  country:string

  @Column()
  city:string

  @Column()
  professionalSummary:string

  @OneToMany(() => Experience, experience => experience.cv)
  experiences: Experience[];

  @OneToMany(() => Education, education => education.cv)
  educations: Education[];

  @OneToMany(() => Skill, skill => skill.cv)
  skills: Skill[];

  @OneToMany(() => Social, social => social.cv)
  socials: Social[];

  @ManyToOne(() => User, user => user.cvs)
  @JoinColumn({ name: 'user_id' }) 
  user: User;

}