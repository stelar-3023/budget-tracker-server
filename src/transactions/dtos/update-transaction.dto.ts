import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateTransactionDto {
  
  readonly userId: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  @IsOptional()
  amount: number;
}
