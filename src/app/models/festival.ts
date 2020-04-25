import Deserializable from './shared/deserializable.model';

export class Festival implements Deserializable {
  id: number;
  names: [];

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
