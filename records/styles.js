import { Record } from 'immutable';

export const StylesRecord = Record({
  top: 0,
  left: 0,
  width: 0,
  height: 0,
});

export class Styles extends StylesRecord {
  constructor(props) {
    super(props);
  }
}
