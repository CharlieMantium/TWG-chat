import React from 'react';
import styled from 'styled-components/native';
import { View, Button } from 'react-native';

import { RoomScreenNavigationProp } from '../../types/types';
import {colors} from '../../styles/base';

const RoomWrapper = styled(View)`
  margin: 10px auto;
  padding: 10px 0;
  border: 1px solid ${colors.beta};
`;

interface RoomProps {
  navigation: RoomScreenNavigationProp;
  title: string;
};

const Room: React.FC<RoomProps> = ({ navigation }) => (
  <RoomWrapper>
    <Button title="Go to selection" onPress={() => navigation.navigate('Selection')}/>
  </RoomWrapper>
);

export default Room;
