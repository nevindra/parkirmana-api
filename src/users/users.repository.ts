import { EntityRepository, Repository } from 'typeorm';
import { users } from './user.entity';
import { CreateUserDto } from './DTO/create-user.dto';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(users)
export class UsersRepository extends Repository<users> {
  async createUser(createUserDTO: CreateUserDto): Promise<users> {
    const { full_name, phone_number, email, password, verification_pin } =
      createUserDTO;
    const salt = 10;
    const hPassword = await bcrypt.hash(password, salt);
    const hVerif = await bcrypt.hash(verification_pin, salt);
    const user: users = this.create({
      full_name,
      phone_number,
      email,
      password: hPassword,
      verification_pin: hVerif,
    });
    try {
      await this.save(user);
    } catch (e) {
      // duplicate email
      if (e.code === '23505') {
        throw new ConflictException(`Email already exists in the database.`);
      } else {
        throw new InternalServerErrorException();
      }
    }
    return user;
  }
}
