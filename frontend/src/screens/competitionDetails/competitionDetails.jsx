import { View, Text, TouchableOpacity, Image, ImageBackground } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useCompetitions } from "../../context/CompetitionsContext.jsx";
import CompetitionTopTabs from "./tabs/competitionTopTabs.jsx";
import { styles } from "./competitionDetails.style.js";

const STATUS_LABELS = {
    ongoing: 'Em andamento',
    closed: 'Encerrada',
};

function CompetitionDetails() {
    const navigation = useNavigation();
    const route = useRoute();
    const { competitions } = useCompetitions();

    const competition = competitions.find((c) => c.id === route.params?.competitionId);

    if (!competition) {
        return (
            <View style={styles.notFoundContainer}>
                <Text style={styles.notFoundText}>Competição não encontrada.</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.notFoundLink}>Voltar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ImageBackground 
                source={require('../../../assets/background-partida.jpg')}
                resizeMode="cover"
                style={styles.banner}
            >
                <View style={styles.bannerOverlay} />

                <View style={styles.bannerHeader}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.bannerHeaderTitle} numberOfLines={1}>{competition.name}</Text>
                    <TouchableOpacity onPress={() => console.log('Configurações da competição')}>
                        <Ionicons name="settings-outline" size={22} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.bannerContent}>
                    {competition.coverImage && (
                        <Image source={{ uri: competition.coverImage }} style={styles.bannerLogo} />
                    )}
                    <Text style={styles.bannerDates}>
                        {competition.startDate} - {competition.endDate}
                    </Text>
                    <View style={styles.statusBadge}>
                        <Text style={styles.statusBadgeText}>
                            {STATUS_LABELS[competition.status] ?? 'Em andamento'}
                        </Text>
                    </View>
                </View>
            </ImageBackground>

            <CompetitionTopTabs route={route} />
        </View>
    );
}

export default CompetitionDetails;