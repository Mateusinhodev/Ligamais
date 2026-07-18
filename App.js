import { View } from 'react-native';
// import SplashScreen from './src/screens/splash/splash.jsx';
import Login from './src/screens/login/login.jsx';
import Register from './src/screens/register/register.jsx';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      {/* <SplashScreen/> */}
      {/* <Login/> */}
      <Register/>
    </View>
  );
}