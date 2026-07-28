import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./ImagePickerAvatar.style.js";

function ImagePickerAvatar({ 
    value, 
    onChange, 
    label = 'Adicionar foto',
    size = 96,
    placeholderIcon = 'camera',
    editIcon = 'camera-outline',
}) {
    async function handlePick() {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            console.log('Permissão de galeria negada');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled) {
            onChange(result.assets[0].uri);
        }
    }

    return (
        <TouchableOpacity style={styles.container} onPress={handlePick}>
            <View style={[styles.wrapper, { width: size, height: size }]}>
                <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2 }]}>
                    {value ? (
                        <Image source={{ uri: value }} style={styles.image} />
                    ) : (
                        <Ionicons name={placeholderIcon} size={size * 0.3} color="#fff" />
                    )}
                </View>
                <View style={styles.editBadge}>
                    <Ionicons name={editIcon} size={14} color="#fff" />
                </View>
            </View>
            {label && <Text style={styles.label}>{label}</Text>}
        </TouchableOpacity>
    );
}

export default ImagePickerAvatar;