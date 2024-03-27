import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Templates } from './entities/templates.entity';
import { Repository } from 'typeorm';
import { TemplateDto } from './dtos/templates.dto';

@Injectable()
export class TemplatesService {
    constructor(
        @InjectRepository(Templates)
        private readonly templatesRepository:Repository<Templates>
    ){}

    async findAll(): Promise<Templates[]> {
        return await this.templatesRepository.find();
    }

    // async create(createEducationDto: CreateEducationDto, cvId: number): Promise<Education> {
    //     const cv = await this.cvRepository.findOne({where:{id:cvId}});
    //     if(!cv){
    //       throw new NotFoundException('Cv not found');
    //     }
    //     const education = this.educationRepository.create({...createEducationDto,cv});
    //     return await this.educationRepository.save(education);
    //   } 

    async create(templateDto:TemplateDto): Promise<Templates>{
       const template = this.templatesRepository.create(templateDto);
       return await this.templatesRepository.save(template);
    }

    async findOne(id: number): Promise<Templates> {
        return await this.templatesRepository.findOneBy({id});
      }
}
