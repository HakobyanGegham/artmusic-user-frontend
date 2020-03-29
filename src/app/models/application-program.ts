import Deserializable from './shared/deserializable.model';

export class ApplicationProgram implements Deserializable {
  id: number;
  compositionAuthor: string;
  compositionName: string;
  compositionMinutes: string;
  compositionMinutesSeconds: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
