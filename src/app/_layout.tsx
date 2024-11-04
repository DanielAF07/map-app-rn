import PermissionsChecker from "@/presentation/providers/PermissionsChecker";
import { Stack } from "expo-router";
import { setStatusBarStyle } from 'expo-status-bar';
import { useEffect } from "react";

export default function RootLayout() {

  useEffect(() => {
    setTimeout(() => {
      setStatusBarStyle('dark')
    }, 0)
  }, [])

  return (
    <PermissionsChecker>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: 'white'
          }
        }}
        initialRouteName="loading"
        >
        <Stack.Screen name='loading' />
        <Stack.Screen name='map' />
        <Stack.Screen name='permissions' />
      </Stack>
    </PermissionsChecker>
  );
}
