import { Record } from 'immutable';

export const MousePosRecord = Record({
  x: 0,
  y: 0,
});

export class MousePos extends MousePosRecord {
  constructor(props) {
    super(props);
  }
};

export const MouseDirectionRecord = Record({
  x: null,
  y: null,
});

export class MouseDirection extends MouseDirectionRecord {
  constructor(props) {
    super(props);
  }
};
