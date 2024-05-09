import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Maybe, User } from '../../api/query/types';
import { logOutAction } from '../commonActions';

export type Token = {
  accessToken: string;
  refreshToken: string;
};
interface AuthState {
  token: Maybe<Token>;
  isLoggedIn: boolean;
  user: User | null;
}

const initialState: AuthState = {
  token: null,
  isLoggedIn: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<Token>) => {
      state.token = action.payload;
    },
    setIsLoggedIn: state => {
      state.isLoggedIn = true;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(logOutAction, () => initialState);
  },
});

export const { setIsLoggedIn, setToken, setUser } = authSlice.actions;

export default authSlice.reducer;
