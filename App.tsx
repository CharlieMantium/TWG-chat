import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ApolloProvider } from '@apollo/client';

import { client } from './graphql/client';
import Navigation from './components/Navigation/Navigation';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Navigation />
      <StatusBar style="auto" />
    </ApolloProvider>
  )
};

export default App;
