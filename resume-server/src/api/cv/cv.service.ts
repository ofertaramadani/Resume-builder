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
  templateRepository: any;
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
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User not found.`);
    }
    const cvs = await this.cvRepository.find({
      where: { user: { id: userId } },
      relations: {
        experiences: true,
        educations: true,
        socials: true,
        skills: true,
      },
    });

    if (!cvs) {
      throw new NotFoundException(`User does not have a cv`);
    }
    return cvs;
  }

  async getUserCv(userId: number, cvId: number): Promise<Cv> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User not found.`);
    }

    const cv = await this.cvRepository.findOne({
      where: { id: cvId, user: { id: userId } },
      relations: {
        experiences: true,
        educations: true,
        socials: true,
        skills: true,
      },
    });

    if (!cv) {
      throw new NotFoundException(`CV not found.`);
    }
    return cv;
  }

  async createUserCv(userId: number, cvDto: CreateCvDto): Promise<Cv> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['cvs'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
    const newCv = this.cvRepository.create(cvDto);
    const createdCv = await this.cvRepository.save(newCv);

    if (cvDto.educations) {
      const educationEntities = cvDto.educations.map((eduDto) => {
        return this.educationRepository.create({
          ...eduDto,
          cv: createdCv,
        });
      });

      await this.educationRepository.save(educationEntities);
    }

    if (cvDto.experiences) {
      const experienceEntities = cvDto.experiences.map((expDto) => {
        return this.experienceRepository.create({
          ...expDto,
          cv: createdCv,
        });
      });

      await this.experienceRepository.save(experienceEntities);
    }

    if (cvDto.skills) {
      const skillEntities = cvDto.skills.map((skillDto) => {
        return this.skillRepository.create({
          ...skillDto,
          cv: createdCv,
        });
      });

      await this.skillRepository.save(skillEntities);
    }

    if (cvDto.socials) {
      const socialEntities = cvDto.socials.map((socialDto) => {
        return this.socialRepository.create({
          ...socialDto,
          cv: createdCv,
        });
      });
      await this.socialRepository.save(socialEntities);
    }

    if (cvDto.templates) {
      const template = await this.templateRepository.findOne({
        where: { id: cvDto.templateUuid },
      });
      if (!template) {
        throw new NotFoundException(
          `Template with UUID ${cvDto.templateUuid} not found.`,
        );
      }
      createdCv.template = template;
      await this.cvRepository.save(createdCv);
    }

    user.cvs.push(createdCv);
    await this.userRepository.save(user);

    return createdCv;
  }

  async updateUserCv(
    userId: number,
    cvId: number,
    updateCvDto: UpdateCvDto,
  ): Promise<Cv> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['cvs'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    const existingCv = await this.cvRepository.findOne({
      where: { id: cvId, user: { id: userId } },
    });

    if (!existingCv) {
      throw new NotFoundException(`CV not found.`);
    }

    if (updateCvDto.title) existingCv.title = updateCvDto.title;
    if (updateCvDto.photo) existingCv.photo = updateCvDto.photo;
    if (updateCvDto.firstname) existingCv.firstname = updateCvDto.firstname;
    if (updateCvDto.lastname) existingCv.lastname = updateCvDto.lastname;
    if (updateCvDto.email) existingCv.email = updateCvDto.email;
    if (updateCvDto.phone) existingCv.phone = updateCvDto.phone;
    if (updateCvDto.country) existingCv.country = updateCvDto.country;
    if (updateCvDto.city) existingCv.city = updateCvDto.city;
    if (updateCvDto.professionalSummary)
      existingCv.professionalSummary = updateCvDto.professionalSummary;
    // Update educations
    if (updateCvDto.educations) {
      try {
        const educations = updateCvDto.educations;
        let previousEdu = await this.educationRepository.find({
          where: { cv: { id: cvId } },
        });
        for (const existingEducation of previousEdu) {
          if (!educations.some((edu) => edu.id === existingEducation.id)) {
            await this.educationRepository.remove(existingEducation);
          }
        }
        for (const education of educations) {
          if (education.id) {
            await this.educationRepository.update(education.id, education);
          } else {
            const newEducation = this.educationRepository.create({
              ...education,
              cv_id: cvId,
            });
            await this.educationRepository.save(newEducation);
          }
        }
      } catch (error) {
        throw error;
      }
    }

    if (updateCvDto.experiences) {
      try {
        const experiences = updateCvDto.experiences;
        let previousEx = await this.experienceRepository.find({
          where: { cv: { id: cvId } },
        });
        for (const existingEx of previousEx) {
          if (!experiences.some((edu) => edu.id === existingEx.id)) {
            await this.experienceRepository.remove(existingEx);
          }
        }
        for (const experience of experiences) {
          if (experience.id) {
            await this.experienceRepository.update(experience.id, experience);
          } else {
            const newExperience = this.experienceRepository.create({
              ...experience,
              cv_id: cvId,
            });
            await this.experienceRepository.save(newExperience);
          }
        }
      } catch (error) {
        throw error;
      }
    }

    if (updateCvDto.socials) {
      try {
        const socials = updateCvDto.socials;
        for (const social of socials) {
          if (social.id) {
            await this.socialRepository.update(social.id, social);
          } else {
            const newSocial = this.socialRepository.create({
              ...social,
              cv_id: cvId,
            });
            await this.socialRepository.save(newSocial);
          }
        }
      } catch (error) {
        throw error;
      }
    }

    if (updateCvDto.skills) {
      try {
        const skills = updateCvDto.skills;
        for (const skill of skills) {
          if (skill.id) {
            await this.skillRepository.update(skill.id, skill);
          } else {
            const newSkill = this.skillRepository.create({
              ...skill,
              cv_id: cvId,
            });
            await this.skillRepository.save(newSkill);
          }
        }
      } catch (error) {
        throw error;
      }
    }

    // Save the updated CV
    await this.cvRepository.save(existingCv);

    // Fetch the updated CV with relations
    const updatedCv = await this.cvRepository.findOne({
      where: { id: cvId, user: { id: userId } },
      relations: {
        experiences: true,
        educations: true,
        socials: true,
        skills: true,
      },
    });

    return updatedCv;
  }
}
