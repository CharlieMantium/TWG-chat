import { gql } from "@apollo/client";

export const SEND_MESSAGE = gql`
  mutation (
    $message: String!,
    $roomID: String!,
  ) {
    sendMessage(
      body: $message,
      roomId: $roomID
    ){
      body,
      id,
      insertedAt:,
      user {
        id,
        firstName,
        lastName,
        email,
        role
      }
    }
  }
`;
