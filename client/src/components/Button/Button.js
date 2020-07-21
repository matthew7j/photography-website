import React from 'react';

import classes from './Button.module.css';

const Button = props => {
  let allClasses = [ classes.button, classes[props.btnType] ].join(' ');
  if (props.noButton) {
    return (null);
  }
  return (
    <button 
      className = { allClasses }
      onClick = { props.clicked }
      disabled = { props.disabled }
    > { props.children } 
    </button>
  );
}

export default Button;
