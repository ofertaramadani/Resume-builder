import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { In } from 'typeorm';
import { Templates } from '../../../../api/templates/entities/templates.entity';
import AppDataSource from '../../dataSource/data-source.initialize';

@Injectable()
export class TemplatesSeeder implements Seeder {
  async seed(): Promise<any> {
    const templateRepository = AppDataSource.getRepository(Templates);
    const templates = templateRepository.create([
      {
        title: 'template_1',
        path: 'template_1',
        image: 'template_1',
      },
      {
        title: 'template_2',
        path: 'template_2',
        image: 'template_2',
      },
      {
        title: 'template_3',
        path: 'template_3',
        image: 'template_3',
      },
      {
        title: 'template_4',
        path: 'template_4',
        image: 'template_4',
      },
      {
        title: 'template_5',
        path: 'template_5',
        image: 'template_5',
      },
    ]);
    await templateRepository.save(templates);
  }

  async drop(): Promise<any> {
    const templateRepository = AppDataSource.getRepository(Templates);
    const titles = ['template_1', 'template_2', 'template_3', 'template_4'];
    await templateRepository.delete({ title: In(titles) });
  }
}

// seeder({
//   imports: [TypeOrmModule.forRoot(config as DataSourceOptions)],
// }).run([UsersSeeder]);
