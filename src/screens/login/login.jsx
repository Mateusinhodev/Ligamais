import { useState } from "react";
import { View, ImageBackground, Image, Text, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./login.style.js";

function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {
        // TODO: integrar com autenticação real quando o backend estiver pronto
        console.log('Login com:', { email, password });
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
                        <Image 
                            source={require('../../../assets/logo.png')}
                            resizeMode="contain"
                            style={styles.logo}
                        />
                    </View>

                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.55)', 'rgba(0,0,0,0.85)']}
                        locations={[0, 0.25, 1]}
                        style={styles.formCard}
                    >
                        <Text style={styles.title}>Bem-vindo de volta</Text>

                        <View style={styles.formContainer}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>E-mail</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="seuemail@exemplo.com"
                                    placeholderTextColor="#ccc"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={email}
                                    onChangeText={setEmail}
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Senha</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Sua senha"
                                    placeholderTextColor="#ccc"
                                    secureTextEntry
                                    value={password}
                                    onChangeText={setPassword}
                                />
                            </View>

                            <TouchableOpacity onPress={() => console.log('Esqueci a senha')}>
                                <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity 
                            style={styles.buttonPrimary}
                            onPress={handleLogin}
                        >
                            <Text style={styles.buttonPrimaryText}>Entrar</Text>
                        </TouchableOpacity>

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