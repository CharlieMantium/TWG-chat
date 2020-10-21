import React from 'react';
import styled from 'styled-components/native';
import { View, Button, Text } from 'react-native';

import { RoomScreenNavigationProp } from '../../types/types';
import { RoomScreenRouteProp } from '../../types/types';
import { colors } from '../../styles/base';

const RoomWrapper = styled(View)`
  margin: 10px auto;
  padding: 10px 0;
  border: 1px solid ${colors.beta};
`;

interface RoomProps {
  navigation: RoomScreenNavigationProp;
  route: RoomScreenRouteProp;
  title: string;
};

const Room: React.FC<RoomProps> = ({ route, navigation }) => {
  const { name, id } = route.params;
  return (
    <RoomWrapper>
      <Text>{name} : {id}</Text>
      <Button title="Go to selection" onPress={() => navigation.navigate('Selection')}/>
    </RoomWrapper>
    );
};

export default Room;
