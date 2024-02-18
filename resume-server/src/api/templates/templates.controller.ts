import { ClassSerializerInterceptor, Controller, Get, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { Templates } from './entities/templates.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


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
}

