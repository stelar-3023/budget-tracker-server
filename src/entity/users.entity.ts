import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transactions } from './transactions.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  deleted_at: Date;

  @OneToMany(() => Transactions, (transaction) => transaction.user)
  transaction: Transactions[];
}
