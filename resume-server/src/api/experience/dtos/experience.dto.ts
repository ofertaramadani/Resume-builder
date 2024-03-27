import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateExperienceDto {
    @ApiProperty()
    @IsOptional()
    id: number;

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    employer: string;

    @ApiProperty()
    @IsString()
    place: string;

    @ApiProperty()
    @IsString()
    start: string;

    @ApiProperty()
    @IsString()
    end: string;

    @ApiProperty()
    @IsString()
    description: string;

  }