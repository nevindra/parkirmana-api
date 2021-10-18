import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehiclesRepository } from './vehicles.repository';
import { user_vehicles } from './vehicles.entity';
import { RegisterVehicleDto } from './dto/register-vehicle.dto';

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
    const user = this.vehicleRepository.find({ id_user: id_user });
    if (!user) {
      throw new NotFoundException(`User with id: ${id_user}, is not found.`);
    }
    return user;
  }

  async getSingleVehicle(id_vehicle: number): Promise<user_vehicles> {
    return this.vehicleRepository.findOne({ id_vehicle });
  }

  async createVehicle(
    registerVehicleDTO: RegisterVehicleDto,
  ): Promise<user_vehicles> {
    const { plat_number, vehicle_type, id_user } = registerVehicleDTO;

    const created = this.vehicleRepository.create({
      plat_number,
      vehicle_type,
      id_user,
    });

    try {
      return await this.vehicleRepository.save(created);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async deleteVehicle(id_vehicle: number): Promise<void> {
    await this.vehicleRepository.delete({ id_vehicle: id_vehicle });
  }
}
