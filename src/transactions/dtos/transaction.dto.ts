import { Expose } from "class-transformer";

export class TransactionDto {
    @Expose()
    userId: string;
    
    @Expose()
    description: string;

    @Expose()
    amount: number;
}