import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

@Injectable()
export class CvService {
  private readonly uploadPath = join(process.cwd(), 'public', 'uploads');

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
  ) {
    if (!existsSync(this.uploadPath)) {
      mkdirSync(this.uploadPath, { recursive: true });
    }
  }

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

    const entitiesToSave: Array<any> = [];

    const mapAndPushEntities = <T>(
      entitiesDto: T[] | undefined,
      repository: {
        create: (dto: T) => any;
      },
    ) => {
      if (entitiesDto) {
        const entities = entitiesDto.map((dto) =>
          repository.create({ ...dto, cv: createdCv }),
        );
        entitiesToSave.push(...entities);
      }
    };

    mapAndPushEntities(cvDto.educations, this.educationRepository);
    mapAndPushEntities(cvDto.experiences, this.experienceRepository);
    mapAndPushEntities(cvDto.skills, this.skillRepository);
    mapAndPushEntities(cvDto.socials, this.socialRepository);

    if (entitiesToSave.length > 0) {
      // Save all entities at once
      await Promise.all([
        this.educationRepository.save(
          entitiesToSave.filter((e) => e instanceof Education),
        ),
        this.experienceRepository.save(
          entitiesToSave.filter((e) => e instanceof Experience),
        ),
        this.skillRepository.save(
          entitiesToSave.filter((e) => e instanceof Skill),
        ),
        this.socialRepository.save(
          entitiesToSave.filter((e) => e instanceof Social),
        ),
      ]);
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

    // Update socials
    if (updateCvDto.socials) {
      const socials = updateCvDto.socials;
      let previousSocials = await this.socialRepository.find({
        where: { cv: { id: cvId } },
      });

      // Remove socials not in the updated list
      for (const existingSocial of previousSocials) {
        if (!socials.some((social) => social.id === existingSocial.id)) {
          await this.socialRepository.remove(existingSocial);
        }
      }

      // Update or add new socials
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
    }

    // Update skills
    if (updateCvDto.skills) {
      const skills = updateCvDto.skills;
      let previousSkills = await this.skillRepository.find({
        where: { cv: { id: cvId } },
      });

      // Remove skills not in the updated list
      for (const existingSkill of previousSkills) {
        if (!skills.some((skill) => skill.id === existingSkill.id)) {
          await this.skillRepository.remove(existingSkill);
        }
      }

      // Update or add new skills
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
  async deleteUserCv(userId: number, cvId: number): Promise<void> {
    const cv = await this.cvRepository.findOne({
      where: { id: cvId, user: { id: userId } },
      relations: ['experiences', 'educations', 'socials', 'skills'],
    });

    if (!cv) {
      throw new NotFoundException('CV not found.');
    }

    await this.educationRepository.delete({ cv: { id: cvId } });
    await this.experienceRepository.delete({ cv: { id: cvId } });
    await this.skillRepository.delete({ cv: { id: cvId } });
    await this.socialRepository.delete({ cv: { id: cvId } });

    await this.cvRepository.delete(cvId);
  }

  async uploadCvImage(cvId: number, file: Express.Multer.File) {
    const fileName = `${cvId}-${Date.now()}-${file.originalname}`;
    const filePath = path.join(this.uploadPath, fileName);

    try {
      writeFileSync(filePath, file.buffer);
      await this.cvRepository.update(cvId, { photo: fileName });
      return { photoUrl: `/${fileName}` };
    } catch (error) {
      console.error('Error saving file:', error);
      throw new Error('File upload failed');
    }
  }

  async getImageFileName(cvId: number): Promise<string> {
    const cv = await this.cvRepository.findOne({ where: { id: cvId } });

    if (!cv || !cv.photo) {
      throw new NotFoundException('CV or image not found');
    }

    return cv.photo;
  }

  async deleteImageFile(userId: number, cvId: number): Promise<void> {
    const upload_path = join(process.cwd(), 'public', 'uploads');
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User not found.`);
    }

    const cv = await this.cvRepository.findOne({
      where: { id: cvId, user: { id: userId } },
    });

    if (!cv || !cv.photo) {
      throw new NotFoundException('Image not found');
    }

    const fileName = cv.photo;
    const filePath = path.join(upload_path, fileName);

    // Update the CV in the database
    const updateResult = await this.cvRepository.update(cvId, { photo: null });

    if (updateResult.affected === 0) {
      throw new Error('Failed to update the CV photo path in the database.');
    }

    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (error) {
        throw new Error('Failed to delete the image file.');
      }
    } else {
      throw new NotFoundException('Image not found on the file system');
    }
  }
}
