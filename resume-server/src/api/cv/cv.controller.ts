import {
  Controller,
  Get,
  Param,
  NotFoundException,
  ClassSerializerInterceptor,
  UsePipes,
  ValidationPipe,
  Body,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Delete,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { CvService } from './cv.service';
import { Cv } from './entities/cv.entity';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { User } from '../user/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCvDto } from './dtos/create-cv.dto';
import { UpdateCvDto } from './dtos/update-cv.dto';

@ApiBearerAuth()
@ApiTags('Cv')
@UsePipes(new ValidationPipe())
@UseInterceptors(ClassSerializerInterceptor)
@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Get()
  async getUserCvs(@GetCurrentUser() user: User): Promise<Cv[]> {
    const userCvs = await this.cvService.getUserCvs(user.id);

    if (userCvs.length === 0) {
      throw new NotFoundException(
        `User with ID ${user.id} not found or has no CVs.`,
      );
    }

    return userCvs;
  }

  @Get('/:cvId')
  async getUserCv(
    @GetCurrentUser() user: User,
    @Param('cvId') cvId: number,
  ): Promise<Cv> {
    try {
      return await this.cvService.getUserCv(user.id, cvId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUserCv(
    @GetCurrentUser() user: User,
    @Body() createCvDto: CreateCvDto,
  ): Promise<Cv> {
    try {
      const createdCv = await this.cvService.createUserCv(user.id, createCvDto);
      return createdCv;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Put('/:cvId')
  async updateUserCv(
    @GetCurrentUser() user: User,
    @Body() updateCvDto: UpdateCvDto,
    @Param('cvId') cvId: number,
  ): Promise<Cv> {
    try {
      const updatedCv = await this.cvService.updateUserCv(
        user.id,
        cvId,
        updateCvDto,
      );
      return updatedCv;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Delete('/:cvId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserCv(
    @GetCurrentUser() user: User,
    @Param('cvId') cvId: number,
  ): Promise<void> {
    try {
      await this.cvService.deleteUserCv(user.id, cvId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Post('/:cvId/upload-image')
  @UseInterceptors(FileInterceptor('photo'))
  async uploadCvImage(
    @Param('cvId') cvId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.cvService.uploadCvImage(cvId, file);
  }

  @Get(':cvId/image')
  async getImage(@Param('cvId') cvId: number, @Res() res: Response) {
    try {
      const fileName = await this.cvService.getImageFileName(cvId);
      const filePath = join(process.cwd(), 'public', 'uploads', fileName);
      if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
      } else {
        throw new NotFoundException('Image not found');
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(404).send(error.message);
      } else {
        res.status(500).send('Internal Server Error');
      }
    }
  }

  @Delete(':cvId/image')
  async deleteImage(@GetCurrentUser() user: User, @Param('cvId') cvId: number) {
    try {
      await this.cvService.deleteImageFile(user.id, cvId);
      return { message: 'Image deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Image not found');
      } else {
        throw new Error('Internal Server Error');
      }
    }
  }
}
