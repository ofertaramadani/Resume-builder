import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Cv } from './entities/cv.entity';
import { CreateCvDto } from './dtos/create-cv.dto';
import { Education } from '../education/entities/education.entity';
import { Experience } from '../experience/entities/experience.entity';
import { Skill } from '../skill/entities/skill.entity';
import { Social } from '../social/entities/social.entity';
import { UpdateCvDto } from './dtos/update-cv.dto';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
    @InjectRepository(Social)
    private readonly socialRepository: Repository<Social>,
  ) {}

  async getUserCvs(userId: number): Promise<Cv[]> {
    const user = await this.userRepository.findOne({ where: { id: userId }});

    if (!user) {
      throw new NotFoundException(`User not found.`);
    }
    const cvs = await this.cvRepository.find({where: {user:{id:userId}}, relations:{experiences:true, educations:true, socials:true, skills:true}})
    
    if(!cvs) {
      throw new NotFoundException(`User does not have a cv`)
    }
    return cvs;
  }

  async getUserCv(userId: number, cvId: number): Promise<Cv> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User not found.`);
    }

    const cv = await this.cvRepository.findOne({where:{id: cvId,user: {id: userId}}, relations:{experiences:true, educations:true, socials:true, skills:true}})

    if (!cv) {
      throw new NotFoundException(`CV not found.`);
    }
    return cv;
  }

  async createUserCv(userId: number, cvDto:CreateCvDto): Promise<Cv> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['cvs'] });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
    const newCv = this.cvRepository.create(cvDto);
    const createdCv = await this.cvRepository.save(newCv);

    if (cvDto.educations) {
        const educationEntities = cvDto.educations.map(eduDto => {
          return this.educationRepository.create({
            ...eduDto,
            cv: createdCv,
          });
        });
  
        await this.educationRepository.save(educationEntities);
      }
  
      if (cvDto.experiences) {
        const experienceEntities = cvDto.experiences.map(expDto => {
          return this.experienceRepository.create({
            ...expDto,
            cv: createdCv,
          });
        });
  
        await this.experienceRepository.save(experienceEntities);
      }
  
      if (cvDto.skills) {
        const skillEntities = cvDto.skills.map(skillDto => {
          return this.skillRepository.create({
            ...skillDto,
            cv: createdCv,
          });
        });
  
        await this.skillRepository.save(skillEntities);
      }
  
      if (cvDto.socials) {
        const socialEntities = cvDto.socials.map(socialDto => {
          return this.socialRepository.create({
            ...socialDto,
            cv: createdCv,
          });
        });
  
        await this.socialRepository.save(socialEntities);
      }
    user.cvs.push(createdCv);
    await this.userRepository.save(user);

    return createdCv;
  }
  
  async updateUserCv(userId: number, cvId: number, updateCvDto: UpdateCvDto): Promise<Cv> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['cvs'] });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
    const existingCv = await this.cvRepository.findOne({ where: { id: cvId, user: { id: userId } } });
    if (!existingCv) {
      throw new NotFoundException(`CV not found.`);
    }

    await this.cvRepository.update({ id: cvId }, updateCvDto);
    const updatedCv = await this.cvRepository.findOne({where:{id: cvId,user: {id: userId}}, relations:{experiences:true, educations:true, socials:true, skills:true}});
    return updatedCv;
  }
}