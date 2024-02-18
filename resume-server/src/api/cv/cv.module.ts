import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { Cv } from './entities/cv.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Experience } from '../experience/entities/experience.entity';
import { Education } from '../education/entities/education.entity';
import { Social } from '../social/entities/social.entity';
import { Skill } from '../skill/entities/skill.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Cv, User, Experience, Education, Social, Skill])],
  providers: [CvService],
  controllers: [CvController]
})
export class CvModule {}
