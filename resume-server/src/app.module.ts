import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { NestEmitterModule } from 'nest-emitter';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards/at.guard';
import { config } from './common/db/dataSource/data-source.config';
import { EventEmitter } from 'stream';
import { MailService } from './services/mail/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EducationModule } from './api/education/education.module';
import { ExperienceModule } from './api/experience/experience.module';
import { SkillModule } from './api/skill/skill.module';
import { SocialModule } from './api/social/social.module';
import { CvModule } from './api/cv/cv.module';
import { TemplatesModule } from './api/templates/templates.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MulterModule } from '@nestjs/platform-express'; // Use this for file uploads
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot(config as DataSourceOptions),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_AUTH_USER,
          pass: process.env.MAIL_AUTH_PASSWORD,
        },
      },
      defaults: {
        from: process.env.SENDER_MAIL,
      },
      template: {
        dir: __dirname + '/../templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    NestEmitterModule.forRoot(new EventEmitter()),
    AuthModule,
    UserModule,
    EducationModule,
    ExperienceModule,
    SkillModule,
    SocialModule,
    CvModule,
    TemplatesModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'), // Serves files from 'public' at the root level
    }),
    MulterModule.register({
      dest: join(process.cwd(), 'public', 'uploads'), // Saves files to 'public/uploads'
    }),
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: AtGuard },
    AppService,
    MailService,
    Logger,
  ],
})
export class AppModule {}
