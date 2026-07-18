import { StyleSheet } from "react-native";
import theme from "../../constants/theme.js";

const textShadow = {
  textShadowColor: 'rgba(0, 0, 0, 0.8)',
  textShadowOffset: { width: 0, height: 1 },
  textShadowRadius: 4,
};

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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: -20,
    alignItems: 'center',
  },
  logo: {
    width: 280,
    aspectRatio: 1,
  },
  formCard: {
    width: '100%',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 20,
    paddingBottom: theme.spacing.xl + theme.spacing.sm,
    gap: theme.spacing.md,
  },
  title: {
    color: theme.colors.white,
    fontSize: theme.fontSize.xl,
    fontFamily: theme.fonts.heading,
    textAlign: 'center',
    ...textShadow,
  },
  formContainer: {
    width: '100%',
    gap: theme.spacing.sm + theme.spacing.xs,
  },
  inputGroup: {
    width: '100%',
    gap: theme.spacing.sm,
  },
  label: {
    color: theme.colors.white,
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fonts.medium,
    ...textShadow,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: theme.radius.md,
    paddingVertical: 14,
    paddingHorizontal: theme.spacing.md,
    color: theme.colors.white,
    fontSize: theme.fontSize.md,
    fontFamily: theme.fonts.body,
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
  footerText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fonts.body,
    textAlign: 'center',
    ...textShadow,
  },
  footerLink: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.semiBold,
  },
});