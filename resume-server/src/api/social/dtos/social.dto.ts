import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateSocialDto {
    @ApiProperty()
    @IsString()
    name:string
}