import { Annotation } from './Annotation';
import { Chance } from 'chance';
export class Record {
  id: string;
  text: string;
  note?: string;
  tags?: string[];
  annotations?: Annotation[];

  constructor(props) {
    this.id = props.id;
    this.text = props.text;
    this.note = props.note;
    this.tags = props.tags;
    this.annotations = props.annotations;
  }

  /**
   * Creates a fake Record
   * @returns
   */
  static fake() {
    const chance = Chance();
    return new Record({
      id: chance.guid(),
      text: chance.word(),
      note: chance.paragraph(),
      tags: Array.from({ length: chance.integer({ min: 0, max: 5 }) }).map(() =>
        chance.word()
      ),
    });
  }
}
