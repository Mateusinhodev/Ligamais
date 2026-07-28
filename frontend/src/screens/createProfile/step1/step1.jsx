import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useProfileForm } from "../../../context/ProfileFormContext.jsx";
import CustomSelect from "../../../components/CustomSelect/CustomSelect.jsx";
import ScreenHeader from "../../../components/ScreenHeader/ScreenHeader.jsx";
import StepperProgress from "../../../components/StepperProgress/StepperProgress.jsx";
import FormInput from "../../../components/FormInput/FormInput.jsx";
import Button from "../../../components/Button/Button.jsx";
import ImagePickerAvatar from "../../../components/ImagePickerAvatar/ImagePickerAvatar.jsx";
import { styles } from "./step1.style.js";

const ESTADOS = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
].map((uf) => ({ label: uf, value: uf }));

function CreateProfileStep1() {
    const navigation = useNavigation();
    const { formData, updateFormData } = useProfileForm();

    const [fullName, setFullName] = useState(formData.fullName);
    const [nickname, setNickname] = useState(formData.nickname);
    const [birthDate, setBirthDate] = useState(formData.birthDate);
    const [city, setCity] = useState(formData.city);
    const [state, setState] = useState(formData.state);
    const [photo, setPhoto] = useState(formData.photo);

    async function handlePickPhoto() {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            console.log('Permissão de galeria negada');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
        }
    }

    function handleContinue() {
        if (!fullName || !nickname || !birthDate || !city || !state) {
            console.log('Preencha todos os campos obrigatórios');
            return;
        }

        updateFormData({ fullName, nickname, birthDate, city, state, photo });
        navigation.navigate('CreateProfileStep2');
    }

    return (
        <ScrollView 
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
        >
            <ScreenHeader 
                title="Criar Perfil" 
                subtitle="Passo 1 de 2" 
                onBack={() => navigation.goBack()} 
            />

            <StepperProgress 
                currentStep={1} 
                labels={['Dados Pessoais', 'Dados Esportivos']} 
            />

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Dados Pessoais</Text>
                <Text style={styles.cardSubtitle}>Conte para a gente quem você é.</Text>

                <ImagePickerAvatar 
                    value={photo} 
                    onChange={setPhoto} 
                    label="Adicionar foto"
                />
                
                <View style={styles.inputGroup}>
                    <FormInput
                        label="Nome completo *"
                        placeholder="Digite seu nome completo"
                        value={fullName}
                        onChangeText={setFullName}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <FormInput
                        label="Apelido *"
                        placeholder="Como te chamam"
                        value={nickname}
                        onChangeText={setNickname}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <FormInput
                        label="Data de nascimento *"
                        placeholder="DD/MM/AAAA"
                        keyboardType="numeric"
                        value={birthDate}
                        onChangeText={setBirthDate}
                    />
                </View>

                <View style={styles.rowGroup}>
                    <View style={[styles.inputGroup, styles.flexTwo]}>
                        <FormInput
                            label="Cidade *"
                            placeholder="Sua cidade"
                            value={city}
                            onChangeText={setCity}
                        />
                    </View>

                    <View style={[styles.inputGroup, styles.flexOne]}>
                        <Text style={styles.label}>Estado *</Text>
                        <CustomSelect
                            label="Selecione o Estado"
                            placeholder="UF"
                            options={ESTADOS}
                            value={state}
                            onChange={setState}
                        />
                    </View>
                </View>

                <Button title="Continuar" onPress={handleContinue} style={styles.continueButton} />
            </View>
        </ScrollView>
    );
}

export default CreateProfileStep1;