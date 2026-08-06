import { useState, useMemo } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useCompetitions } from "../../context/CompetitionsContext.jsx";
import { styles } from "./competitions.style.js";

const FILTERS = [
    { label: 'Todas', value: 'all' },
    { label: 'Em andamento', value: 'ongoing' },
    { label: 'Encerradas', value: 'closed' },
];

function CompetitionCard({ competition, onPress }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.cardIconContainer}>
                {competition.coverImage ? (
                    <Image source={{ uri: competition.coverImage }} style={styles.cardImage} />
                ) : (
                    <Ionicons name="shield" size={28} color="#2E9E44" />
                )}
            </View>

            <View style={styles.cardContent}>
                <View style={styles.cardTopRow}>
                    <Text style={styles.cardTitle} numberOfLines={1}>{competition.name}</Text>
                    <Text style={styles.cardTeamsCount}>{competition.teams?.length ?? 0}{'\n'}equipes</Text>
                </View>
                <Text style={styles.cardDates}>{competition.startDate} - {competition.endDate}</Text>
                <Text style={styles.cardRound}>
                    Rodada {competition.currentRound ?? 1} de {competition.calculatedRounds ?? '—'}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

function Competitions() {
    const navigation = useNavigation();
    const { competitions } = useCompetitions();

    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState('ongoing');

    const filteredCompetitions = useMemo(() => {
        return competitions.filter((competition) => {
            const matchesSearch = competition.name
                ?.toLowerCase()
                .includes(search.toLowerCase());

            const matchesFilter = activeFilter === 'all' || competition.status === activeFilter;

            return matchesSearch && matchesFilter;
        });
    }, [competitions, search, activeFilter]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Competições</Text>
                <TouchableOpacity onPress={() => navigation.navigate('CreateCompetitionStep1')}>
                    <Ionicons name="add" size={26} color="#2E9E44" />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <Ionicons name="search" size={18} color="#999" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar competições..."
                    placeholderTextColor="#999"
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

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

            <FlatList
                data={filteredCompetitions}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <CompetitionCard 
                        competition={item} 
                        onPress={() => navigation.navigate('CompetitionDetails', { competitionId: item.id })}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="trophy-outline" size={40} color="#ccc" />
                        <Text style={styles.emptyText}>Nenhuma competição encontrada</Text>
                    </View>
                }
            />
        </View>
    );
}

export default Competitions;