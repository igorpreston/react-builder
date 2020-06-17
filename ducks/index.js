import { combineReducers } from 'redux-immutable';
import canvas from './canvas';
import snap from './snap';
import breakpoints from './breakpoints';
import blocs from './blocs';
import pages from './pages';
import explorer from './explorer';
import timeMachine from './timeMachine';
import fonts from './fonts';
import logs from './logs';

export default combineReducers({
  canvas,
  snap,
  breakpoints,
  blocs,
  pages,
  explorer,
  timeMachine,
  fonts,
  logs,
});
