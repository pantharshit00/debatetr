import { Container } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useSubscription } from 'react-apollo-hooks';
import Spinner from '@material-ui/core/CircularProgress';
import Chart from '../Chart';
import Chat from '../Chat';
import Debate from '../Debate';
import NameDialog from '../NameDialog';
import Debator from '../Debator';

const DEBATE_SUBSCRIPTION = gql`
  subscription {
    debate_user(where: { active: { _eq: true } }, limit: 2) {
      id
      name
      votes
      debates(limit: 1, order_by: { timestamp: desc }) {
        id
        text
      }
    }
  }
`;

export const UserContext = React.createContext();

export const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  sendButton: {
    flex: '56px',
  },
});

const MainView = () => {
  const classes = useStyles();
  const useUser = useState(null);
  const [canVote, setCanVote] = useState(true);
  const { data, loading, error } = useSubscription(DEBATE_SUBSCRIPTION);
  if (error) {
    return 'something happened, refresh the page';
  }
  return (
    <UserContext.Provider value={useUser}>
      <div className={classes.root}>
        <NameDialog />
        <AppBar position="static" style={{ marginBottom: '1rem' }}>
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Debatetr
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <Debate
                canVote={canVote}
                setCanVote={setCanVote}
                data={data.debate_user}
              />
              <br />
              {useUser[0] && useUser[0].debateUser && (
                <Debator user={useUser[0]} />
              )}
              <br />
              <Chart
                data={data.debate_user.map(item => ({
                  name: item.name,
                  value: item.votes,
                }))}
              />
            </>
          )}
          <Typography variant="h6" gutterBottom>
            Live Chat
          </Typography>
          <Chat />
          <br />
          <br />
        </Container>
      </div>
    </UserContext.Provider>
  );
};

export default MainView;
