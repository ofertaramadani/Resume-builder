import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dtos/skill.dto';
import { Skill } from './entities/skill.entity';

@ApiBearerAuth()
@ApiTags("Skill")
@UsePipes(new ValidationPipe())
@UseInterceptors(ClassSerializerInterceptor)
@Controller('skill')
export class SkillController {
    constructor(
        private readonly skillService:SkillService
    ){}

    @Post()
    async create(@Body() createSkillDto:CreateSkillDto): Promise<Skill> {
        return await this.skillService.create(createSkillDto);
    }

    @Get()
    async findAll():Promise<Skill[]>{
        return await this.skillService.findAll();
    }

    @Delete(':id')
    async remove(@Param('id') id:number):Promise<void> {
        return await this.skillService.remove(+id);
    }
    
}
