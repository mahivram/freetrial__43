import { Tabs, Stack } from "expo-router";
import React from "react";

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="tab2" options={{ title: "Tab 2" }} />
    </Tabs>
  );
};

export default TabLayout;
