import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Transactions } from 'src/entity/transactions.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Transactions])],
  providers: [TransactionsService],
  controllers: [TransactionsController]
})
export class TransactionsModule {}
