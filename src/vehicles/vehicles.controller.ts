import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { user_vehicles } from './vehicles.enitity';
import { RegisterVehicleDto } from './dto/register-vehicle.dto';

@Controller('vehicles')
export class VehiclesController {
  constructor(private vehicleService: VehiclesService) {}

  @Get()
  async getAllVehicle() {
    return this.vehicleService.getAllVehicles();
  }

  @Get(':/id_user')
  async getUserVehicleById(
    @Param('id_user') id_user: number,
  ): Promise<user_vehicles[]> {
    return this.vehicleService.getUserVehicleById(id_user);
  }

  @Post('/register')
  async registerVehicle(
    @Body() registerVehicleDTO: RegisterVehicleDto,
  ): Promise<user_vehicles> {
    return this.vehicleService.createVehicle(registerVehicleDTO);
  }

  @Delete('/:id_vehicle')
  async deleteVehicle(
    @Param('id_vehicle') id_vehicle: number,
  ): Promise<string> {
    await this.vehicleService.deleteVehicle(id_vehicle);
    return `Delete vehicle with id ${id_vehicle}`;
  }
}
