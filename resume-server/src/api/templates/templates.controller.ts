import { ClassSerializerInterceptor, Controller, Get, Body, Post, UseInterceptors, UsePipes, ValidationPipe, Param } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { Templates } from './entities/templates.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TemplateDto } from './dtos/templates.dto';


@ApiBearerAuth()
@ApiTags("Templates")
@UsePipes(new ValidationPipe())
@UseInterceptors(ClassSerializerInterceptor)
@Controller('templates')
export class TemplatesController {
    constructor(
        private readonly templatesService:TemplatesService
    ){}

    @Get()
    async findAll(): Promise<Templates[]> {
        return await this.templatesService.findAll()
    }

    @Post()
    async create(@Body() templateDto:TemplateDto): Promise<Templates>{
        try {
            return this.templatesService.create(templateDto)
        }
        catch(error) {
            throw error;
        }
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Templates> {
      return this.templatesService.findOne(+id);
    }
  

}


