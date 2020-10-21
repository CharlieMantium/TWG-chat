import * as AbsintheSocket from "@absinthe/socket";
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
import { Socket as PhoenixSocket } from "phoenix";

import { wsUrl, token } from './credentials';

const phoenixSocket = new PhoenixSocket(
  wsUrl, 
  {
    params: { 
      token,
    },
  }
);

const absintheSocket = AbsintheSocket.create(phoenixSocket);

export const websocketLink = createAbsintheSocketLink(absintheSocket);
