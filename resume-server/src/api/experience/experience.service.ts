import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Experience } from '../experience/entities/experience.entity';
import {CreateExperienceDto, UpdateExperienceDto } from './dtos';
import { Cv } from '../cv/entities/cv.entity';

@Injectable()
export class ExperienceService {
    constructor(
        @InjectRepository(Experience)
        private readonly experienceRepository: Repository<Experience>,
        @InjectRepository(Cv)
        private readonly cvRepository: Repository<Cv>
    ){}

    async create(createExperieceDto: CreateExperienceDto, cvId: number): Promise<Experience> {
        const cv = await this.cvRepository.findOne({where:{id:cvId}});
        if(!cv){
          throw new NotFoundException('Cv not found');
        }
        const experience = this.experienceRepository.create({...createExperieceDto,cv});
        return await this.experienceRepository.save(experience);
      } 

    async findAll(): Promise<Experience[]> {
        return await this.experienceRepository.find();
    }

    async findOne(id: number): Promise<Experience> {
        const experience  = await this.experienceRepository.findOne({where: {id: id}});

        if(!experience) {
            throw new NotFoundException("Experience not found!")
        }

        return experience;
    }

    async update(id: number, updateExperienceDto:UpdateExperienceDto): Promise<Experience> {
        await this.experienceRepository.update(id, updateExperienceDto);
        return await this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.experienceRepository.delete(id)
    }
}
