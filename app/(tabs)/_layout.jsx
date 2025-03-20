import { Tabs } from "expo-router";
import React from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TabLayout = () => {
  return (
  
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: '#8E8E93',
    }}>
      <Tabs.Screen 
        name="home" 
        options={{ 
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="SkillLearningScreen" 
        options={{ 
          title: "Learn",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="school" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="CommunityScreen" 
        options={{ 
          title: "Community",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="MarketplaceScreen" 
        options={{ 
          title: "Marketplace",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="store" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="EmergencyScreen" 
        options={{ 
          title: "Emergency",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="phone-alert" size={size} color={color} />
          ),
        }} 
      />
    </Tabs>
  );
};

export default TabLayout;
