import Deserializable from './shared/deserializable.model';

export class Nomination implements Deserializable {
  id: number;
  names: any[];
  createdAt: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
