import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useProfileForm } from "../../../context/ProfileFormContext.jsx";
import CustomSelect from "../../../components/CustomSelect/CustomSelect.jsx";
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
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Criar Perfil</Text>
                    <Text style={styles.headerSubtitle}>Passo 1 de 2</Text>
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
                    <View style={styles.stepCircle}>
                        <Text style={styles.stepCircleTextInactive}>2</Text>
                    </View>
                    <Text style={styles.stepLabel}>Dados Esportivos</Text>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Dados Pessoais</Text>
                <Text style={styles.cardSubtitle}>Conte para a gente quem você é.</Text>

                <TouchableOpacity style={styles.photoContainer} onPress={handlePickPhoto}>
                    <View style={styles.photoWrapper}>
                        <View style={styles.photoCircle}>
                            {photo ? (
                                <Image source={{ uri: photo }} style={styles.photoImage} />
                            ) : (
                                <Ionicons name="camera" size={28} color="#fff" />
                            )}
                        </View>
                        <View style={styles.photoEditBadge}>
                            <Ionicons name="camera-outline" size={14} color="#fff" />
                        </View>
                    </View>
                    <Text style={styles.photoLabel}>Adicionar foto</Text>
                </TouchableOpacity>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nome completo *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu nome completo"
                        placeholderTextColor="#999"
                        value={fullName}
                        onChangeText={setFullName}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Apelido *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Como te chamam"
                        placeholderTextColor="#999"
                        value={nickname}
                        onChangeText={setNickname}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Data de nascimento *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="DD/MM/AAAA"
                        placeholderTextColor="#999"
                        keyboardType="numeric"
                        value={birthDate}
                        onChangeText={setBirthDate}
                    />
                </View>

                <View style={styles.rowGroup}>
                    <View style={[styles.inputGroup, styles.flexTwo]}>
                        <Text style={styles.label}>Cidade *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Sua cidade"
                            placeholderTextColor="#999"
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

                <TouchableOpacity style={styles.buttonPrimary} onPress={handleContinue}>
                    <Text style={styles.buttonPrimaryText}>Continuar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default CreateProfileStep1;