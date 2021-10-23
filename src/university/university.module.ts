import { Module } from '@nestjs/common';
import { UniversityController } from './university.controller';
import { UniversityService } from './university.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingRepository } from './repo/bookings.repository';
import { QuotasRepository } from '../transactions/quotas.repository';
import { ParkingRepository } from './repo/parking.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BookingRepository,
      QuotasRepository,
      ParkingRepository,
    ]),
  ],
  controllers: [UniversityController],
  providers: [UniversityService],
})
export class UniversityModule {}
