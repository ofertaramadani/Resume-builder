import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Templates } from './entities/templates.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TemplatesService {
    constructor(
        @InjectRepository(Templates)
        private readonly templatesRepository:Repository<Templates>
    ){}

    async findAll(): Promise<Templates[]> {
        return await this.templatesRepository.find();
    }
}
