import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

export class UpdateEducationDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    title: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    school: string;

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