import { combineReducers } from 'redux';
import * as users from './users';

const rootReducer = combineReducers({
  login: users.login,
  error: users.error
});

export default rootReducer;
