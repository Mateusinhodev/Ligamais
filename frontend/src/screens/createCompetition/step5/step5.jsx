import { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import QRCode from "react-native-qrcode-svg";
import { useCompetitionForm } from "../../../context/CompetitionFormContext.jsx";
import { useCompetitions } from "../../../context/CompetitionsContext.jsx";
import Button from "../../../components/Button/Button.jsx";
import { styles } from "./step5.style.js";

function generateMockCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
}

function CreateCompetitionStep5() {
    const navigation = useNavigation();
    const route = useRoute();
    const { formData, resetFormData } = useCompetitionForm();
    const { addCompetition } = useCompetitions();

    const competitionName = route.params?.competitionName ?? 'Sua competição';

    const competitionCode = useMemo(() => generateMockCode(), []);
    const competitionLink = `ligamais.app/competicoes/${competitionCode}`;

    const [copiedField, setCopiedField] = useState(null);
    const [hasSaved, setHasSaved] = useState(false);

    // Salva a competição na lista assim que a tela abre (só uma vez,
    // mesmo que o componente re-renderize por outros motivos).
    if (!hasSaved) {
        addCompetition({
            id: competitionCode,
            code: competitionCode,
            link: competitionLink,
            status: 'ongoing',
            currentRound: 1,
            ...formData,
        });
        setHasSaved(true);
    }

    async function handleCopy(text, field) {
        await Clipboard.setStringAsync(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    }

    function handleGoToCompetition() {
        resetFormData();
        // TODO: navegar para a tela real de detalhes da competição
        // quando ela existir, usando competitionCode como identificador
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    }

    return (
        <ScrollView 
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Competição Criada</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.successIconContainer}>
                <View style={styles.successCircle}>
                    <Ionicons name="checkmark" size={40} color="#fff" />
                </View>
            </View>

            <Text style={styles.successTitle}>Competição criada com sucesso!</Text>
            <Text style={styles.successSubtitle}>
                Sua competição está pronta para receber equipes e jogadores.
            </Text>

            <View style={styles.card}>
                <Text style={styles.cardLabel}>Código da competição</Text>
                <View style={styles.copyRow}>
                    <Text style={styles.codeText}>{competitionCode}</Text>
                    <TouchableOpacity onPress={() => handleCopy(competitionCode, 'code')}>
                        <Ionicons 
                            name={copiedField === 'code' ? 'checkmark' : 'copy-outline'} 
                            size={20} 
                            color={copiedField === 'code' ? '#2E9E44' : '#666'} 
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardLabel}>Link da competição</Text>
                <View style={styles.copyRow}>
                    <Text style={styles.linkText} numberOfLines={1}>{competitionLink}</Text>
                    <TouchableOpacity onPress={() => handleCopy(competitionLink, 'link')}>
                        <Ionicons 
                            name={copiedField === 'link' ? 'checkmark' : 'copy-outline'} 
                            size={20} 
                            color={copiedField === 'link' ? '#2E9E44' : '#666'} 
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardLabel}>QR Code</Text>
                <View style={styles.qrRow}>
                    <View style={styles.qrCodeWrapper}>
                        <QRCode value={competitionLink} size={80} />
                    </View>
                    <Text style={styles.qrHelperText}>Escaneie para acessar</Text>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardLabel}>Próximos passos</Text>

                <View style={styles.stepRow}>
                    <Ionicons name="checkmark-circle" size={20} color="#2E9E44" />
                    <Text style={styles.stepTextDone}>Competição criada</Text>
                </View>

                <View style={styles.stepRow}>
                    <Ionicons name="checkmark-circle" size={20} color="#2E9E44" />
                    <Text style={styles.stepTextDone}>Equipes cadastradas</Text>
                </View>

                <View style={styles.stepRow}>
                    <Ionicons name="ellipse-outline" size={20} color="#999" />
                    <Text style={styles.stepTextPending}>Compartilhar convite</Text>
                </View>

                <View style={styles.stepRow}>
                    <Ionicons name="ellipse-outline" size={20} color="#999" />
                    <Text style={styles.stepTextPending}>Jogadores entram</Text>
                </View>
            </View>

            <Button 
                title="Ir para Competição" 
                onPress={handleGoToCompetition} 
                style={styles.goButton} 
            />
        </ScrollView>
    );
}

export default CreateCompetitionStep5;