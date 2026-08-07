import { View, Text, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useCompetitions } from "../../../context/CompetitionsContext.jsx";
import TeamBadge from "../../../components/TeamBadge/TeamBadge.jsx";
import { styles } from "./standingsTab.style.js";

const LEGEND_ITEMS = [
    { abbr: 'P', label: 'Pontos' },
    { abbr: 'J', label: 'Jogos' },
    { abbr: 'V', label: 'Vitórias' },
    { abbr: 'E', label: 'Empates' },
    { abbr: 'D', label: 'Derrotas' },
    { abbr: 'GP', label: 'Gols Pró' },
    { abbr: 'GC', label: 'Gols Contra' },
    { abbr: 'SG', label: 'Saldo de Gols' },
];

function StandingsTab() {
    const route = useRoute();
    const { competitions } = useCompetitions();

    const competition = competitions.find((c) => c.id === route.params?.competitionId);

    if (!competition) return null;

    // TODO: substituir por classificação real calculada pelo backend a
    // partir dos resultados das partidas. Cada linha deve ter o formato:
    // { teamId, team: { name, colorHex }, points, played, wins, draws,
    //   losses, goalsFor, goalsAgainst, goalDifference }
    // Por enquanto, exibimos as equipes cadastradas com estatísticas
    // zeradas, já que nenhum jogo foi realizado ainda.
    const standings = competition.standings?.length 
        ? competition.standings 
        : (competition.teams ?? []).map((team) => ({
            teamId: team.id,
            team,
            points: 0,
            played: 0,
            wins: 0,
            draws: 0,
            losses: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            goalDifference: 0,
        }));

    return (
        <ScrollView 
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            {standings.length ? (
                <>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View>
                            <View style={styles.headerRow}>
                                <Text style={[styles.headerCell, styles.posCell]}>Pos</Text>
                                <Text style={[styles.headerCell, styles.teamCell]}>Equipe</Text>
                                <Text style={[styles.headerCell, styles.statCell, styles.pointsCell]}>P</Text>
                                <Text style={[styles.headerCell, styles.statCell]}>J</Text>
                                <Text style={[styles.headerCell, styles.statCell]}>V</Text>
                                <Text style={[styles.headerCell, styles.statCell]}>E</Text>
                                <Text style={[styles.headerCell, styles.statCell]}>D</Text>
                                <Text style={[styles.headerCell, styles.statCell]}>GP</Text>
                                <Text style={[styles.headerCell, styles.statCell]}>GC</Text>
                                <Text style={[styles.headerCell, styles.statCell]}>SG</Text>
                            </View>

                            {standings.map((row, index) => (
                                <View key={row.teamId} style={styles.row}>
                                    <Text style={[styles.cell, styles.posCell]}>{index + 1}</Text>

                                    <View style={[styles.teamCell, styles.teamCellRow]}>
                                        <TeamBadge color={row.team.colorHex} size={22} />
                                        <Text style={styles.teamName} numberOfLines={1}>{row.team.name}</Text>
                                    </View>

                                    <Text style={[styles.cell, styles.statCell, styles.pointsCell, styles.pointsText]}>
                                        {row.points}
                                    </Text>
                                    <Text style={[styles.cell, styles.statCell]}>{row.played}</Text>
                                    <Text style={[styles.cell, styles.statCell]}>{row.wins}</Text>
                                    <Text style={[styles.cell, styles.statCell]}>{row.draws}</Text>
                                    <Text style={[styles.cell, styles.statCell]}>{row.losses}</Text>
                                    <Text style={[styles.cell, styles.statCell]}>{row.goalsFor}</Text>
                                    <Text style={[styles.cell, styles.statCell]}>{row.goalsAgainst}</Text>
                                    <Text style={[styles.cell, styles.statCell]}>{row.goalDifference}</Text>
                                </View>
                            ))}
                        </View>
                    </ScrollView>

                    <View style={styles.legendContainer}>
                        {LEGEND_ITEMS.map((item) => (
                            <Text key={item.abbr} style={styles.legendText}>
                                <Text style={styles.legendAbbr}>{item.abbr}: </Text>
                                {item.label}
                            </Text>
                        ))}
                    </View>
                </>
            ) : (
                <View style={styles.emptyContainer}>
                    <Ionicons name="list-outline" size={36} color="#ccc" />
                    <Text style={styles.emptyText}>Nenhuma equipe cadastrada ainda.</Text>
                </View>
            )}
        </ScrollView>
    );
}

export default StandingsTab;