import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

const STORAGE_KEY = '@ligamais:user';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Ao abrir o app, tenta recuperar o usuário salvo anteriormente
    useEffect(() => {
        loadStoredUser();
    }, []);

    async function loadStoredUser() {
        try {
            const storedUser = await AsyncStorage.getItem(STORAGE_KEY);
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.log('Erro ao carregar usuário salvo:', error);
        } finally {
            setIsLoading(false);
        }
    }

    async function login(userData) {
        try {
            // TODO: quando o backend existir, aqui entra a chamada de API
            // e o que salvamos deve ser o token + dados retornados, nunca a senha
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
            setUser(userData);
            return { success: true };
        } catch (error) {
            console.log('Erro ao salvar usuário:', error);
            return { success: false, error };
        }
    }

    async function logout() {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
            setUser(null);
        } catch (error) {
            console.log('Erro ao fazer logout:', error);
        }
    }

    async function updateUser(fields) {
        const updatedUser = { ...user, ...fields };
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
            setUser(updatedUser);
        } catch (error) {
            console.log('Erro ao atualizar usuário:', error);
        }
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
}