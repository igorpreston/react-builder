import { Record, fromJS } from 'immutable';
import { Dimensions } from './dimensions';
import { Styles } from './styles';

export const TextRecord = Record({
  editor: null,
  selection: null,
  content: null,
});

export class Text extends TextRecord {
  constructor(props) {
    super(props);
  }
};

export const BlocRecord = Record({
  id: null,
  name: null,
  dimensions: new Dimensions(),
  styles: new Styles(),
  text: new Text(),
});

export class Bloc extends BlocRecord {
  constructor(props) {
    super(props);
  }
}
