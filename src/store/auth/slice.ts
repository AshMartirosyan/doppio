import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { logOut } from '../commonActions';

interface AuthState {
  isFirstTime: boolean;
  token: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isFirstTime: true,
  token: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setIsLoggedIn: state => {
      state.isLoggedIn = true;
    },
    setIsFirstTime: state => {
      state.isFirstTime = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(logOut, () => initialState);
  },
});

export const { setIsLoggedIn, setIsFirstTime, setToken } = authSlice.actions;

export default authSlice.reducer;
