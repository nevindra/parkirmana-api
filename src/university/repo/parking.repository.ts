import { EntityRepository, Repository } from 'typeorm';
import { uni_parking_transactions } from '../entities/parking.entity';

@EntityRepository(uni_parking_transactions)
export class ParkingRepository extends Repository<uni_parking_transactions> {}
