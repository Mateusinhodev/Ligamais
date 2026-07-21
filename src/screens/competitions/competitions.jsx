import { View, Text, StyleSheet } from "react-native";
import theme from "../../constants/theme.js";

function Competitions() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Competições (em breve)</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: theme.fontSize.lg,
        fontFamily: theme.fonts.medium,
        color: theme.colors.textSecondary,
    },
});

export default Competitions;