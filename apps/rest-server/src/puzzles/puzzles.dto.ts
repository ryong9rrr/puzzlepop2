import { IsString, IsNotEmpty } from 'class-validator';

export class UploadBodyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
