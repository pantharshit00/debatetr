/* eslint-disable no-nested-ternary */
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';

const VOTING_MUTATION = gql`
  mutation vote($user: uuid) {
    update_debate_user(_inc: { votes: 1 }, where: { id: { _eq: $user } }) {
      returning {
        id
      }
    }
  }
`;

function ContestentCard({
  data: { id, name, current },
  canVote,
  setCanVote,
  votes,
  isDebator,
}) {
  const vote = useMutation(VOTING_MUTATION, {
    variables: {
      user: id,
    },
  });
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {current}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            setCanVote(false);
            vote();
            setTimeout(() => {
              setCanVote(true);
            }, 10000);
          }}
          disabled={isDebator || !canVote}
          size="small"
          color="primary"
        >
          {canVote
            ? isDebator
              ? 'You are debator so you cant vote'
              : 'Vote'
            : 'Wait 10s to cast next vote'}
        </Button>
        <Button disabled size="small" color="secondary">
          {votes}
        </Button>
      </CardActions>
    </Card>
  );
}

export default ContestentCard;
