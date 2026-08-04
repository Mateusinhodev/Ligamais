import { View, Text, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useCompetitionForm } from "../../../context/CompetitionFormContext.jsx";
import ScreenHeader from "../../../components/ScreenHeader/ScreenHeader.jsx";
import StepperProgress from "../../../components/StepperProgress/StepperProgress.jsx";
import Button from "../../../components/Button/Button.jsx";
import { styles } from "./step4.style.js";

const STEP_LABELS = ['Geral', 'Configuração', 'Equipes', 'Revisão'];

const FORMATO_LABELS = {
    league: 'Pontos Corridos',
    knockout: 'Mata-mata',
    groups_knockout: 'Grupos + Mata-mata',
    home_away: 'Ida e volta',
};

const WEEKDAY_NUMBERS = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };

function formatDate(dateString) {
    return dateString || '—';
}

function parseDate(dateString) {
    if (!dateString) return null;
    const [day, month, year] = dateString.split('/').map(Number);
    if (!day || !month || !year) return null;
    return new Date(year, month - 1, day);
}

// Conta quantas vezes os dias da semana selecionados ocorrem dentro
// do período informado — cada ocorrência vira uma "rodada".
function countMatchDays(startDate, endDate, matchDays) {
    const start = parseDate(startDate);
    const end = parseDate(endDate);
    if (!start || !end || end < start || !matchDays?.length) return 0;

    const selectedNumbers = matchDays.map((day) => WEEKDAY_NUMBERS[day]);
    let count = 0;
    const current = new Date(start);

    while (current <= end) {
        if (selectedNumbers.includes(current.getDay())) count++;
        current.setDate(current.getDate() + 1);
    }

    return count;
}

// Jogos necessários por rodada para que TODAS as equipes joguem:
// times pares se enfrentam em pares normalmente; times ímpares fazem
// com que uma equipe jogue duas partidas na mesma rodada, garantindo
// que ninguém fique de fora.
function matchesPerRound(teamsCount) {
    const teams = Number(teamsCount) || 0;
    if (teams < 2) return 0;
    return Math.ceil(teams / 2);
}

function calculateRounds({ scheduleMode, roundsCount, startDate, endDate, matchDays }) {
    if (scheduleMode === 'rounds') {
        return Number(roundsCount) || 0;
    }

    if (scheduleMode === 'period') {
        return countMatchDays(startDate, endDate, matchDays);
    }

    return 0;
}

function CreateCompetitionStep4() {
    const navigation = useNavigation();
    const { formData, resetFormData } = useCompetitionForm();

    const {
        name,
        startDate,
        endDate,
        format,
        teamsCount,
        scheduleMode,
        roundsCount,
        matchDays,
        teams,
    } = formData;

    const calculatedRounds = calculateRounds({ scheduleMode, roundsCount, startDate, endDate, matchDays });
    const estimatedMatches = calculatedRounds * matchesPerRound(teamsCount);

    function handleCreate() {
        // TODO: enviar formData completo para a API quando o backend estiver pronto
        // (a geração real do calendário de jogos deve usar o RoundRobinService do backend)
        console.log('Competição criada:', formData);

        Alert.alert('Competição criada!', `${name} foi criada com sucesso.`);

        resetFormData();
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    }

    return (
        <ScrollView 
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <ScreenHeader 
                title="Criar Competição" 
                subtitle="Passo 4 de 4" 
                onBack={() => navigation.goBack()} 
            />

            <StepperProgress currentStep={4} labels={STEP_LABELS} />

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Revisão</Text>
                <Text style={styles.cardSubtitle}>Confira os dados da sua competição antes de finalizar.</Text>

                <View style={styles.reviewItem}>
                    <View style={styles.reviewIconContainer}>
                        <Ionicons name="shield-outline" size={20} color="#2E9E44" />
                    </View>
                    <View style={styles.reviewTextContainer}>
                        <Text style={styles.reviewLabel}>Nome da competição</Text>
                        <Text style={styles.reviewValue}>{name || '—'}</Text>
                    </View>
                </View>

                <View style={styles.reviewItem}>
                    <View style={styles.reviewIconContainer}>
                        <Ionicons name="calendar-outline" size={20} color="#2E9E44" />
                    </View>
                    <View style={styles.reviewTextContainer}>
                        <Text style={styles.reviewLabel}>Período</Text>
                        <Text style={styles.reviewValue}>
                            {formatDate(startDate)} a {formatDate(endDate)}
                        </Text>
                    </View>
                </View>

                <View style={styles.reviewItem}>
                    <View style={styles.reviewIconContainer}>
                        <Ionicons name="trophy-outline" size={20} color="#2E9E44" />
                    </View>
                    <View style={styles.reviewTextContainer}>
                        <Text style={styles.reviewLabel}>Formato</Text>
                        <Text style={styles.reviewValue}>{FORMATO_LABELS[format] || '—'}</Text>
                    </View>
                </View>

                <View style={styles.reviewItem}>
                    <View style={styles.reviewIconContainer}>
                        <Ionicons name="people-outline" size={20} color="#2E9E44" />
                    </View>
                    <View style={styles.reviewTextContainer}>
                        <Text style={styles.reviewLabel}>Equipes</Text>
                        <Text style={styles.reviewValue}>{teams?.length || 0} equipes</Text>
                    </View>
                </View>

                <View style={styles.reviewItem}>
                    <View style={styles.reviewIconContainer}>
                        <Ionicons name="list-outline" size={20} color="#2E9E44" />
                    </View>
                    <View style={styles.reviewTextContainer}>
                        <Text style={styles.reviewLabel}>Rodadas</Text>
                        <Text style={styles.reviewValue}>{calculatedRounds} rodadas</Text>
                    </View>
                </View>

                <View style={styles.reviewItem}>
                    <View style={styles.reviewIconContainer}>
                        <Ionicons name="football-outline" size={20} color="#2E9E44" />
                    </View>
                    <View style={styles.reviewTextContainer}>
                        <Text style={styles.reviewLabel}>Jogos previstos</Text>
                        <Text style={styles.reviewValue}>{estimatedMatches} jogos</Text>
                    </View>
                </View>

                <Button title="Criar Competição" onPress={handleCreate} style={styles.createButton} />
            </View>
        </ScrollView>
    );
}

export default CreateCompetitionStep4;