import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Selection: undefined;
  Room: { name: string, id: string };
};

export type RoomSelectionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Selection'
>;

export type RoomSelectionScreenRouteProp = RouteProp<
  RootStackParamList,
  'Selection'
>;

export type RoomScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Room'
>;

export type RoomScreenRouteProp = RouteProp<
  RootStackParamList,
  'Room'
>;
