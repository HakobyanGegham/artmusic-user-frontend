import Deserializable from './shared/deserializable.model';

export class FormFilter implements Deserializable {
  ageFrom: number;
  ageTo: number;
  nomination: string;
  specialization: string;
  institution: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
