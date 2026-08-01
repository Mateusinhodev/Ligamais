import { useState } from "react";
import { Alert, View, ImageBackground, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useProfileForm } from "../../context/ProfileFormContext.jsx";
import Logo from "../../components/Logo/Logo.jsx";
import Button from "../../components/Button/Button.jsx";
import FormInput from "../../components/FormInput/FormInput.jsx";
import { styles } from "./register.style.js";

function Register() {
    const navigation = useNavigation();
    const { updateFormData } = useProfileForm();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function handleRegister() {
        if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            Alert.alert('Campos obrigatórios', 'Preencha todos os campos para continuar.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Senhas diferentes', 'As senhas informadas não coincidem. Verifique e tente novamente.');
            return;
        }

        // TODO: integrar com cadastro real (criar usuário via API) quando o backend estiver pronto
        console.log('Cadastro com:', { name, email, password });

        // Pré-preenche o nome completo no formulário de criação de perfil
        updateFormData({ fullName: name });

        navigation.navigate('CreateProfileStep1');
    }

    return (
        <View style={styles.container}>
            <ImageBackground 
                source={require('../../../assets/background.png')}
                resizeMode="cover"
                style={styles.background}
            > 
                <View style={styles.content}>
                    <View style={styles.logoContainer}>
                        <Logo style={styles.logo} />
                    </View>

                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.55)', 'rgba(0,0,0,0.85)']}
                        locations={[0, 0.25, 1]}
                        style={styles.formCard}
                    >
                        <Text style={styles.title}>Crie sua conta</Text>

                        <View style={styles.formContainer}>
                            <FormInput
                                label="Nome completo"
                                variant="dark"
                                placeholder="Seu nome"
                                autoCapitalize="words"
                                value={name}
                                onChangeText={setName}
                            />

                            <FormInput
                                label="E-mail"
                                variant="dark"
                                placeholder="seuemail@exemplo.com"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />

                            <FormInput
                                label="Senha"
                                variant="dark"
                                placeholder="Crie uma senha"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />

                            <FormInput
                                label="Confirmar senha"
                                variant="dark"
                                placeholder="Repita sua senha"
                                secureTextEntry
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                        </View>

                        <Button title="Criar conta" variant="primary" onPress={handleRegister} />

                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.footerText}>
                                Já tem conta? <Text style={styles.footerLink}>Entrar</Text>
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </ImageBackground>
        </View>
    )
}

export default Register;