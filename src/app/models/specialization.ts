import Deserializable from './shared/deserializable.model';

export class Specialization implements Deserializable {
  id: number;
  names: any[];
  nominationId: number;
  createdAt: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
