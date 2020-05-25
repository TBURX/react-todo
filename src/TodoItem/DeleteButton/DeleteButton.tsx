import React from 'react';
import s from './DeleteButton.module.css';

interface Props {
  onClick: () => void;
}
const DeleteButton = (props: Props): JSX.Element => {
  const { onClick } = props;
  return <div className={s.DeleteButton} onClick={onClick} />;
};

export default DeleteButton;
