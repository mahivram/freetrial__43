import { Stack } from "expo-router";

const ScreenLayout = () => {
  return ( 
    
    <Stack
    screenOptions={{ headerShown: true }}>
    
    <Stack.Screen
      name="page2"
      options={{ title: "Page 2", headerTitleAlign: "center" }}
    />
    <Stack.Screen
      name="page3"
      options={{ title: "Page 2", headerTitleAlign: "center" }}
    />
    <Stack.Screen
      name="page4"
      options={{ title: "Page 2", headerTitleAlign: "center" }}
    />
  </Stack>

  );
};

export default ScreenLayout;
