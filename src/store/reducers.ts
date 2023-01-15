import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './auth/slice';

const rootReducer = combineReducers({
  auth: AuthReducer,
});

export default rootReducer;
