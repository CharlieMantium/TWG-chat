import {ApolloClient, InMemoryCache} from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://chat.thewidlarzgroup.com/api/graphiql',
  cache: new InMemoryCache()
});
