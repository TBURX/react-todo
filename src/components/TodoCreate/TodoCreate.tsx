import React from 'react';
import { connect } from 'react-redux';
import s from './TodoCreate.module.css';
import todosSlice from '../../redux/slices/todos';
import todoCreateSlice from '../../redux/slices/todoCreate';
import { RootState } from '../../redux/store/store';

interface Props extends StateProps, DispatchProps {}

class TodoCreate extends React.Component<Props, unknown> {
  handleKeydown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      this.props.addTodo({ text: this.props.text });
      this.props.clear();
    }
  };

  handleTextChange = (event: React.ChangeEvent): void => {
    this.props.change({ text: (event.target as HTMLInputElement).value });
  };

  render(): JSX.Element {
    const { text } = this.props;
    return (
      <div className={s.todoCreate}>
        <input
          type="text"
          className={s.create}
          placeholder="new task"
          value={text}
          onChange={this.handleTextChange}
          onKeyDown={this.handleKeydown}
        />
      </div>
    );
  }
}

interface StateProps {
  text: string;
}

const mapStateToProps = (state: RootState): StateProps => ({
  text: state.todoCreate,
});

interface DispatchProps {
  addTodo: typeof todosSlice.actions.ADD_TODO;
  change: typeof todoCreateSlice.actions.CHANGE;
  clear: typeof todoCreateSlice.actions.CLEAR;
}

const dispatchToProps = {
  addTodo: todosSlice.actions.ADD_TODO,
  change: todoCreateSlice.actions.CHANGE,
  clear: todoCreateSlice.actions.CLEAR,
};

export default connect(mapStateToProps, dispatchToProps)(TodoCreate);
