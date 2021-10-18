import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { company } from './company.entity';
import { bookings } from './bookings.entity';

@Entity()
export class places {
  @PrimaryGeneratedColumn()
  id_place: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  coordinates: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_) => company)
  @JoinColumn({ name: 'id_company' })
  company: company[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_) => bookings)
  @JoinColumn({ name: 'id_place' })
  booking: bookings[];
}
