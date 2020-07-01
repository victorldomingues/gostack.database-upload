import { CreateDateColumn, UpdateDateColumn, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Entity } from "typeorm";
import Category from "./Category";

export class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}

@Entity('transactions')
class Transaction {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  type: 'income' | 'outcome';

  @Column({ type: 'numeric', scale: 2, precision: 10, transformer: new ColumnNumericTransformer() })
  value: number;

  @Column()
  category_id: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default Transaction;
