import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./placeholderTab.style.js";

function PlaceholderTab() {
    return (
        <View style={styles.container}>
            <Ionicons name="construct-outline" size={36} color="#ccc" />
            <Text style={styles.text}>Essa seção estará disponível em breve.</Text>
        </View>
    );
}

export default PlaceholderTab;