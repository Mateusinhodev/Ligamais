import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./ScreenHeader.style.js";

function ScreenHeader({ title, subtitle, onBack, rightIcon, onRightPress }) {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={onBack}>
                <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
            </TouchableOpacity>

            <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitle}>{title}</Text>
                {subtitle && <Text style={styles.headerSubtitle}>{subtitle}</Text>}
            </View>

            {rightIcon ? (
                <TouchableOpacity onPress={onRightPress}>
                    <Ionicons name={rightIcon} size={22} color="#1A1A1A" />
                </TouchableOpacity>
            ) : (
                <View style={{ width: 24 }} />
            )}
        </View>
    );
}

export default ScreenHeader;