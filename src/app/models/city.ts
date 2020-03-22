import Deserializable from './shared/deserializable.model';

export class City implements Deserializable {
  id: number;
  name: string;
  regionId: number;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
