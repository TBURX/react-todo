import React from 'react';
import s from './TodoItem.module.css'
import DeleteButton from './DeleteButton/DeleteButton'

interface Props{
    key: number,
    id: number,
    text: string,
    completed: boolean,
    handleCompleteChange: (key:number,text:string,completed:boolean)=>void,
    handleDeleteClick: (id:number)=>void
}
interface State{
    text: string,
    completed: boolean,
    editMode: boolean
}

class TodoItem extends React.Component<Props,State>{
    textInput:React.RefObject<HTMLInputElement>;
    constructor(props:Props){
        super(props);
        this.state={
            text: props.text,
            completed: props.completed,
            editMode:false
        };
        this.textInput = React.createRef();
    }
    handleTextChange = (event:React.ChangeEvent) => {
        this.setState({
            completed:this.state.completed,
            editMode:this.state.editMode,
            text:(event.target as HTMLInputElement).value
        });
    }
    handleClick = (event:React.MouseEvent) => {
        this.setState({
            completed:this.state.completed,
            editMode:true,
            text:this.state.text
        });
    }
    editTextComplete =(text:string)=>{
        this.setState({
            completed:this.state.completed,
            editMode:false,
            text:text
        });
        this.props.handleCompleteChange(this.props.id,this.state.text,this.state.completed);
    }
    handleKeyDown = (event:React.KeyboardEvent) => {
        if(event.key==='Enter'){
            this.editTextComplete(this.state.text);
        }
    }
    handleBlur = (event:React.FocusEvent) => {
        this.editTextComplete(this.state.text);
    }
    handleTaskCompleteChange = (event:React.ChangeEvent) =>{
        var iscompleted = (event.target as HTMLInputElement).checked;
        this.setState({
            completed:iscompleted,
            editMode:false,
            text:this.state.text
        });
        this.props.handleCompleteChange(this.props.id,this.state.text,iscompleted);
    }
    handleDeleteClick = ()=>{
        this.setState({
            completed:this.state.completed,
            editMode:false,
            text:this.state.text
        });
        this.props.handleDeleteClick(this.props.id);
    }

    componentDidUpdate(){
        if(this.state.editMode){
            this.textInput.current?.focus();
        }
    }
    
    render(){
        var completed = this.state.completed?s.completed:'';
        var edit = this.state.editMode?s.edit:'';
        var classes = `${s.todoItem} ${completed} ${edit}`;
        return (
            <div className={classes} onClick={this.handleClick}>
                <p className={s.descriptionWrapper}>
                    <input 
                            className={s.edit}
                            type='textbox' 
                            placeholder='input task'
                            defaultValue={this.props.text}
                            value={this.state.text}
                            onChange = {this.handleTextChange}
                            onKeyDown = {this.handleKeyDown}
                            onBlur = {this.handleBlur}
                            ref = {this.textInput}
                        />
                    <span className={s.description}>{this.state.text}</span>                    
                </p>
                <input type='checkbox' defaultChecked={this.props.completed} onChange={this.handleTaskCompleteChange}/>
                <DeleteButton onClick={this.handleDeleteClick}/>
            </div>
        )
    }
}

export default TodoItem;