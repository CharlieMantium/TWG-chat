import React from 'react';
import styled from 'styled-components/native';
import { View, Button, Text } from 'react-native';
import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

import { GET_ROOMS } from '../../graphql/queries';
import { RoomSelectionScreenNavigationProp, Room } from '../../types/types';
import { colors } from '../../styles/base';

const RoomSelectionWrapper = styled(View)`
  margin: 10px auto;
  padding: 10px 0;
  border: 1px solid ${colors.beta};
`;

const RoomSelection: React.FC = () => {
  const navigation = useNavigation<RoomSelectionScreenNavigationProp>();
  const { loading, error, data } = useQuery(GET_ROOMS);

  return (
    <RoomSelectionWrapper>
      {loading && (<Text>Loading...</Text>)}
      {error && (<Text>Error</Text>)}
      {data && data.usersRooms.rooms.map(({name, id}: Room) => (
        <Button 
          key={id} 
          title={`Go to room ${name}`}
          onPress={() => navigation.navigate("Room", {
            name,
            id,
          })}
        />
      ))}
    </RoomSelectionWrapper>
  );
};

export default RoomSelection;
