import { Record, List } from 'immutable';

export const PageRecord = Record({
  id: null,
  name: null,
  url: null,
  public: false,
  breakpoints: List(),
});

export class Page extends PageRecord {
  constructor(props) {
    super(props);
  }
}
