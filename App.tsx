import { AuthContext } from '@/contexts/AuthContext';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'react-native';

import { Loading } from '@/components/Loading';
import { Routes } from '@/routes';
import { THEME } from './src/theme';



export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
       <AuthContext.Provider value={{
        id: '1',
        name: 'Caroline Vieira',
        email: 'caroline@email.com',
        avatar: 'caroline.png'
      }}>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContext.Provider>
    </NativeBaseProvider>
  );
}