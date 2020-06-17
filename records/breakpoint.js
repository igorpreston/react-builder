import { Record, List } from 'immutable';

export const BreakpointRecord = Record({
  id: null,
  pageId: null,
  width: null,
  blocs: List(),
});

export class Breakpoint extends BreakpointRecord {
  constructor(props) {
    super(props);
  }
};
