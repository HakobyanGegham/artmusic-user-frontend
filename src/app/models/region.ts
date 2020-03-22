import Deserializable from './shared/deserializable.model';

export class Region implements Deserializable {
  id: number;
  name: string;
  countryId: number;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
