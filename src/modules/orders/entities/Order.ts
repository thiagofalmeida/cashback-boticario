import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from '../../users/entities/User';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: number;

  @Column()
  price: number;

  @Column()
  status: string;

  @Column()
  date: Date;

  @Column()
  cpf: string;

  @Column()
  cashback_percentage: number;

  @Column()
  cashback_return_value: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'cpf' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
