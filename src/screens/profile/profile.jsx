import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useProfileForm } from "../../context/ProfileFormContext.jsx";
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
    const { profile, startProfileEdit, clearProfile } = useProfileForm();

    const displayName = profile?.fullName || 'Atleta LigaMais';
    const nickname = profile?.nickname ? `@${profile.nickname}` : 'Perfil ainda não concluído';
    const location = [profile?.city, profile?.state].filter(Boolean).join(' - ');

    function handleEditProfile() {
        startProfileEdit();
        navigation.getParent()?.navigate('CreateProfileStep1');
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
                    onPress: () => {
                        clearProfile();
                        navigation.getParent()?.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                        });
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
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Meu Perfil</Text>
                    <Text style={styles.subtitle}>Seus dados pessoais e esportivos</Text>
                </View>
                <TouchableOpacity
                    style={styles.editIconButton}
                    onPress={handleEditProfile}
                    accessibilityRole="button"
                    accessibilityLabel="Editar perfil"
                >
                    <Ionicons name="create-outline" size={22} color="#2E9E44" />
                </TouchableOpacity>
            </View>

            <View style={styles.profileCard}>
                <View style={styles.avatarWrapper}>
                    {profile?.photo ? (
                        <Image source={{ uri: profile.photo }} style={styles.avatarImage} />
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

                <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                    <Ionicons name="create-outline" size={18} color="#FFFFFF" />
                    <Text style={styles.editButtonText}>
                        {profile ? 'Editar perfil' : 'Completar perfil'}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Informações esportivas</Text>
                <View style={styles.infoCard}>
                    <ProfileInfoItem
                        icon="football-outline"
                        label="Posição no campo"
                        value={profile?.fieldPosition}
                    />
                    <View style={styles.divider} />
                    <ProfileInfoItem
                        icon="grid-outline"
                        label="Posição no futsal"
                        value={profile?.futsalPosition}
                    />
                    <View style={styles.divider} />
                    <ProfileInfoItem
                        icon="footsteps-outline"
                        label="Pé dominante"
                        value={DOMINANT_FOOT_LABELS[profile?.dominantFoot]}
                    />
                    <View style={styles.divider} />
                    <ProfileInfoItem
                        icon="shirt-outline"
                        label="Número preferido"
                        value={profile?.preferredNumber}
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
