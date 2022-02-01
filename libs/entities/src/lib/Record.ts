import { Annotation } from './Annotation';

export class Record {
  id: string;
  text: string;
  note?: string;
  annotations?: Annotation[];
}
