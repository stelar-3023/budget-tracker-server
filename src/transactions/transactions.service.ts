import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entity/users.entity';
import { TransactionDto } from 'src/transactions/dtos/transaction.dto';
import { Transactions } from 'src/entity/transactions.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private transaction: Repository<Transactions>,
  ) {}

  public async createTransaction(transaction: TransactionDto, userId): Promise<Transactions> {
    return await this.transaction.save(transaction);
  }

  // get all transactions
  public async getAllTransactions(): Promise<Transactions[]> {
    return await this.transaction.find();
  }

  // get transaction by id
  public async getTransactionById(id: number): Promise<Transactions> {
    return await this.transaction.findOne(id);
  }

  // update transaction
  public async updateTransaction(
    id: number,
    attrs: TransactionDto,
  ): Promise<Transactions> {
    const transaction = await this.getTransactionById(id);
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    Object.assign(transaction, attrs); // copy the attributes to the transaction
    return this.transaction.save(transaction);
  }

  // delete transaction
  public async deleteTransaction(id: number) {
    const transaction = await this.getTransactionById(id);
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return await this.transaction.remove(transaction);
  }
}
