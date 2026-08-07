import { View, Text, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useCompetitions } from "../../../context/CompetitionsContext.jsx";
import TeamBadge from "../../../components/TeamBadge/TeamBadge.jsx";
import { styles } from "./resumoTab.style.js";

function ResumoTab() {
    const route = useRoute();
    const { competitions } = useCompetitions();

    const competition = competitions.find((c) => c.id === route.params?.competitionId);

    if (!competition) return null;

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
        <ScrollView 
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
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
                        <TeamBadge color={nextMatch.teamOne.colorHex} size={40} />
                        <Text style={styles.matchTeamName}>{nextMatch.teamOne.name}</Text>
                    </View>

                    <View style={styles.matchInfoColumn}>
                        <Text style={styles.matchRound}>Rodada {nextMatch.round}</Text>
                        <Text style={styles.matchDateTime}>{nextMatch.date} - {nextMatch.time}</Text>
                        <Text style={styles.matchLocation}>{nextMatch.location}</Text>
                    </View>

                    <View style={styles.matchTeamColumn}>
                        <TeamBadge color={nextMatch.teamTwo.colorHex} size={40} />
                        <Text style={styles.matchTeamName}>{nextMatch.teamTwo.name}</Text>
                    </View>
                </View>
            ) : (
                <Text style={styles.emptyText}>Nenhum jogo agendado ainda.</Text>
            )}
        </ScrollView>
    );
}

export default ResumoTab;