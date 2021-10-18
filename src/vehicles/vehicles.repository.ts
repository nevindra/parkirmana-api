import { user_vehicles } from './vehicles.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(user_vehicles)
export class VehiclesRepository extends Repository<user_vehicles> {}
