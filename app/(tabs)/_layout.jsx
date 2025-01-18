import React from 'react';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Recipes',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="restaurant" size={size} color={color} />  // Example icon
          ),
        }}
      />
    </Tabs>
  );
}
