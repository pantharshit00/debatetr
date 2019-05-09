import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import InputForm from '../InputForm';

const SEND_DEBATE_MUTATAION = gql`
  mutation sendMessage($message: String!, $user: uuid!) {
    insert_debate(objects: { text: $message, debate_user: $user }) {
      returning {
        id
        text
      }
    }
  }
`;

export default function Debator({ user }) {
  const [message, setMessage] = useState('');
  const sendMessage = useMutation(SEND_DEBATE_MUTATAION, {
    variables: {
      message,
      user: (user && user.id) || null,
    },
  });
  return (
    <InputForm
      disabled={!user}
      value={message}
      setValue={setMessage}
      onSubmit={async e => {
        e.preventDefault();
        await sendMessage();
        setMessage('');
      }}
      label={`Type here to debate as ${user.name}`}
    />
  );
}
