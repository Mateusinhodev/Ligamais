import { Image } from "react-native";
import { styles } from "./Logo.style.js";

function Logo({ style }) {
    return (
        <Image 
            source={require('../../../assets/logo.png')}
            resizeMode="contain"
            style={[styles.logo, style]}
        />
    );
}

export default Logo;