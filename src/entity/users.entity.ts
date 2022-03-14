import {
  AfterInsert,
  BeforeRemove,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

  @AfterInsert()
  logInsert() {
    console.log('Inserted user with id: ' + this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated user with id: ' + this.id);
  }

  @BeforeRemove()
  async remove() {
    console.log('Removing user with id: ' + this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed user with id: ' + this.id);
  }
}
