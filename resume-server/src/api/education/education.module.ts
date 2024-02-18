import { Module } from '@nestjs/common';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from './entities/education.entity';
import { Cv } from '../cv/entities/cv.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Education,Cv])],
  controllers: [EducationController],
  providers: [EducationService]
})
export class EducationModule {} 
