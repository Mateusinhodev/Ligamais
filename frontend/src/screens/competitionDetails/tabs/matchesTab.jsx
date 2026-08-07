import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useCompetitions } from "../../../context/CompetitionsContext.jsx";
import TeamBadge from "../../../components/TeamBadge/TeamBadge.jsx";
import { styles } from "./matchesTab.style.js";

const FILTERS = [
    { label: 'Todos', value: 'all' },
    { label: 'Agendados', value: 'scheduled' },
    { label: 'Realizados', value: 'completed' },
];

function MatchCard({ match }) {
    const isCompleted = match.status === 'completed';

    return (
        <View style={styles.matchCard}>
            <Text style={styles.matchRound}>Rodada {match.round}</Text>

            <View style={styles.matchRow}>
                <View style={styles.matchTeamColumn}>
                    <TeamBadge color={match.teamOne.colorHex} size={40} />
                    <Text style={styles.matchTeamName}>{match.teamOne.name}</Text>
                </View>

                <View style={styles.matchCenter}>
                    {isCompleted ? (
                        <Text style={styles.matchScore}>
                            {match.scoreOne} x {match.scoreTwo}
                        </Text>
                    ) : (
                        <Text style={styles.matchVs}>x</Text>
                    )}
                </View>

                <View style={styles.matchTeamColumn}>
                    <TeamBadge color={match.teamTwo.colorHex} size={40} />
                    <Text style={styles.matchTeamName}>{match.teamTwo.name}</Text>
                </View>
            </View>

            <Text style={styles.matchInfo}>{match.date} - {match.time}</Text>
            <Text style={styles.matchInfo}>{match.location}</Text>

            {!isCompleted && (
                <View style={styles.scheduledBadge}>
                    <Text style={styles.scheduledBadgeText}>Agendada</Text>
                </View>
            )}
        </View>
    );
}

function MatchesTab() {
    const route = useRoute();
    const { competitions } = useCompetitions();
    const [activeFilter, setActiveFilter] = useState('all');

    const competition = competitions.find((c) => c.id === route.params?.competitionId);

    if (!competition) return null;

    // TODO: substituir por jogos reais gerados pelo RoundRobinService do
    // backend. Cada jogo deve ter o formato:
    // { id, round, teamOne, teamTwo, date, time, location,
    //   status: 'scheduled' | 'completed', scoreOne, scoreTwo }
    const matches = competition.matches ?? [];

    const filteredMatches = matches.filter((match) => {
        if (activeFilter === 'all') return true;
        return match.status === activeFilter;
    });

    return (
        <View style={styles.container}>
            <View style={styles.filterRow}>
                {FILTERS.map((filter) => (
                    <TouchableOpacity
                        key={filter.value}
                        style={styles.filterTab}
                        onPress={() => setActiveFilter(filter.value)}
                    >
                        <Text 
                            style={[
                                styles.filterText,
                                activeFilter === filter.value && styles.filterTextActive,
                            ]}
                        >
                            {filter.label}
                        </Text>
                        {activeFilter === filter.value && <View style={styles.filterUnderline} />}
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView 
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {filteredMatches.length ? (
                    filteredMatches.map((match) => <MatchCard key={match.id} match={match} />)
                ) : (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="calendar-outline" size={36} color="#ccc" />
                        <Text style={styles.emptyText}>
                            O calendário de jogos ainda não foi gerado.
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

export default MatchesTab;