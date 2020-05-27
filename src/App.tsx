import React, { Component } from 'react';
import './App.css';
import TodoCreate from './components/TodoCreate/TodoCreate';
import TodoListComponent from './components/TodoList/TodoListComponent';

interface State {
  localTodos: { id: number; text: string; completed: boolean }[];
}

class App extends Component<unknown, State> {
  constructor() {
    super({});
    this.state = { localTodos: this.getLocalTodos() };
  }

  getLocalTodos = (): { id: number; text: string; completed: boolean }[] => {
    const localTodos = localStorage.getItem('todo-items');
    let result: { id: number; text: string; completed: boolean }[];
    if (localTodos === null) {
      result = [];
      localStorage.setItem('todo-items', JSON.stringify(result));
    } else {
      result = JSON.parse(localTodos);
    }
    return result;
  };

  handleCompleteChange = (key: number, text: string, completed: boolean): void => {
    const item = this.state.localTodos.find((t) => t.id === key);
    if (item) {
      item.completed = completed;
      item.text = text;
    }
    localStorage.setItem('todo-items', JSON.stringify(this.state.localTodos));
    this.forceUpdate();
  };

  handleAdd = (text: string): void => {
    let maxid = -1;
    for (let i = 0; i < this.state.localTodos.length; i++) {
      if (this.state.localTodos[i].id > maxid) {
        maxid = this.state.localTodos[i].id;
      }
    }
    maxid += 1;
    this.state.localTodos.push({ id: maxid, text, completed: false });
    localStorage.setItem('todo-items', JSON.stringify(this.state.localTodos));
    this.forceUpdate();
  };

  render(): JSX.Element {
    return (
      <div className="App">
        <TodoCreate />
        <TodoListComponent />
      </div>
    );
  }
}

export default App;
