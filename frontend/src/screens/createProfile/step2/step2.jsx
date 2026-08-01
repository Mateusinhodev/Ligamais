import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useProfileForm } from "../../../context/ProfileFormContext.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";
import CustomSelect from "../../../components/CustomSelect/CustomSelect.jsx";
import ScreenHeader from "../../../components/ScreenHeader/ScreenHeader.jsx";
import StepperProgress from "../../../components/StepperProgress/StepperProgress.jsx";
import FormInput from "../../../components/FormInput/FormInput.jsx";
import Button from "../../../components/Button/Button.jsx";
import { styles } from "./step2.style.js";

const POSICOES_CAMPO = [
    'Goleiro', 'Zagueiro', 'Lateral', 'Volante', 'Meio-campista', 'Atacante',
].map((pos) => ({ label: pos, value: pos }));

const POSICOES_FUTSAL = [
    'Goleiro', 'Fixo', 'Ala Esquerdo', 'Ala Direito', 'Pivô',
].map((pos) => ({ label: pos, value: pos }));

function CreateProfileStep2() {
    const navigation = useNavigation();
    const { formData, completeProfile, resetFormData } = useProfileForm();
    const { user, login, updateUser } = useAuth();

    const isEditMode = Boolean(user);
    const initialSource = user ?? formData;

    const [fieldPosition, setFieldPosition] = useState(initialSource.fieldPosition ?? '');
    const [futsalPosition, setFutsalPosition] = useState(initialSource.futsalPosition ?? '');
    const [dominantFoot, setDominantFoot] = useState(initialSource.dominantFoot ?? 'right');
    const [preferredNumber, setPreferredNumber] = useState(initialSource.preferredNumber ?? '');

    async function handleFinish() {
        if (!fieldPosition || !futsalPosition) {
            Alert.alert('Campos obrigatórios', 'Selecione sua posição no campo e no futsal.');
            return;
        }

        const finalData = completeProfile({
            fieldPosition,
            futsalPosition,
            dominantFoot,
            preferredNumber,
        });

        // TODO: enviar finalData para a API quando o backend estiver pronto
        console.log('Perfil completo:', finalData);

        const result = isEditMode 
            ? await updateUser(finalData)
            : await login(finalData);

        resetFormData();

        if (result.success) {
            navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
        } else {
            Alert.alert('Erro ao salvar', 'Não foi possível concluir o perfil. Tente novamente.');
        }
    }

    return (
        <ScrollView 
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
        >
            <ScreenHeader 
                title={isEditMode ? 'Editar Perfil' : 'Criar Perfil'} 
                subtitle="Passo 2 de 2" 
                onBack={() => navigation.goBack()} 
            />

            <StepperProgress 
                currentStep={2} 
                labels={['Dados Pessoais', 'Dados Esportivos']} 
            />

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
                    <FormInput
                        label="Número preferido"
                        placeholder="Ex: 10"
                        keyboardType="numeric"
                        maxLength={3}
                        value={preferredNumber}
                        onChangeText={setPreferredNumber}
                    />
                    <Text style={styles.helperText}>Número da camisa que você prefere usar (opcional)</Text>
                </View>

                <Button 
                    title={isEditMode ? 'Salvar alterações' : 'Finalizar Perfil'} 
                    onPress={handleFinish} 
                    style={styles.finishButton} 
                />
            </View>
        </ScrollView>
    );
}

export default CreateProfileStep2;