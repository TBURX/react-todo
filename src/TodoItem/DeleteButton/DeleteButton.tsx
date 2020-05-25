import React from 'react'
import s from './DeleteButton.module.css'
interface Props{
    onClick: ()=>void
}
class DeleteButton extends React.Component<Props> {
    render(){        
        return(
            <div className={s.DeleteButton} onClick={this.props.onClick}></div>
        )
    }
}

export default DeleteButton;