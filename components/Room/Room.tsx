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
import { useQuery } from '@apollo/client';

import { RoomScreenNavigationProp } from '../../types/types';
import { RoomScreenRouteProp } from '../../types/types';
import { GET_MESSAGES } from '../../graphql/queries';
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

  const onMessageChange = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => 
    {setMessage(e.nativeEvent.text)};

  return (
    <RoomWrapper>
      <Text>{name} : {id}</Text>
      <Button title="Go to selection" onPress={() => navigation.navigate('Selection')}/>
      {loading && (<Text>Loading...</Text>)}
      {data && data.room.messages.map(({body, id}: {body: string, id: string}) => (
        <Text key={id}>{body}</Text>
      ))}
      <MessageInputWrapper>
        <MessageInput value={message} onChange={onMessageChange}/>
        <Button title="Send" onPress={() => {console.log(message)}} />
      </MessageInputWrapper>
    </RoomWrapper>
    );
};

export default Room;
