import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Education } from './entities/education.entity';
import { CreateEducationDto, UpdateEducationDto } from './dtos';
import { Cv } from '../cv/entities/cv.entity';


@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
  ) {}

  async create(createEducationDto: CreateEducationDto, cvId: number): Promise<Education> {
    const cv = await this.cvRepository.findOne({where:{id:cvId}});
    if(!cv){
      throw new NotFoundException('Cv not found');
    }
    const education = this.educationRepository.create({...createEducationDto,cv});
    return await this.educationRepository.save(education);
  } 

  async findAll(cvId:number): Promise<Education[]> {
    return await this.educationRepository.find({ where: { cv: { id: cvId } } });
  }

  async findOne(id: number): Promise<Education> {
    return await this.educationRepository.findOneBy({id});
  }

  async update(id: number, updateEducationDto: UpdateEducationDto): Promise<Education> {
    await this.educationRepository.update(id, updateEducationDto);
    return await this.educationRepository.findOneBy({id});
  }

  async remove(id: number,cvId:number): Promise<void> {
    const educationToRemove = await this.educationRepository.findOne({ where: { id, cv: { id: cvId } } });

    if (educationToRemove) {
      await this.educationRepository.remove(educationToRemove);
    } else {
      throw new NotFoundException(`Education not found`);
    }
  }
}
