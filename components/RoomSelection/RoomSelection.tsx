import React from 'react';
import styled from 'styled-components/native';
import { View, Button } from 'react-native';

import { RoomSelectionScreenNavigationProp } from '../../types/types';
import {colors} from '../../styles/base';

const RoomSelectionWrapper = styled(View)`
  margin: 10px auto;
  padding: 10px 0;
  border: 1px solid ${colors.beta};
`;

interface RoomSelectionProps {
  navigation: RoomSelectionScreenNavigationProp;
};

const RoomSelection: React.FC<RoomSelectionProps> = ({ navigation }) => (
  <RoomSelectionWrapper>
    <Button title="Go to room" onPress={() => navigation.navigate('Room')}/>
    <Button title="Go to room" onPress={() => navigation.navigate('Room')}/>
    <Button title="Go to room" onPress={() => navigation.navigate('Room')}/>
  </RoomSelectionWrapper>
);

export default RoomSelection;
