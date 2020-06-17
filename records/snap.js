import { Record, List } from 'immutable';

export const SnapOriginRecord = Record({
  id: null,
  type: null,
});

export class SnapOrigin extends SnapOriginRecord {
  constructor(props) {
    super(props);
  }
};

export const SnapDrawRecord = Record({
  type: null,
  x: null,
  y: null,
});

export class SnapDraw extends SnapDrawRecord {
  constructor(props) {
    super(props);
  }
};

export const SnapLineRecord = Record({
  x: null,
  y: null,
  origin: new SnapOrigin(),
  draw: List(),
  source: null,
  sens: null,
});

export class SnapLine extends SnapLineRecord {
  constructor(props) {
    super(props);
  }
};

export const SnapTargetRecord = Record({
  name: null,
  x: null,
  y: null,
  origin: new SnapOrigin(),
});

export class SnapTarget extends SnapTargetRecord {
  constructor(props) {
    super(props);
  }
};

export const SnappedRecord = Record({
  line: null,
  target: null,
});

export class Snapped extends SnappedRecord {
  constructor(props) {
    super(props);
  }
};