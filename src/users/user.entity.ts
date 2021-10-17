import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { user_vehicles } from '../vehicles/vehicles.enitity';

@Entity()
export class users {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column({ unique: true })
  full_name: string;

  @Column()
  phone_number: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  verification_pin: string;

  @Column()
  device_token: string;

  @OneToMany((_type) => user_vehicles, (vehicle) => vehicle.users)
  vehicles: user_vehicles;
}
