import React from 'react';
import { connect } from 'react-redux';
import TodoItem from '../TodoItem/TodoItem';
import { TodoList } from '../../redux/store/types';
import { RootState } from '../../redux/store/store';

type Props = StateProps;

const TodoListComponent = (props: Props): JSX.Element => {
  const { todos } = props;
  const activeTasks = todos.filter((t: { completed: boolean }) => t.completed === false);
  const completedTasks = todos.filter((t: { completed: boolean }) => t.completed === true);
  const renderedTasks = [...activeTasks, ...completedTasks].map((item) => {
    return <TodoItem key={item.id} id={item.id} />;
  });
  return <div>{renderedTasks}</div>;
};

interface StateProps {
  todos: TodoList;
}

const mapStateToProps = (state: RootState): StateProps => ({
  todos: state.todos,
});

export default connect(mapStateToProps, {})(TodoListComponent);
