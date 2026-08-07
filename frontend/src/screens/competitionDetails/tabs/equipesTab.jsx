import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useCompetitions } from "../../../context/CompetitionsContext.jsx";
import { styles } from "./equipesTab.style.js";

function EquipesTab() {
    const route = useRoute();
    const { competitions } = useCompetitions();
    const [expandedTeamId, setExpandedTeamId] = useState(null);

    const competition = competitions.find((c) => c.id === route.params?.competitionId);

    if (!competition) return null;

    function toggleExpand(teamId) {
        setExpandedTeamId((current) => (current === teamId ? null : teamId));
    }

    return (
        <ScrollView 
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.sectionTitle}>Equipes e participantes</Text>

            {competition.teams?.length ? (
                competition.teams.map((team) => {
                    const isExpanded = expandedTeamId === team.id;

                    // TODO (fluxo de convite): quando o jogador aceitar o convite
                    // via código/link/QR (gerado no CreateCompetitionStep5), ele
                    // escolherá sua equipe. O admin criador da competição definirá,
                    // entre os participantes de cada equipe:
                    //   - 1 capitão (role: 'captain')
                    //   - 2 admins no total, sendo o capitão um deles (role: 'admin')
                    // Estrutura esperada de cada participante:
                    //   { id, name, role: 'player' | 'admin' | 'captain',
                    //     status: 'active' | 'suspended' | 'pending_yellow' (pendurado) }
                    //
                    // TODO (futuro): exibir nessa mesma aba, por equipe, jogadores
                    // pendurados (acúmulo de cartões) e suspensos — não implementar
                    // agora, aguardando o fluxo de convite existir de verdade.
                    const participants = team.participants ?? [];

                    return (
                        <View key={team.id} style={styles.teamCard}>
                            <TouchableOpacity 
                                style={styles.teamHeader} 
                                onPress={() => toggleExpand(team.id)}
                            >
                                <View style={styles.teamShield}>
                                    <Ionicons name="shield" size={32} color={team.colorHex || '#ccc'} />
                                </View>

                                <View style={styles.teamInfo}>
                                    <Text style={styles.teamName}>{team.name}</Text>
                                    <Text style={styles.teamDetail}>
                                        {participants.length} jogadores
                                    </Text>
                                </View>

                                <Ionicons 
                                    name={isExpanded ? 'chevron-up' : 'chevron-down'} 
                                    size={20} 
                                    color="#999" 
                                />
                            </TouchableOpacity>

                            {isExpanded && (
                                <View style={styles.participantsList}>
                                    {participants.length ? (
                                        participants.map((participant) => (
                                            <View key={participant.id} style={styles.participantRow}>
                                                <Ionicons name="person-circle-outline" size={22} color="#999" />
                                                <Text style={styles.participantName}>{participant.name}</Text>
                                                {participant.role === 'captain' && (
                                                    <View style={styles.roleBadge}>
                                                        <Text style={styles.roleBadgeText}>Capitão</Text>
                                                    </View>
                                                )}
                                                {participant.role === 'admin' && (
                                                    <View style={[styles.roleBadge, styles.roleBadgeAdmin]}>
                                                        <Text style={styles.roleBadgeText}>Admin</Text>
                                                    </View>
                                                )}
                                            </View>
                                        ))
                                    ) : (
                                        <Text style={styles.emptyParticipantsText}>
                                            Nenhum jogador entrou nessa equipe ainda.
                                        </Text>
                                    )}
                                </View>
                            )}
                        </View>
                    );
                })
            ) : (
                <Text style={styles.emptyText}>Nenhuma equipe cadastrada.</Text>
            )}
        </ScrollView>
    );
}

export default EquipesTab;