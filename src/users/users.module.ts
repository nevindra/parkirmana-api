import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { VehiclesRepository } from '../vehicles/vehicles.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository, VehiclesRepository])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
