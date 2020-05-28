import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = '';

const reducers = {
  CHANGE: (state: string, action: PayloadAction<{ text: string }>) => {
    return action.payload.text;
  },
  CLEAR: () => '',
};

const todoCreateSlice = createSlice({
  initialState,
  name: 'TODO_CREATE_SLICE',
  reducers,
});

export default todoCreateSlice;
