import { View } from 'react-native';

import { useFonts } from "expo-font";

import {
  Rajdhani_500Medium,
  Rajdhani_600SemiBold,
  Rajdhani_700Bold,
} from "@expo-google-fonts/rajdhani";

import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";

import SplashScreen from './src/screens/splash/splash.jsx';
import Login from './src/screens/login/login.jsx';
import Register from './src/screens/register/register.jsx';

export default function App() {

  const [fontsLoaded] = useFonts({
    Rajdhani_500Medium,
    Rajdhani_600SemiBold,
    Rajdhani_700Bold,

    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
  });

  if (!fontsLoaded) {
    return <SplashScreen/> ;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* <SplashScreen/> */}
      {/* <Login/> */}
      <Register/>
    </View>
  );
}