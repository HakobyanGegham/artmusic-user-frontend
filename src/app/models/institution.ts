import Deserializable from './shared/deserializable.model';

export class Institution implements Deserializable {
  id: number;
  names: any[];
  cityId: number;
  createdAt: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
