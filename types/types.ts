import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Selection: undefined;
  Room: undefined;
};

export type RoomSelectionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Selection'
>;

export type RoomScreenNavigationProp = StackNavigationProp<
RootStackParamList,
'Room'
>;
