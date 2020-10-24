import { gql } from "@apollo/client";

export const SUBSCRIBE_FOR_MESSAGES = gql`
  subscription ($room: String!) {
    messageAdded(
      roomId: $room
    ) {
      body,
      id,
      insertedAt,
      user {
        email,
        firstName,
        lastName,
        role,
        id,
      }
    }
  }
`;
