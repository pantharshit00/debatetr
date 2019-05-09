import React, { useContext, useState } from 'react';
import { ChatFeed, Message } from 'react-chat-ui';
import { makeStyles } from '@material-ui/core/styles';
import Spinner from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import gql from 'graphql-tag';
import { useSubscription, useMutation } from 'react-apollo-hooks';
import InputForm from '../InputForm';
import { UserContext } from '../MainView';

export const useStyles = makeStyles({
  chat: {
    padding: '1rem',
  },
});

const CHAT_SUBSCRIPTION = gql`
  subscription {
    chat(order_by: { timestamp: asc }) {
      id
      text
      timestamp
      user {
        id
        name
      }
    }
  }
`;

const CREATE_MESSAGE_MUTATION = gql`
  mutation sendMessage($message: String!, $user: uuid!) {
    insert_chat(objects: { text: $message, user_id: $user }) {
      returning {
        id
        text
      }
    }
  }
`;

export default function Chat() {
  const classes = useStyles();
  const [user] = useContext(UserContext);
  const [message, setMessage] = useState('');
  const { data, loading, error } = useSubscription(CHAT_SUBSCRIPTION);
  const sendMessage = useMutation(CREATE_MESSAGE_MUTATION, {
    variables: {
      message,
      user: (user && user.id) || null,
    },
  });
  if (loading) return <Spinner />;

  if (error) return <div> Something got fucked, please refresh this page</div>;
  return (
    <Paper className={classes.chat}>
      <ChatFeed
        maxHeight={600}
        showSenderName
        messages={data.chat.map(
          item =>
            new Message({
              id: (user && user.id) === item.user.id ? 0 : item.user.id,
              senderName: item.user.name,
              message: item.text,
            })
        )} // Boolean: list of message objects
      />
      {user && (
        <InputForm
          disabled={!user}
          value={message}
          setValue={setMessage}
          onSubmit={async e => {
            e.preventDefault();
            await sendMessage();
            setMessage('');
          }}
          label={`Chat as ${user.name}`}
        />
      )}
    </Paper>
  );
}
