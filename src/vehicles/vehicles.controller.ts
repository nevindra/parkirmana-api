import { Body, Controller, Get, Param } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { user_vehicles } from './vehicles.enitity';

@Controller('vehicles')
export class VehiclesController {
  constructor(private vehicleService: VehiclesService) {}

  @Get()
  async getAllVehicle() {
    return this.vehicleService.getAllVehicles();
  }

  async getUserVehicleById(
    @Param('id_user') id_user: number,
  ): Promise<user_vehicles[]> {
    return this.vehicleService.getUserVehicleById(id_user);
  }
}
