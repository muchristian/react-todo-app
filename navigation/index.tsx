/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import HomeScreen from '../screens/HomeScreen';
import TaskScreen from '../screens/TaskScreen';
import NewTaskScreen from '../screens/NewTaskScreen';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * @return {boolean} false 
 * hidding the header on 
 * navigation screens
 */
const headerShown = false;

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="TaskScreen" component={TaskScreen} />
        <Stack.Screen name="NewTaskScreen" component={NewTaskScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
