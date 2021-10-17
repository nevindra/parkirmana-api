import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './DTO/create-user.dto';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { users } from './user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './DTO/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository) private userRepository: UsersRepository,
  ) {}

  getAllUsers(): Promise<users[]> {
    return this.userRepository.find();
  }

  async getUserById(id_user: number): Promise<users> {
    const user = await this.userRepository.findOne(id_user);

    if (!user) {
      throw new NotFoundException(`User with id: ${id_user}, is not found.`);
    }
    return user;
  }

  registration(createUserDTO: CreateUserDto): Promise<users> {
    return this.userRepository.createUser(createUserDTO);
  }

  async login(loginUserDTO: LoginDto): Promise<users[]> {
    const { email, password } = loginUserDTO;
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new NotFoundException(`User with email ${email} is not found.`);
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException(`Password is wrong.`);
    const result = [];
    result.push(user);
    return result;
  }
}
