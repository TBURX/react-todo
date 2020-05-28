import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoList } from '../store/types';

const getLocalTodos = (): TodoList => {
  const localTodos = localStorage.getItem('todo-items');
  let result: { id: number; text: string; completed: boolean }[];
  if (localTodos === null) {
    result = [];
    localStorage.setItem('todo-items', JSON.stringify(result));
  } else {
    result = JSON.parse(localTodos);
  }
  return result.map((item) => ({
    id: item.id,
    text: item.text,
    completed: item.completed,
    editMode: false,
  }));
};

const updateLocalStore = (state: TodoList) => {
  const tmp = state.map((item) => ({ id: item.id, text: item.text, completed: item.completed }));
  localStorage.setItem('todo-items', JSON.stringify(tmp));
};

const initialState = getLocalTodos();

const reducers = {
  ADD_TODO: (state: TodoList, action: PayloadAction<{ text: string }>) => {
    let maxid = -1;
    for (let i = 0; i < state.length; i++) {
      if (state[i].id > maxid) {
        maxid = state[i].id;
      }
    }
    maxid += 1;
    const result = [
      ...state,
      { id: maxid, text: action.payload.text, completed: false, editMode: false },
    ];
    updateLocalStore(result);
    return result;
  },
  TOGGLE_TODO: (state: TodoList, action: PayloadAction<{ id: number }>) => {
    const index = state.findIndex((s) => s.id === action.payload.id);
    if (index >= 0) {
      state[index].completed = !state[index].completed;
    }
    updateLocalStore(state);
    return state;
  },
  TOGGLE_EDIT_ON: (state: TodoList, action: PayloadAction<{ id: number }>) => {
    const index = state.findIndex((s) => s.id === action.payload.id);
    if (index >= 0) {
      state[index].editMode = true;
    }
    return state;
  },
  TOGGLE_EDIT_OFF: (state: TodoList, action: PayloadAction<{ id: number }>) => {
    const index = state.findIndex((s) => s.id === action.payload.id);
    if (index >= 0) {
      state[index].editMode = false;
    }
    return state;
  },
  UPDATE_TODO: (state: TodoList, action: PayloadAction<{ id: number; text: string }>) => {
    const index = state.findIndex((s) => s.id === action.payload.id);
    if (index >= 0) {
      state[index].text = action.payload.text;
    }
    updateLocalStore(state);
    return state;
  },
  DELETE_TODO: (state: TodoList, action: PayloadAction<{ id: number }>) => {
    const index = state.findIndex((s) => s.id === action.payload.id);
    if (index >= 0) {
      state.splice(index, 1);
    }
    updateLocalStore(state);
    return state;
  },
};

const todosSlice = createSlice({
  initialState,
  name: 'TODO_SLICE',
  reducers,
});

export default todosSlice;
