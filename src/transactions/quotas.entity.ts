import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { users } from '../users/user.entity';

@Entity()
export class uni_quotas {
  @PrimaryGeneratedColumn()
  id_quota: number;

  @Column()
  amount: number;

  @Column()
  id_user: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne((_type) => users)
  @JoinColumn({ name: 'id_user' })
  users: users[];
}
