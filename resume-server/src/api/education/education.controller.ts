import { Controller, Get, Post, Param, Body, Put, Delete, ValidationPipe, ClassSerializerInterceptor, UsePipes, UseInterceptors, NotFoundException } from '@nestjs/common';
import { EducationService } from './education.service';
import { Education } from './entities/education.entity';
import { CreateEducationDto, UpdateEducationDto } from './dtos';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags("Education")
@UsePipes(new ValidationPipe())
@UseInterceptors(ClassSerializerInterceptor)
@Controller('education')
export class EducationController {
  constructor(
    private readonly educationService: EducationService
    ) {}

  @Post(':cvId')
  async create(@Body() createEducationDto: CreateEducationDto,
        @Param('cvId') cvId: number
        ): Promise<Education> {
          try {
            return await this.educationService.create(createEducationDto, cvId);
          } catch (error) {
            if (error instanceof NotFoundException) {
              throw new NotFoundException(`CV with ID ${cvId} not found`);
            }
            throw error;
        }
    }

  @Get(':cvId')
  findAll(@Param('cvId') cvId: number): Promise<Education[]> {
    return this.educationService.findAll(cvId);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Education> {
    return this.educationService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateEducationDto: UpdateEducationDto): Promise<Education> {
    return this.educationService.update(+id, updateEducationDto);
  }

  @Delete(':cvId/:id')
  remove(
    @Param('cvId') cvId: number,
    @Param('id') id: number
  ): Promise<void> {
    return this.educationService.remove(id, cvId);
}
}
