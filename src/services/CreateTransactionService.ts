import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import { getCustomRepository, getManager } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CategoriesRepostiory from '../repositories/CategoriesRepository';
import Category from '../models/Category';
interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}
class CreateTransactionService {
  public async execute({ title, value, type, category }: Request): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionsRepository);
    const categoryRepository = getCustomRepository(CategoriesRepostiory);
    const balance = await transactionRepository.getBalance();
    if (type == 'outcome') {
      if (balance.total < value) throw new AppError('Without enough balance', 400);
    }

    let existentCategory = await categoryRepository.findOne({
      where: { title: category }
    });
    if (!existentCategory) {
      existentCategory = await categoryRepository.create({ title: category });
      await categoryRepository.save(existentCategory as Category);
    }
    const category_id = existentCategory.id;
    const transaction = await transactionRepository.create({ title, value, type, category_id });
    await transactionRepository.save(transaction);
    return transaction;
  }
}

export default CreateTransactionService;
