import React from 'react';
import styled from 'styled-components/native';
import { View, Button, Text } from 'react-native';
import { useQuery } from '@apollo/client';

import {GET_ROOMS} from '../../graphql/queries';
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

const Room: React.FC<RoomProps> = ({ navigation }) => {
  const { loading, error, data } = useQuery(GET_ROOMS);
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  return data.usersRooms.rooms.map(({ name, id }: {name: string, id: string}) => (
    <View key={id}>
      <Text>
        {id}: {name}
      </Text>
    </View>
  ));
};

export default Room;
