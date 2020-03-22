import Deserializable from './shared/deserializable.model';
import {Country} from './country';
import {Region} from './region';
import {City} from './city';
import {EducationalInstitution} from './educational-institution';
import {Nomination} from './nomination';
import {Specialization} from './specialization';

export class ApplicationForm implements Deserializable {
  country: Country;
  region: Region;
  city: City;
  educationalInstitution: EducationalInstitution;
  nomination: Nomination;
  specialization: Specialization;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
