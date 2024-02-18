import { Module } from '@nestjs/common';
import { ExperienceController } from './experience.controller';
import { ExperienceService } from './experience.service';
import { Experience } from './entities/experience.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from '../cv/entities/cv.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Experience,Cv])],
  controllers: [ExperienceController],
  providers: [ExperienceService]
})
export class ExperienceModule {}
