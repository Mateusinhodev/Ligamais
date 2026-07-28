import { View, Text, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext.jsx";
import ScreenHeader from "../../components/ScreenHeader/ScreenHeader.jsx";
import { styles } from "./profile.style.js";

const SUMMARY_ITEMS = [
    { key: 'competitions', icon: 'trophy', label: 'Competições disputadas', field: 'competitionsPlayed' },
    { key: 'titles', icon: 'medal', label: 'Títulos conquistados', field: 'titlesWon' },
    { key: 'scorer', icon: 'football', label: 'Artilharias', field: 'topScorerAwards' },
];

function Profile() {
    const navigation = useNavigation();
    const { user } = useAuth();

    const displayName = user?.fullName || user?.nickname || user?.name || 'Jogador';
    const position = user?.fieldPosition || 'Posição não definida';
    const location = user?.city && user?.state ? `${user.city} - ${user.state}` : 'Localização não definida';

    // TODO: substituir por estatísticas reais vindas da API quando o backend existir
    const stats = {
        matches: 0,
        goals: 0,
        average: 0,
        competitionsPlayed: 0,
        titlesWon: 0,
        topScorerAwards: 0,
    };

    return (
        <ScrollView 
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <ScreenHeader 
                title="Meu Perfil" 
                onBack={() => navigation.goBack()}
                rightIcon="create-outline"
                onRightPress={() => console.log('Editar perfil')}
            />

            <View style={styles.profileCard}>
                <View style={styles.avatarCircle}>
                    {user?.photo ? (
                        <Image source={{ uri: user.photo }} style={styles.avatarImage} />
                    ) : (
                        <Ionicons name="person" size={32} color="#fff" />
                    )}
                </View>

                <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>{displayName}</Text>
                    <Text style={styles.profilePosition}>{position}</Text>
                    <Text style={styles.profileLocation}>{location}</Text>
                </View>
            </View>

            <View style={styles.statsCard}>
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Jogos</Text>
                    <Text style={styles.statValue}>{stats.matches}</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Gols</Text>
                    <Text style={styles.statValue}>{stats.goals}</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Média</Text>
                    <Text style={styles.statValue}>{stats.average.toFixed(2)}</Text>
                </View>
            </View>

            <View style={styles.summarySection}>
                <Text style={styles.summaryTitle}>Resumo</Text>

                <View style={styles.summaryCard}>
                    {SUMMARY_ITEMS.map((item, index) => (
                        <View 
                            key={item.key} 
                            style={[
                                styles.summaryRow,
                                index !== SUMMARY_ITEMS.length - 1 && styles.summaryRowBorder,
                            ]}
                        >
                            <View style={styles.summaryIconContainer}>
                                <Ionicons name={item.icon} size={18} color="#2E9E44" />
                            </View>
                            <Text style={styles.summaryLabel}>{item.label}</Text>
                            <Text style={styles.summaryValue}>{stats[item.field]}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

export default Profile;