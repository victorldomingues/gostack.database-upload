import Transaction from "../models/Transaction";
import parse from 'csv-parse/lib/sync'
import CreateTransactionService from "./CreateTransactionService";
interface Request {
  file: Express.Multer.File;
  files: {
    [fieldname: string]: Express.Multer.File[];
  } | Express.Multer.File[];
}
class ImportTransactionsService {
  async execute({ file, files }: Request): Promise<Transaction[]> {
    let transactions: Transaction[] = [];
    if (file)
      transactions = [...transactions, ...(await this.proccessFile(file))];
    if (files) {
      for (const f of files as Express.Multer.File[])
        transactions = [...transactions, ...(await this.proccessFile(f))];
    }

    return transactions;
  }
  protected async proccessFile(file: Express.Multer.File): Promise<Transaction[]> {
    const output = await parse(file['buffer'].toString(), {
      skip_empty_lines: true
    }) as any[];
    const transactions: Transaction[] = [];
    if (output != null && output.length > 0) {
      for (let i = 1; i < output.length; i++) {
        let [title, type, value, category] = output[i];
        title = title.trim();
        type = type.trim();
        value = Number(value.trim());
        category = category.trim();
        const service = new CreateTransactionService();
        const transaction = await service.execute({ title, type, value, category });
        transactions.push(transaction);
      }
    }
    return transactions;
  }
}
export default ImportTransactionsService;
