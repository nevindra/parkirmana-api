import { IsNotEmpty } from 'class-validator';

export class bookDto {
  @IsNotEmpty()
  id_user: number;

  @IsNotEmpty()
  id_vehicle: number;

  @IsNotEmpty()
  id_place: number;
}
