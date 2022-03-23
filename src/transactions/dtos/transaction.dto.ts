import { Expose } from "class-transformer";

export class TransactionDto {
    @Expose()
    description: string;

    @Expose()
    amount: number;
}