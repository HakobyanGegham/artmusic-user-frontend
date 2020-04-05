import Deserializable from './shared/deserializable.model';

export class Region implements Deserializable {
  id: number;
  names: any[];
  countryId: number;
  createdAt: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
