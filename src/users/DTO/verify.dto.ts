import { IsNotEmpty } from 'class-validator';

export class VerifyDto {
  @IsNotEmpty()
  phone_number: string;
  @IsNotEmpty()
  token: string;
}
