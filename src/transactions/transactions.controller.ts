import { Body, Controller, Post } from '@nestjs/common';
import { request } from 'express';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}
}
