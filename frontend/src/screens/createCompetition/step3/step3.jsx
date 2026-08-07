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
import { styles } from "./step3.style.js";

const STEP_LABELS = ['Geral', 'Configuração', 'Equipes', 'Revisão'];

const CORES = [
    { label: 'Azul', value: 'blue', color: '#2F66D5' },
    { label: 'Vermelho', value: 'red', color: '#D93A34' },
    { label: 'Verde', value: 'green', color: '#2E9E44' },
    { label: 'Amarelo', value: 'yellow', color: '#D9A520' },
    { label: 'Laranja', value: 'orange', color: '#E07B2D' },
    { label: 'Roxo', value: 'purple', color: '#8E44AD' },
    { label: 'Preto', value: 'black', color: '#1A1A1A' },
    { label: 'Branco', value: 'white', color: '#E5E5E5' },
];

function createEmptyTeam() {
    return { id: String(Date.now() + Math.random()), name: '', color: '', colorHex: '' };
}

function CreateCompetitionStep3() {
    const navigation = useNavigation();
    const { formData, updateFormData } = useCompetitionForm();

    const [teams, setTeams] = useState(
        formData.teams?.length ? formData.teams : [createEmptyTeam(), createEmptyTeam()]
    );

    const maxTeams = formData.teamsCount ? Number(formData.teamsCount) : null;

    function updateTeam(id, fields) {
        setTeams((prev) => prev.map((team) => (team.id === id ? { ...team, ...fields } : team)));
    }

    // Já salva o value (código) e o colorHex (pronto para exibição)
    // juntos — quem consumir a equipe depois (Details, listagem, etc)
    // só lê team.colorHex, sem precisar traduzir nada.
    function handleColorChange(teamId, colorValue) {
        const selected = CORES.find((c) => c.value === colorValue);
        updateTeam(teamId, { color: colorValue, colorHex: selected?.color ?? '' });
    }

    function addTeam() {
        if (maxTeams && teams.length >= maxTeams) {
            Alert.alert('Limite atingido', `Você definiu ${maxTeams} equipes na configuração.`);
            return;
        }
        setTeams((prev) => [...prev, createEmptyTeam()]);
    }

    function removeTeam(id) {
        if (teams.length <= 2) {
            Alert.alert('Mínimo de equipes', 'A competição precisa de pelo menos 2 equipes.');
            return;
        }
        setTeams((prev) => prev.filter((team) => team.id !== id));
    }

    function handleContinue() {
        const incompleteTeam = teams.find((team) => !team.name.trim() || !team.color);
        if (incompleteTeam) {
            Alert.alert('Campos obrigatórios', 'Preencha o nome e a cor de todas as equipes.');
            return;
        }

        updateFormData({ teams });

        navigation.navigate('CreateCompetitionStep4');
    }

    return (
        <ScrollView 
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
        >
            <ScreenHeader 
                title="Criar Competição" 
                subtitle="Passo 3 de 4" 
                onBack={() => navigation.goBack()} 
            />

            <StepperProgress currentStep={3} labels={STEP_LABELS} />

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Cadastre as equipes</Text>
                <Text style={styles.cardSubtitle}>Adicione todas as equipes que irão participar.</Text>

                {teams.map((team, index) => (
                    <View key={team.id} style={styles.teamCard}>
                        <View style={styles.teamHeader}>
                            <Text style={styles.teamHeaderTitle}>Equipe {index + 1}</Text>
                            {teams.length > 2 && (
                                <TouchableOpacity onPress={() => removeTeam(team.id)}>
                                    <Ionicons name="trash-outline" size={18} color="#D93A34" />
                                </TouchableOpacity>
                            )}
                        </View>

                        <View style={styles.teamBody}>
                            <View style={styles.shieldContainer}>
                                <Ionicons name="shield" size={40} color={team.colorHex || '#ccc'} />
                            </View>

                            <View style={styles.teamFields}>
                                <View style={styles.inputGroup}>
                                    <FormInput
                                        label="Nome da equipe *"
                                        placeholder="Ex: Leões FC"
                                        value={team.name}
                                        onChangeText={(text) => updateTeam(team.id, { name: text })}
                                    />
                                </View>

                                <View>
                                    <Text style={styles.label}>Cor principal *</Text>
                                    <CustomSelect
                                        label="Cor principal"
                                        placeholder="Selecione a cor"
                                        options={CORES}
                                        value={team.color}
                                        onChange={(colorValue) => handleColorChange(team.id, colorValue)}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                ))}

                <TouchableOpacity style={styles.addTeamButton} onPress={addTeam}>
                    <Ionicons name="add" size={18} color="#2E9E44" />
                    <Text style={styles.addTeamText}>Adicionar Equipe</Text>
                </TouchableOpacity>

                <Button title="Continuar" onPress={handleContinue} style={styles.continueButton} />
            </View>
        </ScrollView>
    );
}

export default CreateCompetitionStep3;