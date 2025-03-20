import { Tabs } from "expo-router";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { colors } from "../theme/colors";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary.main,
        tabBarInactiveTintColor: colors.gray[500],
        tabBarStyle: {
          height: Platform.OS === "ios" ? 88 : 60,
          paddingHorizontal: 16,
          paddingBottom: Platform.OS === "ios" ? 80 : 30,
          paddingTop: 2,
          backgroundColor: colors.common.white,
          borderTopWidth: 1,
          borderTopColor: colors.gray[200],
          elevation: 0,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          paddingBottom: Platform.OS === "ios" ? 0 : 4,
        },
      }}
    >
      <Tabs.Screen
        name="SkillLearningScreen"
        options={{
          title: "Learn",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="school" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="MarketplaceScreen"
        options={{
          title: "Marketplace",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="store" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="CommunityScreen"
        options={{
          title: "Community",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-group"
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="EmergencyScreen"
        options={{
          title: "Emergency",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="phone-alert"
              size={28}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
