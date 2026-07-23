import { TouchableOpacity, Text, Dimensions } from "react-native";
import { styles } from "./Button.style.js";

const { height } = Dimensions.get('window');
const isSmallDevice = height < 700;

function Button({ title, onPress, variant = 'primary', disabled = false, style }) {
    const containerStyle = [
        styles.base,
        isSmallDevice && styles.baseSmall,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        disabled && styles.disabled,
        style,
    ];

    const textStyle = [
        styles.text,
        isSmallDevice && styles.textSmall,
    ];

    return (
        <TouchableOpacity 
            style={containerStyle} 
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.8}
        >
            <Text style={textStyle}>{title}</Text>
        </TouchableOpacity>
    );
}

export default Button;