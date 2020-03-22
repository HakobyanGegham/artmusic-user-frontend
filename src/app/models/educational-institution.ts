import Deserializable from './shared/deserializable.model';

export class EducationalInstitution implements Deserializable {
  id: number;
  name: string;
  cityId: number;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
