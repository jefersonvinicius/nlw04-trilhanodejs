import { Survey } from '@app/models/Survey';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Survey)
export class SurveysRepository extends Repository<Survey> {}
