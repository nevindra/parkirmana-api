import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { users } from '../users/user.entity';
import { bookings } from '../university/entities/bookings.entity';

@Entity()
export class user_vehicles {
  @PrimaryGeneratedColumn()
  id_vehicle: number;

  @Column()
  plat_number: string;

  @Column()
  vehicle_type: string;

  @Column()
  last_parking: string;

  @Column()
  id_user: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_type) => users)
  @JoinColumn({ name: 'id_user' })
  users: users[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne((_) => bookings)
  @JoinColumn({ name: 'id_vehicle' })
  bookings: bookings[];
}
