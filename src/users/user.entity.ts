import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  full_name: string;
  @Column()
  phone_number: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  verification_pin: string;
  @Column()
  device_token: string;
}
