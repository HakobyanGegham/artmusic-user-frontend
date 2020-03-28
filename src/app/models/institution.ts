import Deserializable from './shared/deserializable.model';

export class Institution implements Deserializable {
  id: number;
  name: string;
  cityId: number;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
