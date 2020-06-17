import { Record } from 'immutable';

export const DimensionsRecord = Record({
  top: 0,
  left: 0,
  width: 0,
  height: 0,
});

export class Dimensions extends DimensionsRecord {
  constructor(props) {
    super(props);
  }
}
