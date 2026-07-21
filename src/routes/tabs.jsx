import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from '../screens/home/home.jsx';
import Competitions from '../screens/competitions/competitions.jsx';
import Profile from '../screens/profile/profile.jsx';
import theme from '../constants/theme.js';

const Tab = createBottomTabNavigator();

function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.textSecondary,
                tabBarStyle: {
                    height: 70,
                    paddingBottom: 10,
                    paddingTop: 8,
                    backgroundColor: theme.colors.surface,
                    borderTopColor: theme.colors.border,
                },
                tabBarLabelStyle: {
                    fontFamily: theme.fonts.medium,
                    fontSize: 12,
                },
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Home') iconName = 'home';
                    if (route.name === 'Competitions') iconName = 'trophy-outline';
                    if (route.name === 'Profile') iconName = 'person-outline';

                    return <Ionicons name={iconName} size={size ?? 22} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: 'Início' }} />
            <Tab.Screen name="Competitions" component={Competitions} options={{ tabBarLabel: 'Competições' }} />
            <Tab.Screen name="Profile" component={Profile} options={{ tabBarLabel: 'Perfil' }} />
        </Tab.Navigator>
    );
}

export default Tabs;