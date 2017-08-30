import { combineReducers } from 'redux';
import drawer from './drawer';
import user from './user';
import registerUser from './RegisterUser';
import list from './list';
import records from './records';

export default combineReducers({

  drawer,
  user,
  list,
  registerUser,
  records,

});
