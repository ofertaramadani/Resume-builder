import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateEducationDto } from "src/api/education/dtos";
import { CreateExperienceDto } from "src/api/experience/dtos";
import { CreateSkillDto } from "src/api/skill/dtos/skill.dto";
import { TemplateDto } from "src/api/templates/dtos/templates.dto";

export class UpdateCvDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    title: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    photo: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    firstname: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    lastname: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    email: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    phone: string;
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    country: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    city: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
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

  }