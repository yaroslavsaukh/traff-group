import { IsString, IsOptional } from 'class-validator';

export class CreateRequestLogDto {
  @IsString()
  clientId!: string;

  @IsString()
  path!: string;

  @IsString()
  method!: string;

  @IsOptional()
  @IsString()
  ip?: string;

  @IsOptional()
  @IsString()
  userAgent?: string;
}
