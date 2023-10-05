import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

//Import screens
import MapSelecting from '../screens/Learning/MapSelecting1';

const Tab = createBottomTabNavigator();


export default function NavigationBar(props) {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Learning" component={MapSelecting} />
        <Tab.Screen name="Exercise" component={ExcersiseScreen} />
        <Tab.Screen name="Archive" component={ArchiveScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}