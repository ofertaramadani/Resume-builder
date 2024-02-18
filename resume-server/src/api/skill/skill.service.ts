import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { Repository } from 'typeorm';
import { CreateSkillDto } from './dtos/skill.dto';

@Injectable()
export class SkillService {
    constructor(
        @InjectRepository(Skill)
        private readonly skillRepository: Repository<Skill>,
    ){}

    async create(createSkillDto:CreateSkillDto):Promise<Skill>{
        const skill = this.skillRepository.create(createSkillDto)
        return await this.skillRepository.save(skill);
    }

    async findAll():Promise<Skill[]>{
        return await this.skillRepository.find();
    }

    async remove(id:number):Promise<void>{
        await this.skillRepository.delete(id);
    }
}
