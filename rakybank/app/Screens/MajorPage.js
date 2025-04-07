import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import HomePage from '../Pages/HomePage';

const Tab = createBottomTabNavigator();

export default function MajorPage() {
  return (

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home-outline';
            } else if (route.name === 'Text1') {
              iconName = 'archive-outline';
            } else if (route.name === 'Text2') {
              iconName = 'car-outline';
            } else if (route.name === 'Text3') {
              iconName = 'grid-outline';
            } else {
              iconName = 'clipboard-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name='Text1' component={HomePage} options={{ headerShown: false }} />
        <Tab.Screen name='Text2' component={HomePage} options={{ headerShown: false }} />
        <Tab.Screen name='Text3' component={HomePage} options={{ headerShown: false }} />
        <Tab.Screen name='Text4' component={HomePage} options={{ headerShown: false }} />
      </Tab.Navigator>
   
  );
}
