import { createAction } from '@reduxjs/toolkit';
import { queryClient, store } from '.';

export const logOutAction = createAction('logOut');

export const handleLogOut = () => {
  store.dispatch(logOutAction);
  queryClient.clear();
};
