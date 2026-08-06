import { View, Text, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useCompetitionForm } from "../../../context/CompetitionFormContext.jsx";
import ScreenHeader from "../../../components/ScreenHeader/ScreenHeader.jsx";
import StepperProgress from "../../../components/StepperProgress/StepperProgress.jsx";
import Button from "../../../components/Button/Button.jsx";
import { styles } from "./step4.style.js";

const STEP_LABELS = ['Geral', 'Configuração', 'Equipes', 'Revisão'];

function formatDate(dateString) {
    return dateString || '—';
}

function CreateCompetitionStep4() {
    const navigation = useNavigation();
    const { formData, resetFormData } = useCompetitionForm();

    const {
        name,
        startDate,
        endDate,
        formatLabel,
        teams,
        calculatedRounds,
        estimatedMatches,
    } = formData;

    function handleCreate() {
        // TODO: enviar formData completo para a API quando o backend estiver pronto
        // O código/link reais devem vir da resposta da API, não gerados no frontend
        console.log('Competição criada:', formData);

        navigation.navigate('CreateCompetitionStep5', {
            competitionName: name,
        });
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
                        <Text style={styles.reviewValue}>{formatLabel || '—'}</Text>
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
                        <Text style={styles.reviewValue}>{calculatedRounds || 0} rodadas</Text>
                    </View>
                </View>

                <View style={styles.reviewItem}>
                    <View style={styles.reviewIconContainer}>
                        <Ionicons name="football-outline" size={20} color="#2E9E44" />
                    </View>
                    <View style={styles.reviewTextContainer}>
                        <Text style={styles.reviewLabel}>Jogos previstos</Text>
                        <Text style={styles.reviewValue}>{estimatedMatches || 0} jogos</Text>
                    </View>
                </View>

                <Button title="Criar Competição" onPress={handleCreate} style={styles.createButton} />
            </View>
        </ScrollView>
    );
}

export default CreateCompetitionStep4;