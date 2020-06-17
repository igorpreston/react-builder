import { combineReducers } from 'redux-immutable';
import selected from './selected';
import hovered from './hovered';
import scroll from './scroll';
import size from './size';
import mouse from './mouse';
import draw from './draw';
import drag from './drag';
import resize from './resize';
import select from './select';

export default combineReducers({
  selected,
  hovered,
  scroll,
  size,
  mouse,
  draw,
  drag,
  resize,
  select,
});
