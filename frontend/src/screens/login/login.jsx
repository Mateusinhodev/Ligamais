import { useState } from "react";
import { Alert, View, ImageBackground, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext.jsx";
import Logo from "../../components/Logo/Logo.jsx";
import Button from "../../components/Button/Button.jsx";
import FormInput from "../../components/FormInput/FormInput.jsx";
import { styles } from "./login.style.js";

function Login() {
    const navigation = useNavigation();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Campos obrigatórios', 'Informe seu e-mail e sua senha para continuar.');
            return;
        }

        // TODO: substituir por chamada real à API de autenticação quando o backend existir
        const result = await login({ email, name: email.split('@')[0] });

        if (result.success) {
            navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
        } else {
            Alert.alert('Erro ao entrar', 'Não foi possível concluir o login. Tente novamente.');
        }
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
                        <Text style={styles.title}>Bem-vindo de volta</Text>

                        <View style={styles.formContainer}>
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
                                placeholder="Sua senha"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />

                            <TouchableOpacity onPress={() => console.log('Esqueci a senha')}>
                                <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
                            </TouchableOpacity>
                        </View>

                        <Button title="Entrar" variant="primary" onPress={handleLogin} />

                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.footerText}>
                                Não tem conta? <Text style={styles.footerLink}>Criar conta</Text>
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </ImageBackground>
        </View>
    )
}

export default Login;