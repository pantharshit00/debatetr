import React from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
// Setup the network "links"
import ApolloClient from 'apollo-client';
// Setup the network "links"
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import CssBaseline from '@material-ui/core/CssBaseline';

import MainView from './components/MainView';

import 'typeface-roboto';

const wsurl = 'wss://debatetr.herokuapp.com/v1alpha1/graphql';
const httpurl = 'https://debatetr.herokuapp.com/v1alpha1/graphql';

const wsLink = new WebSocketLink({
  uri: wsurl,
  options: {
    reconnect: true,
  },
});
const httpLink = new HttpLink({
  uri: httpurl,
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      <MainView />
    </ApolloProvider>
  );
}

export default App;
