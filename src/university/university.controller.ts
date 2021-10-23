import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { bookings } from './entities/bookings.entity';
import { UniversityService } from './university.service';
import { bookDto } from './dto/book.dto';
import { uni_parking_transactions } from './entities/parking.entity';

@Controller('uni')
export class UniversityController {
  constructor(private universityService: UniversityService) {}

  @Get('/bookings/:id_user')
  async getAllBooking(@Param('id_user') id_user: number): Promise<bookings[]> {
    return this.universityService.getAllBookings(id_user);
  }

  @Get('/bookings/:id_user/:id_booking')
  async getSingleBooking(
    @Param('id_booking') id_booking: number,
  ): Promise<bookings> {
    return this.universityService.getSingleBooking(id_booking);
  }

  @Delete('/bookings/:id_user/:id_booking')
  @HttpCode(204)
  async deleteBooking(
    @Param('id_booking') id_booking: number,
  ): Promise<string> {
    await this.universityService.deleteBooking(id_booking);
    return `Booking with id ${id_booking} is deleted`;
  }

  @Post('/bookings')
  async bookingParking(@Body() bookingDTO: bookDto): Promise<bookings> {
    return this.universityService.bookingParking(bookingDTO);
  }

  @Get('/parkings/:id_user')
  async getAllParking(
    @Param('id_user') id_user: number,
  ): Promise<uni_parking_transactions[]> {
    return this.universityService.getAllParking(id_user);
  }

  @Get('/parkings/:id_user/:id_parking')
  async getSingleParking(
    @Param('id_parking') id_parking: number,
  ): Promise<uni_parking_transactions> {
    return this.universityService.getSingleParking(id_parking);
  }
}
