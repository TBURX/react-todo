import { configureStore, Middleware } from '@reduxjs/toolkit';
import todosSlice from '../slices/todos';
import todoCreateSlice from '../slices/todoCreate';

/**
 * Logs all actions and states after they are dispatched.
 */
const logger: Middleware = (api) => (next) => (action) => {
  console.group(action.type);
  console.info('dispatching', action);
  const result = next(action);
  console.log('next state', api.getState());
  console.groupEnd();
  return result;
};

const store = configureStore({
  reducer: { todos: todosSlice.reducer, todoCreate: todoCreateSlice.reducer },
  middleware: [logger],
});

export default store;
