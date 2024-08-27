// src/cv/dtos/upload-image.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadImageDto {
  @IsNotEmpty()
  @IsString()
  image: string; // The image data (base64)
}
