import { View, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/Button/Button.jsx";
import Logo from "../../components/Logo/Logo.jsx";
import { styles } from "./splash.style.js";

function Splash() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <ImageBackground 
                source={require('../../../assets/background.png')}
                resizeMode="cover"
                style={styles.background}
            > 
                <View style={styles.content}>
                    <View style={styles.logoContainer}>
                        <Logo style={styles.logo} />
                    </View>

                    <View style={styles.buttonsContainer}>
                        <Button 
                            title="Entrar" 
                            variant="primary"
                            onPress={() => navigation.navigate('Login')} 
                        />
                        <Button 
                            title="Criar conta" 
                            variant="secondary"
                            onPress={() => navigation.navigate('Register')} 
                        />
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

export default Splash;