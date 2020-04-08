import React, {memo} from 'react';
import { makeStyles } from '@material-ui/core';
import classnames from 'classnames';
const useStyles = makeStyles({
  selected: {
    color: '#ffffff !important',
    backgroundColor: '#484848',
  },
  button: {
    color: '#484848',
    width: 20,
    display: 'inline-block',
    padding: 5,
    margin: 5,
    borderColor: '#484848',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    cursor: 'pointer'
  }
});

export default memo(function SquareCheckbox({options, values, onChange, multi}){
  const classes = useStyles();
  if(multi){
    //More complicated logic for addeing and removing values
    return null;
  }
  return <div>
    {options.map(option => <div key={option.id} className={classnames(classes.button, {[classes.selected]: values.indexOf(option.id) > -1})} onClick={()=>onChange([option.id])}>
      {option.label}
      </div>)}
  </div>
});