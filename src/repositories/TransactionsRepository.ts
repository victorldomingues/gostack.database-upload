import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';
import Balance from '../models/Balance';



@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();
    const income = transactions.filter(x => x.type === 'income').reduce((accumulator, transaction) => accumulator + transaction.value, 0);
    const outcome = transactions.filter(x => x.type === 'outcome').reduce((accumulator, transaction) => accumulator + transaction.value, 0);
    const total = income - outcome;
    return {
      income,
      outcome,
      total
    }
  }
  async getTransactionsWithCategory(): Promise<Transaction[]> {
    const transactions = await this.find({
      relations: ['category']
    });
    return transactions;
  }
}

export default TransactionsRepository;
