import Deserializable from './shared/deserializable.model';

export class Country implements Deserializable {
  id: number;
  names: any[];
  createdAt: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
