import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateEducationDto } from "src/api/education/dtos";
import { CreateExperienceDto } from "src/api/experience/dtos";
import { CreateSkillDto } from "src/api/skill/dtos/skill.dto";
import { TemplateDto } from "src/api/templates/dtos/templates.dto";

export class CreateCvDto {
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    photo: string;

    @ApiProperty()
    @IsString()
    firstname: string;

    @ApiProperty()
    @IsString()
    lastname: string;

    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    phone: string;
    
    @ApiProperty()
    @IsString()
    country: string;

    @ApiProperty()
    @IsString()
    city: string;

    @ApiProperty()
    @IsString()
    professionalSummary: string;

    @ApiProperty({ type: [CreateEducationDto] })
    @ValidateNested({ each: true })
    @Type(() => CreateEducationDto)
    @IsOptional()
    educations: CreateEducationDto[];
    
    @ApiProperty({ type: [CreateExperienceDto] })
    @ValidateNested({ each: true })
    @Type(() => CreateExperienceDto)
    @IsDefined()
    @IsOptional()
    experiences: CreateExperienceDto[];
    
    @ApiProperty({ type: [CreateSkillDto] })
    @ValidateNested({ each: true })
    @Type(() => CreateSkillDto)
    @IsDefined()
    @IsOptional()
    skills: CreateSkillDto[];

    @ApiProperty({ type: [CreateSkillDto] })
    @ValidateNested({ each: true })
    @Type(() => CreateSkillDto)
    @IsDefined()
    @IsOptional()
    socials: CreateSkillDto[];

    @ApiProperty({ type: [TemplateDto] })
    @ValidateNested({ each: true })
    @Type(() => TemplateDto)
    @IsDefined()
    @IsOptional()
    templates: TemplateDto[];
    templateUuid: any;
  }