import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PowChallengeDto {
  @IsString()
  clientId!: string;

  @IsOptional()
  @IsNumber()
  difficulty?: number;
}
