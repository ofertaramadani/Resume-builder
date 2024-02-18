import { Controller, Get, Param, NotFoundException, ClassSerializerInterceptor, UseInterceptors, UsePipes, ValidationPipe, Body, HttpCode, HttpStatus, Post, Put } from '@nestjs/common';
import { CvService } from './cv.service';
import { Cv } from './entities/cv.entity';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { User } from '../user/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCvDto } from './dtos/create-cv.dto';
import { UpdateCvDto } from './dtos/update-cv.dto';

@ApiBearerAuth()
@ApiTags("Cv")
@UsePipes(new ValidationPipe())
@UseInterceptors(ClassSerializerInterceptor)
@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Get()
  async getUserCvs(@GetCurrentUser() user:User): Promise<Cv[]> {
    const userCvs = await this.cvService.getUserCvs(user.id);

    if (userCvs.length === 0) {
      throw new NotFoundException(`User with ID ${user.id} not found or has no CVs.`);
    }

    return userCvs;
  }

  @Get('/:cvId')
  async getUserCv(
    @GetCurrentUser() user:User,
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
    @GetCurrentUser() user:User,
    @Body() createCvDto: CreateCvDto,
  ): Promise<Cv> {
    try {
      const createdCv = await this.cvService.createUserCv(user.id, createCvDto);
      return createdCv;
    } catch (error) {
      if (error instanceof NotFoundException) {
        // Handle NotFoundException
        throw new NotFoundException(error.message);
      }
      // Handle other errors
      throw error;
    }
  }


  @Put('/:cvId')
  async updateUserCv(
    @GetCurrentUser() user:User,
    @Body() updateCvDto:UpdateCvDto,
    @Param('cvId') cvId:number 
  ):Promise<Cv>{
    try {
      const updatedCv = await this.cvService.updateUserCv(user.id, cvId ,updateCvDto);
      return updatedCv;
    }catch(error){
      if (error instanceof NotFoundException) {
        // Handle NotFoundException
        throw new NotFoundException(error.message);
      }
      // Handle other errors
      throw error;
    }
  }
}


