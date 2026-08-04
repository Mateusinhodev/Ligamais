import { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./CustomSelect.style.js";

function CustomSelect({ label, placeholder = "Selecione", options, value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);

    const selectedOption = options.find((opt) => opt.value === value);

    function handleSelect(option) {
        if (option.disabled) return;
        onChange(option.value);
        setIsOpen(false);
    }

    return (
        <>
            <TouchableOpacity 
                style={styles.selectButton} 
                onPress={() => setIsOpen(true)}
                activeOpacity={0.7}
            >
                <View style={styles.selectedContentRow}>
                    {selectedOption?.color && (
                        <View style={[styles.colorDot, { backgroundColor: selectedOption.color }]} />
                    )}
                    <Text style={selectedOption ? styles.selectedText : styles.placeholderText}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </Text>
                </View>
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
                                        item.disabled && styles.optionItemDisabled,
                                    ]}
                                    onPress={() => handleSelect(item)}
                                    disabled={item.disabled}
                                >
                                    <View style={styles.optionContentRow}>
                                        {item.color && (
                                            <View style={[styles.colorDot, { backgroundColor: item.color }]} />
                                        )}
                                        <View style={styles.optionTextContainer}>
                                            <Text 
                                                style={[
                                                    styles.optionText,
                                                    item.value === value && styles.optionTextActive,
                                                    item.disabled && styles.optionTextDisabled,
                                                ]}
                                            >
                                                {item.label}
                                            </Text>
                                            {item.disabled && item.disabledReason && (
                                                <Text style={styles.optionDisabledReason}>
                                                    {item.disabledReason}
                                                </Text>
                                            )}
                                        </View>
                                    </View>
                                    {item.value === value && !item.disabled && (
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