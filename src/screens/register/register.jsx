import { useState } from "react";
import { View, ImageBackground, Image, Text, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./register.style.js";

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function handleRegister() {
        console.log('Cadastro com:', { name, email, password, confirmPassword });
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
                        <Text style={styles.title}>Crie sua conta</Text>

                        <View style={styles.formContainer}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Nome completo</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Seu nome"
                                    placeholderTextColor="#ccc"
                                    autoCapitalize="words"
                                    value={name}
                                    onChangeText={setName}
                                />
                            </View>

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
                                    placeholder="Crie uma senha"
                                    placeholderTextColor="#ccc"
                                    secureTextEntry
                                    value={password}
                                    onChangeText={setPassword}
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Confirmar senha</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Repita sua senha"
                                    placeholderTextColor="#ccc"
                                    secureTextEntry
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                />
                            </View>
                        </View>

                        <TouchableOpacity 
                            style={styles.buttonPrimary}
                            onPress={handleRegister}
                        >
                            <Text style={styles.buttonPrimaryText}>Criar conta</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => console.log('Ir para login')}>
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