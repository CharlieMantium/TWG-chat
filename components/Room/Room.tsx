import React, { useEffect, useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useQuery, useMutation } from '@apollo/client';
import uniqBy from 'lodash/uniqBy';

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
  const [ isDataLoaded, setIsDataLoaded ] = useState(false);
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

  useEffect(()=> {
    if (data) {
      setMessages(data.room.messages.map(
      ({ id, body, insertedAt, user }: Message) => ({
        _id: id,
        text: body,
        createdAt: insertedAt,
        user: {
          _id: user.id,
          name: `${user.firstName} ${user.lastName}`,
        }
      })) as IMessage[]);
      setIsDataLoaded(true);
    }
  }, [data]);

  useEffect(() => {
    const subscribeToNewMessages = () => subscribeToMore({
      document: SUBSCRIBE_FOR_MESSAGES,
      variables: { room: id },
      updateQuery: (prev, { subscriptionData }) => {
        const newMessageID = subscriptionData.data.messageAdded.id;
        const isNewMessageAlreadyIn = !!prev.room.messages.filter((message: Message) => 
          message.id === newMessageID
        ).length;
        if (!subscriptionData.data.messageAdded || isNewMessageAlreadyIn) return prev;
        const newMessage = subscriptionData.data.messageAdded;
        return {
          room: {
            ...prev.room,
            messages: [newMessage, ...prev.room.messages],
          }
        }
      },
    });

    if (data && isDataLoaded) subscribeToNewMessages();

    return subscribeToNewMessages();
  }, [isDataLoaded]);

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
