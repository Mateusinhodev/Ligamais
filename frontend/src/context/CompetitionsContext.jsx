import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CompetitionsContext = createContext();

const STORAGE_KEY = '@ligamais:competitions';

export function CompetitionsProvider({ children }) {
    const [competitions, setCompetitions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadStoredCompetitions();
    }, []);

    async function loadStoredCompetitions() {
        try {
            const stored = await AsyncStorage.getItem(STORAGE_KEY);
            if (stored) {
                setCompetitions(JSON.parse(stored));
            }
        } catch (error) {
            console.log('Erro ao carregar competições salvas:', error);
        } finally {
            setIsLoading(false);
        }
    }

    async function persist(updatedList) {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
        } catch (error) {
            console.log('Erro ao salvar competições:', error);
        }
    }

    // TODO: quando o backend existir, essa função deve chamar a API
    // (POST /competitions) e usar o id/código retornado por ela, em vez
    // de gerar tudo localmente.
    async function addCompetition(competition) {
        const updatedList = [competition, ...competitions];
        setCompetitions(updatedList);
        await persist(updatedList);
        return competition;
    }

    return (
        <CompetitionsContext.Provider value={{ competitions, isLoading, addCompetition }}>
            {children}
        </CompetitionsContext.Provider>
    );
}

export function useCompetitions() {
    const context = useContext(CompetitionsContext);
    if (!context) {
        throw new Error('useCompetitions deve ser usado dentro de um CompetitionsProvider');
    }
    return context;
}