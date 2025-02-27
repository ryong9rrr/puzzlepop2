import { IsString, IsNotEmpty } from 'class-validator';

export class InitializePiecesDto {
  @IsString()
  @IsNotEmpty()
  src: string;

  @IsString()
  @IsNotEmpty()
  level: string;
}
