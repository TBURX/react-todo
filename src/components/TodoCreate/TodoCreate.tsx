import React from 'react';
import { connect } from 'react-redux';
import s from './TodoCreate.module.css';
import store from '../../redux/store/store';
import { ADD_TODO } from '../../redux/reducers/todos';

type Props = DispatchProps;

interface State {
  text: string;
}

class TodoCreate extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  handleKeydown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      store.dispatch(this.props.addTodo({ text: this.state.text }));
    }
  };

  handleTextChange = (event: React.ChangeEvent): void => {
    this.setState({
      text: (event.target as HTMLInputElement).value,
    });
  };

  render(): JSX.Element {
    const { text } = this.state;
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

interface DispatchProps {
  addTodo: typeof ADD_TODO;
}

const dispatchToProps = {
  addTodo: ADD_TODO,
};

export default connect(null, dispatchToProps)(TodoCreate);
