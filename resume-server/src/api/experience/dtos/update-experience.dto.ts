import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

export class UpdateExperienceDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    title: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    employer: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    place: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    start: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    end: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description: string;

  }