import Deserializable from './shared/deserializable.model';

export class User implements Deserializable {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  token: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
