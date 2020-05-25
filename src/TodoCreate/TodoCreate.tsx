import React from 'react';
import s from './TodoCreate.module.css'

interface Props{
    handleAdd: (text:string) => void
}
interface State{
    text: string
}

class TodoCreate extends React.Component<Props,State> {
    constructor(props:Props){
        super(props);
        this.state={
            text:''
        }
    }
    handleKeydown = (event: React.KeyboardEvent)=>{
        if(
            event.key==='Enter'
        ){
            this.props.handleAdd(this.state.text);
            this.setState(
                {
                    text:''
                }
            );
        }
    }
    handleTextChange = (event:React.ChangeEvent) => {
        this.setState({
            text:(event.target as HTMLInputElement).value
        });
    }
    render(){
        return (
            <div className={s.todoCreate}>
                <input type='text'
                    className={s.create}
                    placeholder='new task'
                    value={this.state.text}
                    onChange={this.handleTextChange}
                    onKeyDown={this.handleKeydown}
                />
            </div>
        );
    }
    
}

export default TodoCreate;