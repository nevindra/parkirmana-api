import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { user_vehicles } from '../vehicles/vehicles.entity';

@Entity()
export class users {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column({ nullable: true })
  full_name: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  verification_pin: string;

  @Column()
  device_token: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((_type) => user_vehicles, (vehicle) => vehicle.users)
  vehicles: user_vehicles;
}
