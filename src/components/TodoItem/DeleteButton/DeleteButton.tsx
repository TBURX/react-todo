import React from 'react';
import s from './DeleteButton.module.css';

interface Props {
  onClick: () => void;
}

const DeleteButton = (props: Props): JSX.Element => {
  const { onClick } = props;
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClick();
  };
  return <div className={s.DeleteButton} onClick={handleClick} />;
};

export default DeleteButton;
