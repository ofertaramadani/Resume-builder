import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Social } from '../Social/entities/Social.entity';
import { Repository } from 'typeorm';
import { CreateSocialDto } from '../Social/dtos/social.dto';

@Injectable()
export class SocialService {
    constructor(
    @InjectRepository(Social)
    private readonly socialRepository: Repository<Social>
    ){}

    async create(createSocialDto:CreateSocialDto):Promise<Social> {
        const social = this.socialRepository.create(createSocialDto);
        return await this.socialRepository.save(social);
    }

    async findAll():Promise<Social[]>{
        return await this.socialRepository.find();
    }

    async remove(id:number):Promise<void>{
        await this.socialRepository.delete(id);
    }
}
