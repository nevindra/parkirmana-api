import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './DTO/create-user.dto';
import { users } from './user.entity';
import { LoginDto } from './DTO/login.dto';
import { VerifyDto } from './DTO/verify.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAllUsers(): Promise<users[]> {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  getUserById(@Param('id') id: number): Promise<users> {
    return this.userService.getUserById(id);
  }

  @Post('/registration')
  registration(@Body() createUserDTO: CreateUserDto): Promise<users> {
    return this.userService.registration(createUserDTO);
  }

  @Post('/login')
  login(
    @Body()
    loginUserDTO: LoginDto,
  ): Promise<users[]> {
    return this.userService.login(loginUserDTO);
  }

  @Post('/send-sms')
  sendSMS(@Body('phone_number') phone_number: string) {
    return this.userService.sendSMS(phone_number);
  }

  @Post('/check-sms')
  checkSMS(@Body() verifyDTO: VerifyDto) {
    return this.userService.verifySMS(verifyDTO);
  }
}
