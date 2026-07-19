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
  buttonPrimary: {
    backgroundColor: theme.colors.primary,
    paddingVertical: isSmallDevice ? 12 : 16,
    borderRadius: theme.radius.pill,
    alignItems: 'center',
  },
  buttonPrimaryText: {
    color: theme.colors.white,
    fontSize: isSmallDevice ? theme.fontSize.sm : theme.fontSize.md,
    fontFamily: theme.fonts.button,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    paddingVertical: isSmallDevice ? 12 : 16,
    borderRadius: theme.radius.pill,
    alignItems: 'center',
  },
  buttonSecondaryText: {
    color: theme.colors.white,
    fontSize: isSmallDevice ? theme.fontSize.sm : theme.fontSize.md,
    fontFamily: theme.fonts.button,
  },
});