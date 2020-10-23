import React, { useEffect, useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useQuery, useMutation } from '@apollo/client';

import { RoomScreenNavigationProp, Message } from '../../types/types';
import { RoomScreenRouteProp } from '../../types/types';
import { user } from '../../graphql/credentials';
import { GET_MESSAGES } from '../../graphql/queries';
import { SEND_MESSAGE } from '../../graphql/mutations';
import { SUBSCRIBE_FOR_MESSAGES } from '../../graphql/subscriptions';

interface RoomProps {
  navigation: RoomScreenNavigationProp;
  route: RoomScreenRouteProp;
};

const Room: React.FC<RoomProps> = ({ route }) => {
  const { id } = route.params;
  const [ messages, setMessages ] = useState<IMessage[]>([]);
  const { data, subscribeToMore } = useQuery(GET_MESSAGES, {
    variables: { room: id },
  });
  const [ sendMessage ] = useMutation(SEND_MESSAGE);

  const handleSend = (newMessage: IMessage[]) => {
    sendMessage({
      variables: {
        message: newMessage[0].text,
        roomID: id,
      },
    });
  };

  const subscribeToNewMessages = () => subscribeToMore({
    document: SUBSCRIBE_FOR_MESSAGES,
    variables: { room: id },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const newMessage = subscriptionData.data.messageAdded;
      return {
        room: {
          ...prev.room,
          messages: [newMessage, ...prev.room.messages],
        }
      }
    },
  });

  useEffect(()=> {
    if (data) setMessages(data.room.messages.map(
      ({ id, body, insertedAt, user }: Message) => ({
        _id: id,
        text: body,
        createdAt: insertedAt,
        user: {
          _id: user.id,
          name: `${user.firstName} ${user.lastName}`,
        }
      })) as IMessage[])
  }, [data]);

  useEffect(() => {
    if (data) subscribeToNewMessages();
  }, [data]);

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessage => handleSend(newMessage)}
      user={{
        _id: user.id,
        name: `${user.firstName} ${user.lastName}`
      }}
    />
  );
}

export default Room;
