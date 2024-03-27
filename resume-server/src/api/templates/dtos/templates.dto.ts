import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class TemplateDto {
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    path: string;

    @ApiProperty()
    @IsString()
    image: string;
  }