import { useState } from "react";
import { Alert, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useCompetitionForm } from "../../../context/CompetitionFormContext.jsx";
import CustomSelect from "../../../components/CustomSelect/CustomSelect.jsx";
import ScreenHeader from "../../../components/ScreenHeader/ScreenHeader.jsx";
import StepperProgress from "../../../components/StepperProgress/StepperProgress.jsx";
import FormInput from "../../../components/FormInput/FormInput.jsx";
import Button from "../../../components/Button/Button.jsx";
import { styles } from "./step2.style.js";

const STEP_LABELS = ['Geral', 'Configuração', 'Equipes', 'Revisão'];

const FORMATOS = [
    { label: 'Pontos Corridos', value: 'league' },
    { label: 'Mata-mata', value: 'knockout', disabled: true, disabledReason: 'Em breve' },
    { label: 'Grupos + Mata-mata', value: 'groups_knockout', disabled: true, disabledReason: 'Em breve' },
    { label: 'Ida e volta', value: 'home_away', disabled: true, disabledReason: 'Em breve' },
];

const QUANTIDADE_EQUIPES = Array.from({ length: 31 }, (_, i) => i + 2).map((n) => ({
    label: String(n),
    value: String(n),
}));

// Gera horários de 30 em 30 minutos: 06:00, 06:30, 07:00 ... 23:30
const HORARIOS = Array.from({ length: 36 }, (_, i) => {
    const totalMinutes = i * 30 + 6 * 60; // começa às 06:00
    const hours = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
    const minutes = String(totalMinutes % 60).padStart(2, '0');
    const time = `${hours}:${minutes}`;
    return { label: time, value: time };
});

const DIAS_SEMANA = [
    { label: 'Dom', value: 'sun' },
    { label: 'Seg', value: 'mon' },
    { label: 'Ter', value: 'tue' },
    { label: 'Qua', value: 'wed' },
    { label: 'Qui', value: 'thu' },
    { label: 'Sex', value: 'fri' },
    { label: 'Sáb', value: 'sat' },
];

function CreateCompetitionStep2() {
    const navigation = useNavigation();
    const { formData, updateFormData } = useCompetitionForm();

    const [format, setFormat] = useState(formData.format || 'league');
    const [teamsCount, setTeamsCount] = useState(formData.teamsCount);
    const [scheduleMode, setScheduleMode] = useState(formData.scheduleMode);
    const [roundsCount, setRoundsCount] = useState(formData.roundsCount);
    const [matchDays, setMatchDays] = useState(formData.matchDays);
    const [matchTime, setMatchTime] = useState(formData.matchTime);
    const [matchInterval, setMatchInterval] = useState(formData.matchInterval);

    function toggleMatchDay(day) {
        setMatchDays((prev) => 
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    }

    function handleContinue() {
        if (!format || !teamsCount) {
            Alert.alert('Campos obrigatórios', 'Selecione o formato e a quantidade de equipes.');
            return;
        }

        if (scheduleMode === 'rounds' && !roundsCount) {
            Alert.alert('Campo obrigatório', 'Informe a quantidade de rodadas.');
            return;
        }

        if (scheduleMode === 'period' && matchDays.length === 0) {
            Alert.alert('Campo obrigatório', 'Selecione ao menos um dia da semana.');
            return;
        }

        updateFormData({
            format,
            teamsCount,
            scheduleMode,
            roundsCount,
            matchDays,
            matchTime,
            matchInterval,
        });

        navigation.navigate('CreateCompetitionStep3');
    }

    return (
        <ScrollView 
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
        >
            <ScreenHeader 
                title="Criar Competição" 
                subtitle="Passo 2 de 4" 
                onBack={() => navigation.goBack()} 
            />

            <StepperProgress currentStep={2} labels={STEP_LABELS} />

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Configuração da Competição</Text>
                <Text style={styles.cardSubtitle}>Defina como sua competição será disputada.</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Formato da competição *</Text>
                    <CustomSelect
                        label="Formato da competição"
                        placeholder="Selecione o formato"
                        options={FORMATOS}
                        value={format}
                        onChange={setFormat}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Quantidade de equipes *</Text>
                    <CustomSelect
                        label="Quantidade de equipes"
                        placeholder="Selecione a quantidade"
                        options={QUANTIDADE_EQUIPES}
                        value={teamsCount}
                        onChange={setTeamsCount}
                    />
                </View>

                <Text style={styles.sectionLabel}>Como deseja gerar os jogos?</Text>

                <TouchableOpacity 
                    style={[styles.scheduleOption, scheduleMode === 'period' && styles.scheduleOptionActive]}
                    onPress={() => setScheduleMode('period')}
                >
                    <View style={styles.scheduleIconContainer}>
                        <Ionicons name="calendar-outline" size={20} color="#2E9E44" />
                    </View>
                    <View style={styles.scheduleTextContainer}>
                        <Text style={styles.scheduleTitle}>Por período</Text>
                        <Text style={styles.scheduleSubtitle}>Defina dias, horários e intervalo.</Text>
                    </View>
                    <View style={styles.radioCircle}>
                        {scheduleMode === 'period' && <View style={styles.radioDot} />}
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.scheduleOption, scheduleMode === 'rounds' && styles.scheduleOptionActive]}
                    onPress={() => setScheduleMode('rounds')}
                >
                    <View style={styles.scheduleIconContainer}>
                        <Ionicons name="list-outline" size={20} color="#2E9E44" />
                    </View>
                    <View style={styles.scheduleTextContainer}>
                        <Text style={styles.scheduleTitle}>Quantidade de rodadas</Text>
                        <Text style={styles.scheduleSubtitle}>Defina o total de rodadas.</Text>
                    </View>
                    <View style={styles.radioCircle}>
                        {scheduleMode === 'rounds' && <View style={styles.radioDot} />}
                    </View>
                </TouchableOpacity>

                {scheduleMode === 'rounds' && (
                    <>
                        <View style={styles.inputGroupTop}>
                            <FormInput
                                label="Quantidade de rodadas *"
                                placeholder="Ex: 20"
                                keyboardType="numeric"
                                value={roundsCount}
                                onChangeText={setRoundsCount}
                            />
                        </View>

                        <View style={styles.infoBox}>
                            <Ionicons name="information-circle-outline" size={18} color="#2E9E44" />
                            <Text style={styles.infoText}>
                                O sistema irá gerar o calendário de jogos automaticamente.
                            </Text>
                        </View>
                    </>
                )}

                {scheduleMode === 'period' && (
                    <>
                        <View style={styles.inputGroupTop}>
                            <Text style={styles.label}>Dias da semana *</Text>
                            <View style={styles.daysRow}>
                                {DIAS_SEMANA.map((day) => (
                                    <TouchableOpacity
                                        key={day.value}
                                        style={[
                                            styles.dayChip,
                                            matchDays.includes(day.value) && styles.dayChipActive,
                                        ]}
                                        onPress={() => toggleMatchDay(day.value)}
                                    >
                                        <Text 
                                            style={[
                                                styles.dayChipText,
                                                matchDays.includes(day.value) && styles.dayChipTextActive,
                                            ]}
                                        >
                                            {day.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        <View style={styles.inputGroupTop}>
                            <Text style={styles.label}>Horário</Text>
                            <CustomSelect
                                label="Horário do jogo"
                                placeholder="Selecione"
                                options={HORARIOS}
                                value={matchTime}
                                onChange={setMatchTime}
                            />
                        </View>

                        <View style={styles.infoBox}>
                            <Ionicons name="information-circle-outline" size={18} color="#2E9E44" />
                            <Text style={styles.infoText}>
                                O sistema irá gerar o calendário de jogos automaticamente.
                            </Text>
                        </View>
                    </>
                )}

                <Button title="Continuar" onPress={handleContinue} style={styles.continueButton} />
            </View>
        </ScrollView>
    );
}

export default CreateCompetitionStep2;