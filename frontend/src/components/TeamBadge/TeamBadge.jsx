import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./TeamBadge.style.js";

function TeamBadge({ color = '#ccc', size = 48 }) {
    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <Ionicons name="shield" size={size * 0.75} color={color} />
        </View>
    );
}

export default TeamBadge;