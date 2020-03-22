import Deserializable from './shared/deserializable.model';

export class Specialization implements Deserializable {
  id: number;
  name: string;
  nominationId: number;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
