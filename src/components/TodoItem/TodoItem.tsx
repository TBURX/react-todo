import React from 'react';
import { connect } from 'react-redux';
import s from './TodoItem.module.css';
import DeleteButton from './DeleteButton/DeleteButton';
import { TodoList } from '../../redux/store/types';
import todosSlice from '../../redux/slices/todos';

interface Props extends StateProps, DispatchProps, OwnProps {
  key: number;
}

class TodoItem extends React.Component<Props, unknown> {
  textInput: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidUpdate(): void {
    const { editMode } = this.props;
    if (editMode) {
      if (this.textInput.current) {
        this.textInput.current.focus();
      }
    }
  }

  handleTextChange = (event: React.ChangeEvent): void => {
    const inputValue = (event.target as HTMLInputElement).value;
    this.props.updateTodo({ id: this.props.id, text: inputValue });
  };

  handleClick = (): void => {
    this.props.toggleEditOn({ id: this.props.id });
  };

  editTextComplete = (text: string): void => {
    this.props.updateTodo({ id: this.props.id, text });
    this.props.toggleEditOff({ id: this.props.id });
  };

  handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      this.editTextComplete(this.props.text);
    }
  };

  handleBlur = (): void => {
    this.editTextComplete(this.props.text);
  };

  handleTaskCompleteChange = (event: React.MouseEvent): void => {
    event.stopPropagation();
    this.props.toggleComplete({ id: this.props.id });
  };

  handleDeleteClick = (): void => {
    this.props.delete({ id: this.props.id });
  };

  render(): JSX.Element {
    const { text, completed, editMode } = this.props;
    const completedClass = completed ? s.completed : '';
    const editClass = editMode ? s.edit : '';
    const classes = `${s.todoItem} ${completedClass} ${editClass}`;
    return (
      <div className={classes} onClick={this.handleClick}>
        <p className={s.descriptionWrapper}>
          <input
            className={s.edit}
            type="textbox"
            placeholder="input task"
            defaultValue={text}
            value={text}
            onChange={this.handleTextChange}
            onKeyDown={this.handleKeyDown}
            onBlur={this.handleBlur}
            ref={this.textInput}
          />
          <span className={s.description}>{text}</span>
        </p>
        <input type="checkbox" defaultChecked={completed} onClick={this.handleTaskCompleteChange} />
        <DeleteButton onClick={this.handleDeleteClick} />
      </div>
    );
  }
}

interface OwnProps {
  id: number;
}

interface StateProps {
  text: string;
  completed: boolean;
  editMode: boolean;
}

const mapStateToProps = (state: { todos: TodoList }, ownProps: OwnProps): StateProps => {
  const item = state.todos.find((it) => it.id === ownProps.id);
  if (item) {
    return { text: item.text, completed: item.completed, editMode: item.editMode };
  }
  return { text: '', completed: false, editMode: false };
};

interface DispatchProps {
  updateTodo: typeof todosSlice.actions.UPDATE_TODO;
  toggleEditOn: typeof todosSlice.actions.TOGGLE_EDIT_ON;
  toggleEditOff: typeof todosSlice.actions.TOGGLE_EDIT_OFF;
  toggleComplete: typeof todosSlice.actions.TOGGLE_TODO;
  delete: typeof todosSlice.actions.DELETE_TODO;
}

const dispatchToProps = {
  updateTodo: todosSlice.actions.UPDATE_TODO,
  toggleEditOn: todosSlice.actions.TOGGLE_EDIT_ON,
  toggleEditOff: todosSlice.actions.TOGGLE_EDIT_OFF,
  toggleComplete: todosSlice.actions.TOGGLE_TODO,
  delete: todosSlice.actions.DELETE_TODO,
};

export default connect(mapStateToProps, dispatchToProps)(TodoItem);
