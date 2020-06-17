import { Record } from 'immutable';

export const ScrollPosRecord = Record({
  x: 0,
  y: 0,
});

export class ScrollPos extends ScrollPosRecord {
  constructor(props) {
    super(props);
  }
};
