import { user_vehicles } from './vehicles.enitity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(user_vehicles)
export class VehiclesRepository extends Repository<user_vehicles> {}
