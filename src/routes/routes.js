import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ProfileFormProvider } from '../context/ProfileFormContext.jsx';

import Splash from '../screens/splash/splash.jsx';
import Login from '../screens/login/login.jsx';
import Register from '../screens/register/register.jsx';
import CreateProfileStep1 from '../screens/createProfile/step1/step1.jsx';
import CreateProfileStep2 from '../screens/createProfile/step2/step2.jsx';
import Tabs from './tabs.jsx';

const Stack = createNativeStackNavigator();

function Routes() {
    return (
        <ProfileFormProvider>
            <NavigationContainer>
                <Stack.Navigator 
                    initialRouteName="Splash"
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen name="Splash" component={Splash} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen name="CreateProfileStep1" component={CreateProfileStep1} />
                    <Stack.Screen name="CreateProfileStep2" component={CreateProfileStep2} />
                    <Stack.Screen name="Home" component={Tabs} />
                </Stack.Navigator>
            </NavigationContainer>
        </ProfileFormProvider>
    );
}

export default Routes;