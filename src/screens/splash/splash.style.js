import { StyleSheet } from "react-native";
import theme from "../../constants/theme.js";

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
    marginBottom: 60,
  },
  logo: {
    width: 280,
    aspectRatio: 1,
  },
  buttonsContainer: {
    width: '100%',
    gap: theme.spacing.md,
    marginBottom: 80,
  },
  buttonPrimary: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: theme.radius.pill,
    alignItems: 'center',
  },
  buttonPrimaryText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.md,
    fontFamily: theme.fonts.button,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: theme.radius.pill,
    alignItems: 'center',
  },
  buttonSecondaryText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.md,
    fontFamily: theme.fonts.button,
  },
});