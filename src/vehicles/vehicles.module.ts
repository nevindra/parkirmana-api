import { Module } from '@nestjs/common';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { UsersRepository } from '../users/users.repository';
import { VehiclesRepository } from './vehicles.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository, VehiclesRepository])],
  controllers: [VehiclesController],
  providers: [VehiclesService],
})
export class VehiclesModule {}
