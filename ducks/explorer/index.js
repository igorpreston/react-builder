import { combineReducers } from 'redux-immutable';
import tab from './tab';
import modal from './modal';

export default combineReducers({
  tab,
  modal,
});