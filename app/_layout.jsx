import { Stack } from 'expo-router';
import 'react-native-reanimated';
import '../global.css';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="nextPage" options={{ title: 'Recipe Details' }} />
    </Stack>
  );
}
