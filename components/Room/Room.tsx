import React, { useState } from 'react';
import styled from 'styled-components/native';
import {
  View,
  Button,
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData
} from 'react-native';
import { useQuery, useMutation } from '@apollo/client';

import { RoomScreenNavigationProp } from '../../types/types';
import { RoomScreenRouteProp } from '../../types/types';
import { GET_MESSAGES } from '../../graphql/queries';
import { SEND_MESSAGE } from '../../graphql/mutations';
import { colors } from '../../styles/base';

const RoomWrapper = styled(View)`
  margin: 10px auto;
  padding: 10px 0;
  border: 1px solid ${colors.beta};
`;

const MessageInputWrapper = styled(View)``;

const MessageInput = styled(TextInput)`
  height: 40px;
  border: 1px solid black;
`;

interface RoomProps {
  navigation: RoomScreenNavigationProp;
  route: RoomScreenRouteProp;
};

const Room: React.FC<RoomProps> = ({ route, navigation }) => {
  const { name, id } = route.params;
  const [ message, setMessage ] = useState('');
  const { loading, data } = useQuery(GET_MESSAGES, {
    variables: { room: id },
  });
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const onInputChange = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => 
    setMessage(e.nativeEvent.text);

  const onButtonClick = () => {
    if (message.length) sendMessage({
      variables: {
        message,
        roomID: id,
      },
    });
  };

  return (
    <RoomWrapper>
      <Text>{name} : {id}</Text>
      <Button title="Go to selection" onPress={() => navigation.navigate('Selection')}/>
      {loading && (<Text>Loading...</Text>)}
      {data && data.room.messages.map(({body, id}: {body: string, id: string}) => (
        <Text key={id}>{body}</Text>
      ))}
      <MessageInputWrapper>
        <MessageInput value={message} onChange={onInputChange}/>
        <Button title="Send" onPress={onButtonClick} />
      </MessageInputWrapper>
    </RoomWrapper>
    );
};

export default Room;
