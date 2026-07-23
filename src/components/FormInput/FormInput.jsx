import { View, Text, TextInput } from "react-native";
import { styles } from "./FormInput.style.js";

function FormInput({ 
    label, 
    variant = 'light',
    error,
    ...textInputProps 
}) {
    const isDark = variant === 'dark';

    return (
        <View style={styles.container}>
            {label && (
                <Text style={[styles.label, isDark && styles.labelDark]}>
                    {label}
                </Text>
            )}
            <TextInput
                style={[styles.input, isDark && styles.inputDark]}
                placeholderTextColor={isDark ? '#ccc' : '#999'}
                {...textInputProps}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

export default FormInput;