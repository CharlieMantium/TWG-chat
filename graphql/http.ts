import { createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { url, token } from './credentials';

const httpLink = createHttpLink({
  uri: url,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    }
  };
});

export const authedHttpLink = authLink.concat(httpLink);
