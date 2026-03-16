import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index"                        options={{ headerShown: false }} />
        <Stack.Screen name="screens/onboarding"           options={{ headerShown: false }} />
        <Stack.Screen name="screens/login"                options={{ headerShown: false }} />
        <Stack.Screen name="screens/signup"               options={{ headerShown: false }} />
        <Stack.Screen name="screens/forgot-password"      options={{ headerShown: false }} />
        <Stack.Screen name="screens/otp"                  options={{ headerShown: false }} />
        <Stack.Screen name="screens/new-password"         options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)"                       options={{ headerShown: false }} />
        <Stack.Screen name="modal"                        options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
    </ThemeProvider>
  );
}