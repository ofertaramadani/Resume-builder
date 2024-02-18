import { Body, Post, Controller, Get, Delete, Param } from '@nestjs/common';
import { SocialService } from './social.service';
import { CreateSocialDto } from './dtos/social.dto';
import { Social } from './entities/Social.entity';

@Controller('social')
export class SocialController {
    constructor(
        private readonly socialService:SocialService
    ){}

    @Post()
    async create(@Body() createSocialDto:CreateSocialDto): Promise<Social>{
        return await this.socialService.create(createSocialDto);
    }

    @Get()
    async findAll():Promise<Social[]>{
        return await this.socialService.findAll();
    }

    @Delete(':id')
    async remove(@Param('id') id:number):Promise<void> {
        await this.socialService.remove(+id);
    }
}
