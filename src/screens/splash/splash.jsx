import { View, ImageBackground, Image, Text, TouchableOpacity } from "react-native";
import { styles } from "./splash.style.js";

function Splash() {
    return (
        <View style={styles.container}>
            <ImageBackground 
                source={require('../../../assets/background.png')}
                resizeMode="cover"
                style={styles.background}
            > 
                <View style={styles.content}>
                    <View style={styles.logoContainer}>
                        <Image 
                            source={require('../../../assets/logo.png')}
                            resizeMode="contain"
                            style={styles.logo}
                        />
                    </View>

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity 
                            style={styles.buttonPrimary}
                            onPress={() => console.log('Entrar')}
                        >
                            <Text style={styles.buttonPrimaryText}>Entrar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.buttonSecondary}
                            onPress={() => console.log('Criar conta')}
                        >
                            <Text style={styles.buttonSecondaryText}>Criar conta</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

export default Splash;