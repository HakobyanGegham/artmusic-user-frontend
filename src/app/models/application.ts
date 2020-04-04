import Deserializable from './shared/deserializable.model';
import {Applicant} from './applicant';
import {Nomination} from './nomination';
import {Specialization} from './specialization';
import {Country} from './country';
import {Region} from './region';
import {City} from './city';
import {Institution} from './institution';
import {ApplicationProgram} from './application-program';

export class Application implements Deserializable {
  id: number;
  applicant: Applicant;
  country: Country;
  region: Region;
  city: City;
  institution: Institution;
  nomination: Nomination;
  specialization: Specialization;
  directorFirstName: string;
  directorLastName: string;
  programs: ApplicationProgram[];
  state: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    this.applicant = new Applicant().deserialize(input.applicant);
    this.country = new Country().deserialize(input.country);
    this.region = new Region().deserialize(input.region);
    this.city = new City().deserialize(input.city);
    this.institution = new Institution().deserialize(input.institution);
    this.nomination = new Nomination().deserialize(input.nomination);
    this.specialization = new Specialization().deserialize(input.specialization);
    input.programs.forEach((program, key) => {
      this.programs[key] = new ApplicationProgram().deserialize(program);
    });
    return this;
  }
}
