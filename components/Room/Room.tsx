import React from 'react';
import styled from 'styled-components/native';
import { View, Button, Text } from 'react-native';
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

interface RoomProps {
  navigation: RoomScreenNavigationProp;
  route: RoomScreenRouteProp;
};

const Room: React.FC<RoomProps> = ({ route, navigation }) => {
  const { name, id } = route.params;
  const { loading, data } = useQuery(GET_MESSAGES, {
    variables: { room: id },
  });

  return (
    <RoomWrapper>
      <Text>{name} : {id}</Text>
      <Button title="Go to selection" onPress={() => navigation.navigate('Selection')}/>
      {loading && (<Text>Loading...</Text>)}
      {data && data.room.messages.reverse().map(({body, id}: {body: string, id: string}) => (
        <Text key={id}>{body}</Text>
      ))}
    </RoomWrapper>
    );
};

export default Room;
