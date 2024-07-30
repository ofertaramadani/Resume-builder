import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { Repository } from 'typeorm';
import { CreateSkillDto } from './dtos/skill.dto';
import axios from 'axios';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    const skill = this.skillRepository.create(createSkillDto);
    return await this.skillRepository.save(skill);
  }

  async findAll(): Promise<Skill[]> {
    return await this.skillRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.skillRepository.delete(id);
  }

  async extractSkills(jobDescription: string): Promise<string[]> {
    const apiKey =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzA4ODBjZGYtZjFhZC00MjFmLWFhZjktNDQ5YzY3YzlkYWY4IiwidHlwZSI6ImFwaV90b2tlbiJ9.r_ZwJ3Fy_s6nL06JKFpb4NUoujhcTKzC1xeOmu79i_Y';

    try {
      const response = await axios.post(
        'https://api.edenai.run/v2/text/keyword_extraction',
        {
          text: jobDescription,
          providers: ['openai'],
          language: 'en-US',
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      const skills = response.data;
      return skills;
    } catch (error) {
      console.error('Error extracting skills:', error);
      throw error;
    }
  }
}
