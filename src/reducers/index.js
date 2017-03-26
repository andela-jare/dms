import { combineReducers } from 'redux';
import * as users from './users';
import * as documents from './documents';

const rootReducer = combineReducers({
  login: users.login,
  error: users.error,
  document: documents.documents
});

export default rootReducer;
