import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import gql from 'graphql-tag';
import qs from 'qs';
import React, { useContext, useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { UserContext } from '../MainView';

const CREATE_USER_MUTATION = gql`
  mutation createUser($name: String!) {
    insert_user(objects: { name: $name }) {
      returning {
        id
        name
      }
    }
  }
`;

function FormDialog() {
  const [, setUser] = useContext(UserContext);
  const [state, setDiaglogState] = useState(true);
  const [value, setValue] = useState('');
  React.useEffect(() => {
    if (window.location.search) {
      const parsed = qs.parse(window.location.search.substring(1));
      if (parsed && parsed.id && parsed.name) {
        setUser({ ...parsed, debateUser: true });
        setTimeout(() => {
          setDiaglogState(false);
        }, 100);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const createUser = useMutation(CREATE_USER_MUTATION, {
    variables: { name: value },
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const {
      data: {
        insert_user: {
          returning: [user],
        },
      },
    } = await createUser();
    setUser(user);
    setDiaglogState(false);
  }

  return (
    <div>
      <Dialog open={state} aria-labelledby="form-dialog-title" fullWidth>
        <DialogTitle id="form-dialog-title">Welcome</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>Enter you name to get started</DialogContentText>
            <TextField
              autoFocus
              required
              onChange={e => setValue(e.target.value)}
              value={value}
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default FormDialog;
