import Deserializable from './shared/deserializable.model';

export class City implements Deserializable {
  id: number;
  names: any[];
  regionId: number;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
