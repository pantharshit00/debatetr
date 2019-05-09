import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ContestentCard from '../ContestentCard';

export default function index({ data, canVote, setCanVote }) {
  const [user1, user2] = data;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ContestentCard
          data={{
            id: user1.id,
            name: user1.name,
            current:
              (user1.debates[0] && user1.debates[0].text) || 'No Responses Yet',
          }}
          votes={user1.votes}
          canVote={canVote}
          setCanVote={setCanVote}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography align="center" variant="h6">
          VS
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ContestentCard
          data={{
            id: user2.id,
            name: user2.name,
            current:
              (user2.debates[0] && user2.debates[0].text) || 'No Responses Yet',
          }}
          votes={user2.votes}
          canVote={canVote}
          setCanVote={setCanVote}
        />
      </Grid>
    </Grid>
  );
}
