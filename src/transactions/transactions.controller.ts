import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards , NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TransactionDto } from 'src/transactions/dtos/transaction.dto';
import { UpdateTransactionDto } from 'src/transactions/dtos/update-transaction.dto';
import { Transactions } from 'src/entity/transactions.entity';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}

  @Get()
  async getAllTransactions() {
    // get all transactions in the database
    return this.transactionService.getAllTransactions();
  }

  @Get(':/id')
  async getTransactionById(id: number) {
    // get transaction by id
    return this.transactionService.getTransactionById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createTransaction(
    @Body() transaction: TransactionDto,
    @Request() req): Promise<Transactions> {
    // create new transaction
    return await this.transactionService.createTransaction(
      transaction,
      req.user.id,
    );
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  async updateTransaction(@Param('id') id: number, @Body() transaction: UpdateTransactionDto, @Request() req): Promise<Transactions> {
    // update transaction
    return this.transactionService.updateTransaction(id, transaction);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deleteTransaction(@Param('id') id: number, @Request() req) {
    // delete transaction
    return this.transactionService.deleteTransaction(id);
  }
}
