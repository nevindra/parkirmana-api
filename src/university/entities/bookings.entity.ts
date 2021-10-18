import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { users } from '../../users/user.entity';
import { user_vehicles } from '../../vehicles/vehicles.entity';
import { places } from './places.entity';

@Entity()
export class bookings {
  @PrimaryGeneratedColumn()
  id_booking: number;

  @Column({ type: 'timestamp' })
  time_booking: Date;

  @Column()
  status: boolean;

  @Column()
  id_vehicle: number;

  @Column()
  id_user: number;

  @Column()
  id_place: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_type) => users)
  @JoinColumn({ name: 'id_user' })
  users: users[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne((_type) => user_vehicles)
  @JoinColumn({ name: 'id_vehicle' })
  vehicles: user_vehicles[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((_type) => places, (place) => place.booking)
  @JoinColumn({ name: 'id_place' })
  places: places[];
}
