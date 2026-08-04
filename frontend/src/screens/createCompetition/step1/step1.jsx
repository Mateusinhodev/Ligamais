import { useState } from "react";
import { Alert, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useCompetitionForm } from "../../../context/CompetitionFormContext.jsx";
import ScreenHeader from "../../../components/ScreenHeader/ScreenHeader.jsx";
import StepperProgress from "../../../components/StepperProgress/StepperProgress.jsx";
import FormInput from "../../../components/FormInput/FormInput.jsx";
import Button from "../../../components/Button/Button.jsx";
import ImagePickerAvatar from "../../../components/ImagePickerAvatar/ImagePickerAvatar.jsx";

import { styles } from "./step1.style.js";

const STEP_LABELS = ['Geral', 'Configuração', 'Equipes', 'Revisão'];

function CreateCompetitionStep1() {
    const navigation = useNavigation();
    const { formData, updateFormData } = useCompetitionForm();

    const [coverImage, setCoverImage] = useState(formData.coverImage);
    const [name, setName] = useState(formData.name);
    const [description, setDescription] = useState(formData.description);
    const [location, setLocation] = useState(formData.location);
    const [startDate, setStartDate] = useState(formData.startDate);
    const [endDate, setEndDate] = useState(formData.endDate);

    function handleContinue() {
        if (!name.trim() || !location.trim() || !startDate.trim() || !endDate.trim()) {
            Alert.alert('Campos obrigatórios', 'Preencha todas as informações, exceto a descrição.');
            return;
        }

        updateFormData({ coverImage, name, description, location, startDate, endDate });
        navigation.navigate('CreateCompetitionStep2');
    }

    return (
        <ScrollView 
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
        >
            <ScreenHeader 
                title="Criar Competição" 
                subtitle="Passo 1 de 4" 
                onBack={() => navigation.goBack()} 
            />

            <StepperProgress currentStep={1} labels={STEP_LABELS} />

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Informações Gerais</Text>
                <Text style={styles.cardSubtitle}>Vamos começar com os dados básicos da competição.</Text>

                <ImagePickerAvatar 
                    value={coverImage} 
                    onChange={setCoverImage} 
                    label="Adicionar logo"
                    placeholderIcon="shield-outline"
                />

                <View style={styles.inputGroup}>
                    <FormInput
                        label="Nome da competição *"
                        placeholder="Ex: Copa dos Amigos 2027"
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <FormInput
                        label="Descrição (opcional)"
                        placeholder="Conte um pouco sobre a competição"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        numberOfLines={3}
                        inputStyle={styles.textArea}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <FormInput
                        label="Local *"
                        placeholder="Ex: Campo do Bairro"
                        value={location}
                        onChangeText={setLocation}
                    />
                </View>

                <View style={styles.rowGroup}>
                    <View style={[styles.inputGroup, styles.flexOne]}>
                        <FormInput
                            label="Data de início *"
                            placeholder="DD/MM/AAAA"
                            keyboardType="numeric"
                            value={startDate}
                            onChangeText={setStartDate}
                            rightIcon="calendar-outline"
                        />
                    </View>

                    <View style={[styles.inputGroup, styles.flexOne]}>
                        <FormInput
                            label="Data de término *"
                            placeholder="DD/MM/AAAA"
                            keyboardType="numeric"
                            value={endDate}
                            onChangeText={setEndDate}
                            rightIcon="calendar-outline"
                        />
                    </View>
                </View>

                <Button title="Continuar" onPress={handleContinue} style={styles.continueButton} />
            </View>
        </ScrollView>
    );
}

export default CreateCompetitionStep1;