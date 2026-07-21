import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useProfileForm } from "../../../context/ProfileFormContext.jsx";
import CustomSelect from "../../../components/CustomSelect/CustomSelect.jsx";
import { styles } from "./step2.style.js";

const POSICOES_CAMPO = [
    'Goleiro', 'Zagueiro', 'Lateral', 'Volante', 'Meio-campista', 'Atacante',
].map((pos) => ({ label: pos, value: pos }));

const POSICOES_FUTSAL = [
    'Goleiro', 'Fixo', 'Ala Esquerdo', 'Ala Direito', 'Pivô',
].map((pos) => ({ label: pos, value: pos }));

function CreateProfileStep2() {
    const navigation = useNavigation();
    const { formData, updateFormData, resetFormData } = useProfileForm();

    const [fieldPosition, setFieldPosition] = useState(formData.fieldPosition);
    const [futsalPosition, setFutsalPosition] = useState(formData.futsalPosition);
    const [dominantFoot, setDominantFoot] = useState(formData.dominantFoot);
    const [preferredNumber, setPreferredNumber] = useState(formData.preferredNumber);

    function handleFinish() {
        if (!fieldPosition || !futsalPosition) {
            console.log('Preencha os campos obrigatórios');
            return;
        }

        const finalData = {
            ...formData,
            fieldPosition,
            futsalPosition,
            dominantFoot,
            preferredNumber,
        };

        // TODO: enviar finalData para a API quando o backend estiver pronto
        console.log('Perfil completo:', finalData);

        resetFormData();
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    }

    return (
        <ScrollView 
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Criar Perfil</Text>
                    <Text style={styles.headerSubtitle}>Passo 2 de 2</Text>
                </View>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.stepperContainer}>
                <View style={styles.stepperItem}>
                    <View style={[styles.stepCircle, styles.stepCircleActive]}>
                        <Text style={styles.stepCircleText}>1</Text>
                    </View>
                    <Text style={styles.stepLabelActive}>Dados Pessoais</Text>
                </View>
                <View style={styles.stepperLineActive} />
                <View style={styles.stepperItem}>
                    <View style={[styles.stepCircle, styles.stepCircleActive]}>
                        <Text style={styles.stepCircleText}>2</Text>
                    </View>
                    <Text style={styles.stepLabelActive}>Dados Esportivos</Text>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Dados Esportivos</Text>
                <Text style={styles.cardSubtitle}>Fale mais sobre o seu jogo.</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Posição no Campo *</Text>
                    <CustomSelect
                        label="Posição no Campo"
                        options={POSICOES_CAMPO}
                        value={fieldPosition}
                        onChange={setFieldPosition}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Posição no Futsal *</Text>
                    <CustomSelect
                        label="Posição no Futsal"
                        options={POSICOES_FUTSAL}
                        value={futsalPosition}
                        onChange={setFutsalPosition}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Pé dominante *</Text>
                    <View style={styles.footOptionsRow}>
                        {[
                            { label: 'Direito', value: 'right' },
                            { label: 'Esquerdo', value: 'left' },
                            { label: 'Ambidestro', value: 'both' },
                        ].map((option) => (
                            <TouchableOpacity
                                key={option.value}
                                style={[
                                    styles.footOption,
                                    dominantFoot === option.value && styles.footOptionActive,
                                ]}
                                onPress={() => setDominantFoot(option.value)}
                            >
                                <View style={styles.radioCircle}>
                                    {dominantFoot === option.value && <View style={styles.radioDot} />}
                                </View>
                                <Text style={styles.footOptionText}>{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Número preferido</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: 10"
                        placeholderTextColor="#999"
                        keyboardType="numeric"
                        maxLength={3}
                        value={preferredNumber}
                        onChangeText={setPreferredNumber}
                    />
                    <Text style={styles.helperText}>Número da camisa que você prefere usar (opcional)</Text>
                </View>

                <TouchableOpacity style={styles.buttonPrimary} onPress={handleFinish}>
                    <Text style={styles.buttonPrimaryText}>Finalizar Perfil</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default CreateProfileStep2;