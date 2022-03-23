import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateTransactionDto {
  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  @IsOptional()
  amount: number;
}
