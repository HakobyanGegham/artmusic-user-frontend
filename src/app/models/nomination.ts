import Deserializable from './shared/deserializable.model';

export class Nomination implements Deserializable {
  id: number;
  names: any[];

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
