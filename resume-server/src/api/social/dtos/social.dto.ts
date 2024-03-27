import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateSocialDto {
    @ApiProperty()
    @IsOptional()
    id: number;
    
    @ApiProperty()
    @IsString()
    name:string
}