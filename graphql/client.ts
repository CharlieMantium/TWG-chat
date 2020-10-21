import { ApolloClient } from "@apollo/client";
import { getMainDefinition } from '@apollo/client/utilities';
import { split } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";

import { authedHttpLink } from './http';
import { websocketLink } from './websocket';

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  // @ts-ignore
  websocketLink,
  authedHttpLink
);

const cache = new InMemoryCache();

export const client = new ApolloClient({
  // @ts-ignore
  link,
  // @ts-ignore
  cache
});
