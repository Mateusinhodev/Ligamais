import { StyleSheet, Dimensions } from "react-native";
import theme from "../../constants/theme.js";

const { height } = Dimensions.get('window');
const isSmallDevice = height < 700;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: isSmallDevice ? 30 : 60,
  },
  logo: {
    width: isSmallDevice ? 180 : 280,
    aspectRatio: 1,
  },
  buttonsContainer: {
    width: '100%',
    gap: theme.spacing.md,
    marginBottom: isSmallDevice ? 40 : 80,
  },
});