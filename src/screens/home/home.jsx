import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext.jsx";
import { styles } from "./home.style.js";

function Home() {
    const navigation = useNavigation();
    const { user } = useAuth();

    const displayName = user?.nickname || user?.fullName || user?.name || 'Jogador';
    const avatar = user?.photo || null;

    // TODO: substituir por dados reais vindos da API quando o backend existir
    const activeCompetitions = 3;
    const pendingInvites = 2;

    return (
        <ScrollView 
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => console.log('Abrir menu')}>
                    <Ionicons name="menu" size={26} color="#1A1A1A" />
                </TouchableOpacity>

                <View style={styles.headerRight}>
                    <TouchableOpacity 
                        style={styles.notificationButton}
                        onPress={() => console.log('Abrir notificações')}
                    >
                        <Ionicons name="notifications-outline" size={24} color="#1A1A1A" />
                        {pendingInvites > 0 && <View style={styles.notificationDot} />}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <View style={styles.avatarCircle}>
                            {avatar ? (
                                <Image source={{ uri: avatar }} style={styles.avatarImage} />
                            ) : (
                                <Ionicons name="person" size={20} color="#fff" />
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.greetingContainer}>
                <Text style={styles.greetingText}>Olá, {displayName}! 👋</Text>
                <Text style={styles.greetingSubtitle}>O que você deseja fazer hoje?</Text>
            </View>

            <View style={styles.banner}>
                <View style={styles.bannerTextContainer}>
                    <Text style={styles.bannerTitle}>Minhas Competições</Text>
                    <Text style={styles.bannerNumber}>{activeCompetitions}</Text>
                    <Text style={styles.bannerSubtitle}>Em andamento</Text>
                </View>
                <Ionicons name="trophy" size={72} color="rgba(255, 215, 0, 0.9)" />
            </View>

            <View style={styles.actionsContainer}>
                <TouchableOpacity 
                    style={styles.actionCard}
                    onPress={() => console.log('Ir para Criar Competição')}
                >
                    <View style={styles.actionIconContainer}>
                        <Ionicons name="add-circle-outline" size={24} color="#2E9E44" />
                    </View>
                    <View style={styles.actionTextContainer}>
                        <Text style={styles.actionTitle}>Criar Competição</Text>
                        <Text style={styles.actionSubtitle}>Inicie um novo campeonato</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#999" />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.actionCard}
                    onPress={() => console.log('Ir para Convites Recebidos')}
                >
                    <View style={styles.actionIconContainer}>
                        <Ionicons name="notifications-outline" size={24} color="#2E9E44" />
                    </View>
                    <View style={styles.actionTextContainer}>
                        <Text style={styles.actionTitle}>Convites Recebidos</Text>
                        <Text style={styles.actionSubtitle}>
                            {pendingInvites} convites pendentes
                        </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#999" />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default Home;