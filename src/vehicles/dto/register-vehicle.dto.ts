import { IsNotEmpty } from 'class-validator';

export class RegisterVehicleDto {
  @IsNotEmpty()
  plat_number: string;

  @IsNotEmpty()
  vehicle_type: string;

  id_user: number;
}
