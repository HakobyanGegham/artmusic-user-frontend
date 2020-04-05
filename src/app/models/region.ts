import Deserializable from './shared/deserializable.model';

export class Region implements Deserializable {
  id: number;
  names: any[];
  countryId: number;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
