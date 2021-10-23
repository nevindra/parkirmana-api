import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingRepository } from './repo/bookings.repository';
import { bookings } from './entities/bookings.entity';
import { bookDto } from './dto/book.dto';
import { QuotasRepository } from '../transactions/quotas.repository';
import { uni_parking_transactions } from './entities/parking.entity';
import { ParkingRepository } from './repo/parking.repository';

@Injectable()
export class UniversityService {
  constructor(
    @InjectRepository(BookingRepository)
    private uniRepo: BookingRepository,
    private quotaRepo: QuotasRepository,
    private parkingRepo: ParkingRepository,
  ) {}

  async getAllBookings(id_user: number): Promise<bookings[]> {
    return this.uniRepo.find({ id_user });
  }

  async getSingleBooking(id_booking: number): Promise<bookings> {
    const booking = this.uniRepo.findOne({ id_booking });
    if (!booking)
      throw new NotFoundException(`Booking with id ${id_booking} is not found`);
    return booking;
  }

  async bookingParking(bookingDTO: bookDto): Promise<bookings> {
    const { id_user } = bookingDTO;
    const user = await this.quotaRepo.findOne({ id_user });

    if (user.amount === 0) {
      throw new UnauthorizedException(`Your quota is 0.`);
    }

    const result = await this.uniRepo.createBooking(bookingDTO);
    await this.quotaRepo.update({ id_user }, { amount: user.amount - 1 });
    return result;
  }

  async deleteBooking(id_booking: number): Promise<void> {
    await this.uniRepo.delete({ id_booking });
  }

  async getAllParking(id_user: number): Promise<uni_parking_transactions[]> {
    return await this.parkingRepo.find({ id_user });
  }

  async getSingleParking(
    id_parking: number,
  ): Promise<uni_parking_transactions> {
    const user = await this.parkingRepo.findOne({ id_parking });

    if (!user)
      throw new NotFoundException(
        `Parking with id ${id_parking} is not found.`,
      );

    return user;
  }
}
