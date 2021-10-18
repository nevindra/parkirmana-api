import { EntityRepository, Repository } from 'typeorm';
import { uni_quotas } from './quotas.entity';

@EntityRepository(uni_quotas)
export class QuotasRepository extends Repository<uni_quotas> {}
