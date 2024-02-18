import { Module } from '@nestjs/common';
import { TemplatesController } from './templates.controller';
import { TemplatesService } from './templates.service';
import { Templates } from './entities/templates.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Templates])],
  controllers: [TemplatesController],
  providers: [TemplatesService]
})
export class TemplatesModule {}
