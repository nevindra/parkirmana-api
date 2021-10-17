import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehiclesRepository } from './vehicles.repository';
import { user_vehicles } from './vehicles.enitity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(VehiclesRepository)
    private vehicleRepository: VehiclesRepository,
  ) {}

  getAllVehicles(): Promise<user_vehicles[]> {
    return this.vehicleRepository.find();
  }

  async getUserVehicleById(id_user: number): Promise<user_vehicles[]> {
    return this.vehicleRepository.find({ id_user });
  }
}
