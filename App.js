import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import StatsScreen from './screens/StatsScreen';
import MotivationScreen from './screens/MotivationScreen';
import CommunityScreen from './screens/CommunityScreen';
import AddictionSelectionScreen from './screens/AddictionSelectionScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AddictionSelection" component={AddictionSelectionScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Stats" component={StatsScreen} />
        <Stack.Screen name="Motivation" component={MotivationScreen} />
        <Stack.Screen name="Community" component={CommunityScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
