import { View, Text, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./FormInput.style.js";

function FormInput({ 
    label, 
    variant = 'light',
    error,
    style,
    inputStyle,
    rightIcon,
    ...textInputProps 
}) {
    const isDark = variant === 'dark';

    return (
        <View style={[styles.container, style]}>
            {label && (
                <Text style={[styles.label, isDark && styles.labelDark]}>
                    {label}
                </Text>
            )}
            <View style={styles.inputWrapper}>
                <TextInput
                    style={[
                        styles.input, 
                        isDark && styles.inputDark, 
                        rightIcon && styles.inputWithIcon,
                        inputStyle,
                    ]}
                    placeholderTextColor={isDark ? '#ccc' : '#999'}
                    {...textInputProps}
                />
                {rightIcon && (
                    <View style={styles.iconContainer} pointerEvents="none">
                        <Ionicons name={rightIcon} size={18} color={isDark ? '#ccc' : '#999'} />
                    </View>
                )}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

export default FormInput;