import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './DTO/create-user.dto';
import { users } from './user.entity';
import { LoginDto } from './DTO/login.dto';
import { ConfigService } from '@nestjs/config';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private configService: ConfigService,
  ) {
    console.log('TESTING');
    console.log(configService.get('DATABASE_HOST'));
  }

  @Get()
  getAllUsers(): Promise<users[]> {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: number): Promise<users> {
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
}
