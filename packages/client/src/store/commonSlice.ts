import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { INITIAL_USER } from './constants';
import { ICommonState, InitialUserType } from './interfaces';

const initialState: ICommonState = {
  currentUser: INITIAL_USER,
  theme: 'default',
  isAuthModalOpen: false,
  language: 'RU',
};

export const counterSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<InitialUserType>) => {
      state.currentUser = action.payload;
    },
    toggleAuthModalState: state => {
      state.isAuthModalOpen = !state.isAuthModalOpen;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setUser, toggleAuthModalState, setTheme, setLanguage } = counterSlice.actions;

export default counterSlice.reducer;
