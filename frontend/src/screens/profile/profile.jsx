import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext.jsx";
import ScreenHeader from "../../components/ScreenHeader/ScreenHeader.jsx";
import Button from "../../components/Button/Button.jsx";
import { styles } from "./profile.style.js";

const DOMINANT_FOOT_LABELS = {
    right: 'Direito',
    left: 'Esquerdo',
    both: 'Ambidestro',
};

function ProfileInfoItem({ icon, label, value }) {
    return (
        <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
                <Ionicons name={icon} size={20} color="#2E9E44" />
            </View>
            <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>{label}</Text>
                <Text style={styles.infoValue}>{value || 'Não informado'}</Text>
            </View>
        </View>
    );
}

function Profile() {
    const navigation = useNavigation();
    const { user, logout } = useAuth();

    const displayName = user?.fullName || user?.nickname || user?.name || 'Atleta LigaMais';
    const nickname = user?.nickname ? `@${user.nickname}` : 'Perfil ainda não concluído';
    const location = [user?.city, user?.state].filter(Boolean).join(' - ');
    const isProfileComplete = Boolean(user?.fieldPosition);

    function handleEditProfile() {
        navigation.navigate('CreateProfileStep1');
    }

    function handleLogout() {
        Alert.alert(
            'Sair da conta',
            'Tem certeza de que deseja encerrar sua sessão?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Sair',
                    style: 'destructive',
                    onPress: async () => {
                        await logout();
                        navigation.reset({ index: 0, routes: [{ name: 'Splash' }] });
                    },
                },
            ],
        );
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <ScreenHeader 
                title="Meu Perfil" 
                subtitle="Seus dados pessoais e esportivos"
                showBack={false}
                rightIcon="create-outline"
                onRightPress={handleEditProfile}
            />

            <View style={styles.profileCard}>
                <View style={styles.avatarWrapper}>
                    {user?.photo ? (
                        <Image source={{ uri: user.photo }} style={styles.avatarImage} />
                    ) : (
                        <Ionicons name="person" size={42} color="#FFFFFF" />
                    )}
                </View>

                <Text style={styles.profileName}>{displayName}</Text>
                <Text style={styles.profileNickname}>{nickname}</Text>

                {location ? (
                    <View style={styles.locationRow}>
                        <Ionicons name="location-outline" size={16} color="#666666" />
                        <Text style={styles.locationText}>{location}</Text>
                    </View>
                ) : null}

                {/* <Button 
                    title={isProfileComplete ? 'Editar perfil' : 'Completar perfil'}
                    onPress={handleEditProfile}
                    style={styles.editButton}
                /> */}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Informações esportivas</Text>
                <View style={styles.infoCard}>
                    <ProfileInfoItem
                        icon="football-outline"
                        label="Posição no campo"
                        value={user?.fieldPosition}
                    />
                    <View style={styles.divider} />
                    <ProfileInfoItem
                        icon="grid-outline"
                        label="Posição no futsal"
                        value={user?.futsalPosition}
                    />
                    <View style={styles.divider} />
                    <ProfileInfoItem
                        icon="footsteps-outline"
                        label="Pé dominante"
                        value={DOMINANT_FOOT_LABELS[user?.dominantFoot]}
                    />
                    <View style={styles.divider} />
                    <ProfileInfoItem
                        icon="shirt-outline"
                        label="Número preferido"
                        value={user?.preferredNumber}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Conta</Text>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                    accessibilityRole="button"
                    accessibilityLabel="Sair da conta"
                >
                    <View style={styles.logoutContent}>
                        <View style={styles.logoutIcon}>
                            <Ionicons name="log-out-outline" size={21} color="#D93A34" />
                        </View>
                        <View>
                            <Text style={styles.logoutTitle}>Sair da conta</Text>
                            <Text style={styles.logoutSubtitle}>Encerrar a sessão neste dispositivo</Text>
                        </View>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#999999" />
                </TouchableOpacity>
            </View>

            <Text style={styles.versionText}>LigaMais 1.0.0</Text>
        </ScrollView>
    );
}

export default Profile;