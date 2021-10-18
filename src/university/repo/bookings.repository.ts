import { EntityRepository, Repository } from 'typeorm';
import { bookings } from '../entities/bookings.entity';
import { bookDto } from '../dto/book.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(bookings)
export class BookingRepository extends Repository<bookings> {
  async createBooking(bookingDTO: bookDto): Promise<bookings> {
    const { id_user, id_vehicle, id_place } = bookingDTO;

    const booking: bookings = this.create({
      id_user,
      id_vehicle,
      id_place,
    });

    const found = await this.findOne({
      where: { id_vehicle, status: 'BOOKED' },
    });

    if (found) throw new ConflictException(`Booking already exist`);

    try {
      await this.save(booking);
    } catch (e) {
      if (e.code === '23503') {
        throw new ConflictException(`Place / vehicle doesn't exist.`);
      } else {
        console.log(e);
        throw new InternalServerErrorException();
      }
    }
    return booking;
  }
}
