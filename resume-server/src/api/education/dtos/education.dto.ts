import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateEducationDto {
    @ApiProperty()
    @IsOptional()
    id: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    title: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    school: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    place: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    start: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    end: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string;

  }