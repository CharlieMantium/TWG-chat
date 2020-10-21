import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { client } from './graphql/client';


import { RootStackParamList } from './types/types';
import RoomSelection from './components/RoomSelection/RoomSelection';
import Room from './components/Room/Room';

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Selection">
            <Stack.Screen
              name="Selection"
              component={RoomSelection}
              options={{ title: 'Chatly Rooms' }}
            />
            <Stack.Screen name="Room" component={Room} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
    </ApolloProvider>
  )
};

export default App;
