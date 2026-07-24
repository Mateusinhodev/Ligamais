import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator } from 'react-native';

import { ProfileFormProvider } from '../context/ProfileFormContext.jsx';
import { AuthProvider, useAuth } from '../context/AuthContext.jsx';

import Splash from '../screens/splash/splash.jsx';
import Login from '../screens/login/login.jsx';
import Register from '../screens/register/register.jsx';
import CreateProfileStep1 from '../screens/createProfile/step1/step1.jsx';
import CreateProfileStep2 from '../screens/createProfile/step2/step2.jsx';
import Tabs from './tabs.jsx';
import theme from '../constants/theme.js';

const Stack = createNativeStackNavigator();

function AppNavigator() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    return (
        <Stack.Navigator 
            initialRouteName={user ? 'Home' : 'Splash'}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="CreateProfileStep1" component={CreateProfileStep1} />
            <Stack.Screen name="CreateProfileStep2" component={CreateProfileStep2} />
            <Stack.Screen name="Home" component={Tabs} />
        </Stack.Navigator>
    );
}

function Routes() {
    return (
        <AuthProvider>
            <ProfileFormProvider>
                <NavigationContainer>
                    <AppNavigator />
                </NavigationContainer>
            </ProfileFormProvider>
        </AuthProvider>
    );
}

export default Routes;