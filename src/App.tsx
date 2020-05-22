import React, { Component } from 'react';
import './App.css';
import TodoItem from './TodoItem/TodoItem';
interface Props{}
interface State{
  localTodos: {id:number,text:string,completed:boolean}[]
}
class App extends Component<Props,State> { 
  getLocalTodos = function():{id:number,text:string,completed:boolean}[]{
    var localTodos = localStorage.getItem('todo-items');
    var result:{id:number,text:string,completed:boolean}[];
    if(localTodos === null){
      result = [];
      localStorage.setItem('todo-items', JSON.stringify(result));
    }
    else{
      result = JSON.parse(localTodos);
    }
    return result;
  }
  constructor(props:Props){
    super(props);
    this.state={localTodos: this.getLocalTodos()};
  }  
  handleCompleteChange =(key:number,text:string, completed:boolean)=>{
    var item = this.state.localTodos.find(t=>t.id===key);
    if(item){
      item.completed=completed;
      item.text=text;
    }
    localStorage.setItem('todo-items', JSON.stringify(this.state.localTodos));
    this.setState({localTodos:this.state.localTodos});
  }
  render(){
    const allTasks = this.state.localTodos;
    const activeTasks = allTasks.filter(t => t.completed===false);
    const completedTasks = allTasks.filter(t => t.completed===true);
    const renderedTasks = [...activeTasks,...completedTasks].map(item=>{
      return(
        <TodoItem key={item.id} id={item.id} text={item.text} completed={item.completed} handleCompleteChange={this.handleCompleteChange}/>
      )
    })
    return (
      <div className="App">
        {renderedTasks}
      </div>
    );
  }  
}

export default App;
