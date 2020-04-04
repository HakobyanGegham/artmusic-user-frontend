import Deserializable from './shared/deserializable.model';

export class Applicant implements Deserializable {
  id: number;
  firstName: string;
  lastName: string;
  patriotic: string;
  age: string;
  email: string;
  birthDate: string;
  phoneNumber: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
