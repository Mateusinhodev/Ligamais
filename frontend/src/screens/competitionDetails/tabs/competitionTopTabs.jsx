import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../../constants/theme.js";
import ResumoTab from "./resumoTab.jsx";
import EquipesTab from "./equipesTab.jsx";
import PlaceholderTab from "./placeholderTab.jsx";
import MatchesTab from "./matchesTab.jsx";
import StandingsTab from "./StandingsTab.jsx";

const TopTabs = createMaterialTopTabNavigator();

function tabIcon(iconName) {
    return ({ color }) => <Ionicons name={iconName} size={18} color={color} />;
}

function CompetitionTopTabs({ route }) {
    const initialParams = { competitionId: route.params?.competitionId };

    return (
        <TopTabs.Navigator
            initialRouteName="Resumo"
            screenOptions={{
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.textSecondary,
                tabBarIndicatorStyle: { backgroundColor: theme.colors.primary },
                tabBarStyle: { backgroundColor: theme.colors.surface },
                tabBarLabelStyle: { 
                    fontFamily: theme.fonts.medium, 
                    fontSize: 12, 
                    textTransform: 'none' 
                },
                tabBarScrollEnabled: true,
                tabBarItemStyle: { width: 'auto', paddingHorizontal: theme.spacing.md },
            }}
        >
            <TopTabs.Screen 
                name="Resumo" 
                component={ResumoTab} 
                initialParams={initialParams}
                options={{ tabBarIcon: tabIcon('home') }}
            />
            <TopTabs.Screen 
                name="Jogos" 
                component={MatchesTab} 
                initialParams={initialParams}
                options={{ tabBarIcon: tabIcon('calendar-outline') }}
            />
            <TopTabs.Screen 
                name="Classificação" 
                component={StandingsTab} 
                initialParams={initialParams}
                options={{ tabBarIcon: tabIcon('list-outline') }}
            />
            <TopTabs.Screen 
                name="Artilharia" 
                component={PlaceholderTab} 
                options={{ tabBarIcon: tabIcon('football-outline') }}
            />
            <TopTabs.Screen 
                name="Equipes" 
                component={EquipesTab} 
                initialParams={initialParams}
                options={{ tabBarIcon: tabIcon('people-outline') }}
            />
        </TopTabs.Navigator>
    );
}

export default CompetitionTopTabs;