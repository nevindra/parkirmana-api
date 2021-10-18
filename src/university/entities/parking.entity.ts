import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { users } from '../../users/user.entity';
import { user_vehicles } from '../../vehicles/vehicles.entity';
import { places } from './places.entity';

@Entity()
export class uni_parking_transactions {
  @PrimaryGeneratedColumn()
  id_parking: number;
  @Column()
  time_in: Date;
  @Column()
  time_out: Date;
  @Column()
  is_done: boolean;

  @Column()
  id_user: number;
  @Column()
  id_vehicle: number;
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
  @ManyToOne((_type) => places)
  @JoinColumn({ name: 'id_place' })
  places: places[];
}
