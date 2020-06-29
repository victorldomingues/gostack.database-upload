import AppError from '../errors/AppError';
import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
interface Request {
  id: string;
}
class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transcationsRepository = getCustomRepository(TransactionsRepository);
    const transaction = await transcationsRepository.findOne({
      where: {
        id
      }
    });
    if (!transaction) throw new AppError('The transaction does not exist!', 401);
    await transcationsRepository.remove(transaction);
  }
}

export default DeleteTransactionService;
