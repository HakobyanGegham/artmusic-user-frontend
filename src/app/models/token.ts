import Deserializable from './shared/deserializable.model';

export class Token implements Deserializable {
  token: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
