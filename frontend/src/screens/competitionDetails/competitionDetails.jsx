import { useState } from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useCompetitions } from "../../context/CompetitionsContext.jsx";
import TeamBadge from "../../components/TeamBadge/TeamBadge.jsx";
import { styles } from "./competitionDetails.style.js";

const TABS = [
    { label: 'Resumo', value: 'summary', icon: 'home' },
    { label: 'Jogos', value: 'matches', icon: 'calendar-outline' },
    { label: 'Classificação', value: 'standings', icon: 'list-outline' },
    { label: 'Artilharia', value: 'scorers', icon: 'football-outline' },
    { label: 'Equipes', value: 'teams', icon: 'people-outline' },
    { label: 'Participantes', value: 'participants', icon: 'person-outline' },
];

const STATUS_LABELS = {
    ongoing: 'Em andamento',
    closed: 'Encerrada',
};

const COLOR_HEX_MAP = {
    blue: '#2F66D5',
    red: '#D93A34',
    green: '#2E9E44',
    yellow: '#D9A520',
    orange: '#E07B2D',
    purple: '#8E44AD',
    black: '#1A1A1A',
    white: '#E5E5E5',
};

function getColorHex(colorValue) {
    return COLOR_HEX_MAP[colorValue] ?? '#ccc';
}

function CompetitionDetails() {
    const navigation = useNavigation();
    const route = useRoute();
    const { competitions } = useCompetitions();

    const [activeTab, setActiveTab] = useState('summary');

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

    const teamOne = competition.teams?.[0];
    const teamTwo = competition.teams?.[1];

    // TODO: substituir por dados reais de jogos quando o backend existir.
    // Por enquanto, usamos a data de início da competição como estimativa
    // da Rodada 1, já que ainda não há um calendário real gerado.
    const completedMatches = 0;
    const nextMatch = teamOne && teamTwo ? {
        round: competition.currentRound ?? 1,
        date: competition.startDate || 'Data a definir',
        time: competition.matchTime || '—',
        location: competition.location || 'Local a definir',
        teamOne,
        teamTwo,
    } : null;

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

            <View style={styles.tabsWrapper}>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.tabsContent}
                >
                    {TABS.map((tab) => (
                        <TouchableOpacity
                            key={tab.value}
                            style={styles.tabItem}
                            onPress={() => setActiveTab(tab.value)}
                        >
                            <Ionicons 
                                name={tab.icon} 
                                size={18} 
                                color={activeTab === tab.value ? '#2E9E44' : '#999'} 
                            />
                            <Text style={[styles.tabText, activeTab === tab.value && styles.tabTextActive]}>
                                {tab.label}
                            </Text>
                            {activeTab === tab.value && <View style={styles.tabUnderline} />}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView 
                style={styles.content}
                contentContainerStyle={styles.contentInner}
                showsVerticalScrollIndicator={false}
            >
                {activeTab === 'summary' ? (
                    <>
                        <Text style={styles.sectionTitle}>Resumo da competição</Text>

                        <View style={styles.statsRow}>
                            <View style={styles.statCard}>
                                <Text style={styles.statValue}>{competition.teams?.length ?? 0}</Text>
                                <Text style={styles.statLabel}>Equipes</Text>
                            </View>
                            <View style={styles.statCard}>
                                <Text style={styles.statValue}>{competition.calculatedRounds ?? 0}</Text>
                                <Text style={styles.statLabel}>Rodadas</Text>
                            </View>
                            <View style={styles.statCard}>
                                <Text style={styles.statValue}>{completedMatches}</Text>
                                <Text style={styles.statLabel}>Jogos realizados</Text>
                            </View>
                        </View>

                        <Text style={styles.sectionTitle}>Próximo jogo</Text>

                        {nextMatch ? (
                            <View style={styles.matchCard}>
                                <View style={styles.matchTeamColumn}>
                                    <TeamBadge color={getColorHex(nextMatch.teamOne.color)} size={40} />
                                    <Text style={styles.matchTeamName}>{nextMatch.teamOne.name}</Text>
                                </View>

                                <View style={styles.matchInfoColumn}>
                                    <Text style={styles.matchRound}>Rodada {nextMatch.round}</Text>
                                    <Text style={styles.matchDateTime}>{nextMatch.date} - {nextMatch.time}</Text>
                                    <Text style={styles.matchLocation}>{nextMatch.location}</Text>
                                </View>

                                <View style={styles.matchTeamColumn}>
                                    <TeamBadge color={getColorHex(nextMatch.teamTwo.color)} size={40} />
                                    <Text style={styles.matchTeamName}>{nextMatch.teamTwo.name}</Text>
                                </View>
                            </View>
                        ) : (
                            <Text style={styles.emptyText}>Nenhum jogo agendado ainda.</Text>
                        )}
                    </>
                ) : (
                    <View style={styles.placeholderContainer}>
                        <Ionicons name="construct-outline" size={36} color="#ccc" />
                        <Text style={styles.placeholderText}>Essa seção estará disponível em breve.</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

export default CompetitionDetails;