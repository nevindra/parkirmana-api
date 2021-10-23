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
import { Twilio } from 'twilio';
import { VerifyDto } from './DTO/verify.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository) private userRepository: UsersRepository,
  ) {}

  getAllUsers(): Promise<users[]> {
    return this.userRepository
      .createQueryBuilder('users')
      .orderBy('users.id_user')
      .getMany();
  }

  async getUserById(id_user: number): Promise<users> {
    const user = await this.userRepository.findOne(id_user);
    console.log(id_user);
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

  async sendSMS(phone_number: string) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = new Twilio(accountSid, authToken);
    const phone = '+62' + phone_number.substring(1);
    await client.verify
      .services('VAbee2ae4d410d0567f2fe8664ce9c08b2')
      .verifications.create({ to: phone, channel: 'sms' })
      .then((verification) => console.log(verification.sid));
  }

  async verifySMS(verifyDTO: VerifyDto): Promise<any> {
    const { phone_number, token } = verifyDTO;
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = new Twilio(accountSid, authToken);
    const phone = '+62' + phone_number.substring(1);
    const verification_check = await client.verify
      .services('VAbee2ae4d410d0567f2fe8664ce9c08b2')
      .verificationChecks.create({ to: phone, code: token });
    if (verification_check.status === 'approved') {
      return { status: 'approved' };
    } else if (verification_check.status === 'pending') {
      return { status: 'rejected' };
    } else if (verification_check.status === 'expired') {
      return { status: 'expired' };
    }
    console.log(verification_check.status);
  }
}
