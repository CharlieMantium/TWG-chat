import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { RootStackParamList } from '../../types/types';

import RoomSelection from '../RoomSelection/RoomSelection';
import Room from '../Room/Room';

const Stack = createStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Selection">
        <Stack.Screen
          name="Selection"
          component={RoomSelection}
          options={{ title: 'Chatly Rooms' }}
        />
        <Stack.Screen
          name="Room"
          component={Room}
          options={({ route }) => ({
            title: route.params.name,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
