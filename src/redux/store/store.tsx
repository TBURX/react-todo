import { configureStore, Middleware } from '@reduxjs/toolkit';
import todoReducer from '../reducers/todos';

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

const store = configureStore({ reducer: { todos: todoReducer }, middleware: [logger] });

export default store;
