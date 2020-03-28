import Deserializable from './shared/deserializable.model';

export class Festival implements Deserializable {
  id: number;
  name: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
