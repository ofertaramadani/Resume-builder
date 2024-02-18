import { Controller, Get, Post, Param, Body, Put, Delete, ValidationPipe, ClassSerializerInterceptor, UsePipes, UseInterceptors, NotFoundException } from '@nestjs/common';
import { CreateExperienceDto, UpdateExperienceDto } from './dtos';
import { Experience } from './entities/experience.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ExperienceService } from './experience.service';

@ApiBearerAuth()
@ApiTags("Experience")
@UsePipes(new ValidationPipe())
@UseInterceptors(ClassSerializerInterceptor)
@Controller('experience')
export class ExperienceController {
    constructor(private readonly experienceService:ExperienceService){}

    @Post(':cvId')
    async create(@Body() createExperienceDto: CreateExperienceDto,
          @Param('cvId') cvId: number
          ): Promise<Experience> {
            try {
              return await this.experienceService.create(createExperienceDto, cvId);
            } catch (error) {
              if (error instanceof NotFoundException) {
                throw new NotFoundException(`CV with ID ${cvId} not found`);
              }
              throw error;
          }
      }

    @Get()
    findAll(): Promise<Experience[]> {
        return this.experienceService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id:number):Promise<Experience> {
        return this.experienceService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id:number,@Body() updateExperienceDto:UpdateExperienceDto):Promise<Experience>{
        return this.experienceService.update(+id, updateExperienceDto);
    }

    @Delete(':id')
    remove(@Param('id') id:number):Promise<void> {
        return this.experienceService.remove(+id);
    }
}
