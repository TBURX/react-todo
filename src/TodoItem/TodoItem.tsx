import React from 'react';
import s from './TodoItem.module.css';
import DeleteButton from './DeleteButton/DeleteButton';

interface Props {
  key: number;
  id: number;
  text: string;
  completed: boolean;
  handleCompleteChange: (key: number, text: string, completed: boolean) => void;
  handleDeleteClick: (id: number) => void;
}
interface State {
  text: string;
  completed: boolean;
  editMode: boolean;
}

class TodoItem extends React.Component<Props, State> {
  textInput: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      text: props.text,
      completed: props.completed,
      editMode: false,
    };
    this.textInput = React.createRef();
  }

  componentDidUpdate(): void {
    const { text, completed, editMode } = this.state;
    if (editMode) {
      if (this.textInput.current) {
        this.textInput.current.focus();
      }
    }
  }

  handleTextChange = (event: React.ChangeEvent): void => {
    this.setState((prevState) => ({
      completed: prevState.completed,
      editMode: prevState.editMode,
      text: (event.target as HTMLInputElement).value,
    }));
  };

  handleClick = (): void => {
    this.setState((prevState) => ({
      completed: prevState.completed,
      editMode: true,
      text: prevState.text,
    }));
  };

  editTextComplete = (text: string): void => {
    this.setState((prevState) => ({
      completed: prevState.completed,
      editMode: false,
      text,
    }));
    this.props.handleCompleteChange(this.props.id, this.state.text, this.state.completed);
  };

  handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      this.editTextComplete(this.state.text);
    }
  };

  handleBlur = (): void => {
    this.editTextComplete(this.state.text);
  };

  handleTaskCompleteChange = (event: React.ChangeEvent): void => {
    const iscompleted = (event.target as HTMLInputElement).checked;
    this.setState((prevState) => ({
      completed: iscompleted,
      editMode: false,
      text: prevState.text,
    }));
    this.props.handleCompleteChange(this.props.id, this.state.text, iscompleted);
  };

  handleDeleteClick = (): void => {
    this.setState((prevState) => ({
      completed: prevState.completed,
      editMode: false,
      text: prevState.text,
    }));
    this.props.handleDeleteClick(this.props.id);
  };

  render(): JSX.Element {
    const { text, completed, editMode } = this.state;
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
            defaultValue={this.props.text}
            value={text}
            onChange={this.handleTextChange}
            onKeyDown={this.handleKeyDown}
            onBlur={this.handleBlur}
            ref={this.textInput}
          />
          <span className={s.description}>{text}</span>
        </p>
        <input
          type="checkbox"
          defaultChecked={this.props.completed}
          onChange={this.handleTaskCompleteChange}
        />
        <DeleteButton onClick={this.handleDeleteClick} />
      </div>
    );
  }
}

export default TodoItem;
