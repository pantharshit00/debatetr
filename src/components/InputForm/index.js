import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles({
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  sendButton: {
    flex: '56px',
  },
});

export default function InputForm({
  disabled,
  onSubmit,
  value,
  setValue,
  label,
}) {
  const classes = useStyles();
  return (
    <form className={classes.inputContainer} onSubmit={onSubmit}>
      <TextField
        label={label}
        fullWidth
        disabled={disabled}
        variant="standard"
        multiline
        value={value}
        onChange={e => {
          setValue(e.target.value);
        }}
        className={classes.textField}
        margin="normal"
      />
      <Fab type="submit" className={classes.sendButton} color="primary">
        <SendIcon />
      </Fab>
    </form>
  );
}
