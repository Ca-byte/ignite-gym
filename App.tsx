import { View, StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { THEME } from '@/theme';
import { Loading } from '@/components/Loading';


export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  return (
    <NativeBaseProvider theme={THEME}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#202024' }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
       />
    { fontsLoaded ? <View /> : <Loading />}
    </View>
    </NativeBaseProvider>
  );
}