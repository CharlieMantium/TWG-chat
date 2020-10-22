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

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

export interface Message {
  body: string;
  id: string;
  insertedAt: string;
  user: User;
};

export interface Messages {
  id: string;
  name: string;
  user: User;
  messages: Message[];
};

export interface Room {
  id: string;
  name: string;
}
