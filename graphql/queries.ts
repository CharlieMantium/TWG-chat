import { gql } from "@apollo/client";

export const GET_ROOMS = gql`
  {
    usersRooms {
      rooms {
        id
        name
      }
    }
  }
`;

export const GET_MESSAGES = gql`
  query (
    $room: ID!
  ) {
    room(id: $room) {
      id,
      name
      user {
        id
        firstName
        lastName
        email
        role
      }
      messages {
        body,
        id,
        insertedAt,
        user {
          id
          firstName
          lastName
          email
          role
        }
      }
    }
  }
`;
