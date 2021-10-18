import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { user_vehicles } from './vehicles.entity';
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

  @Get('/:id_vehicle')
  async getSingleVehicle(
    @Param('id_vehicle') id_vehicle: number,
  ): Promise<user_vehicles> {
    return this.vehicleService.getSingleVehicle(id_vehicle);
  }

  @Post('/register')
  async registerVehicle(
    @Body() registerVehicleDTO: RegisterVehicleDto,
  ): Promise<user_vehicles> {
    return this.vehicleService.createVehicle(registerVehicleDTO);
  }

  @Delete()
  @HttpCode(204)
  async deleteVehicle(@Body('id_vehicle') id_vehicle: number): Promise<string> {
    await this.vehicleService.deleteVehicle(id_vehicle);
    return `Vehicle with id ${id_vehicle} is deleted`;
  }
}
