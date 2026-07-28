import { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./CustomSelect.style.js";

function CustomSelect({ label, placeholder = "Selecione", options, value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);

    const selectedOption = options.find((opt) => opt.value === value);

    function handleSelect(optionValue) {
        onChange(optionValue);
        setIsOpen(false);
    }

    return (
        <>
            <TouchableOpacity 
                style={styles.selectButton} 
                onPress={() => setIsOpen(true)}
                activeOpacity={0.7}
            >
                <Text style={selectedOption ? styles.selectedText : styles.placeholderText}>
                    {selectedOption ? selectedOption.label : placeholder}
                </Text>
                <Ionicons name="chevron-down" size={18} color="#666" />
            </TouchableOpacity>

            <Modal
                visible={isOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setIsOpen(false)}
            >
                <Pressable style={styles.overlay} onPress={() => setIsOpen(false)}>
                    <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{label || placeholder}</Text>
                            <TouchableOpacity onPress={() => setIsOpen(false)}>
                                <Ionicons name="close" size={22} color="#1A1A1A" />
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.value}
                            style={styles.optionsList}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.optionItem,
                                        item.value === value && styles.optionItemActive,
                                    ]}
                                    onPress={() => handleSelect(item.value)}
                                >
                                    <Text 
                                        style={[
                                            styles.optionText,
                                            item.value === value && styles.optionTextActive,
                                        ]}
                                    >
                                        {item.label}
                                    </Text>
                                    {item.value === value && (
                                        <Ionicons name="checkmark" size={18} color="#2E9E44" />
                                    )}
                                </TouchableOpacity>
                            )}
                        />
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    );
}

export default CustomSelect;