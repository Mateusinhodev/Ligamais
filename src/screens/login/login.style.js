import { StyleSheet, Dimensions } from "react-native";
import theme from "../../constants/theme.js";

const { height } = Dimensions.get('window');
const isSmallDevice = height < 700;

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
    top: isSmallDevice ? -30 : 0,
    alignItems: 'center',
  },
  logo: {
    width: isSmallDevice ? 200 : 280,
    aspectRatio: 1,
  },
  formCard: {
    width: '100%',
    paddingHorizontal: isSmallDevice ? theme.spacing.md : theme.spacing.lg,
    paddingTop: isSmallDevice ? 30 : 60,
    paddingBottom: isSmallDevice 
      ? theme.spacing.lg 
      : theme.spacing.xl + theme.spacing.sm,
    gap: isSmallDevice ? theme.spacing.md : theme.spacing.lg,
  },
  title: {
    color: theme.colors.white,
    fontSize: isSmallDevice ? theme.fontSize.lg : theme.fontSize.xl,
    fontFamily: theme.fonts.heading,
    textAlign: 'center',
    ...textShadow,
  },
  formContainer: {
    width: '100%',
    gap: isSmallDevice ? theme.spacing.sm : theme.spacing.md,
  },
  inputGroup: {
    width: '100%',
    gap: isSmallDevice ? theme.spacing.xs : theme.spacing.sm,
  },
  label: {
    color: theme.colors.white,
    fontSize: isSmallDevice ? theme.fontSize.xs : theme.fontSize.sm,
    fontFamily: theme.fonts.medium,
    ...textShadow,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: theme.radius.md,
    paddingVertical: isSmallDevice ? 10 : 14,
    paddingHorizontal: theme.spacing.md,
    color: theme.colors.white,
    fontSize: isSmallDevice ? theme.fontSize.sm : theme.fontSize.md,
    fontFamily: theme.fonts.body,
  },
  forgotPassword: {
    color: theme.colors.primary,
    fontSize: isSmallDevice ? theme.fontSize.xs : theme.fontSize.sm,
    fontFamily: theme.fonts.semiBold,
    textAlign: 'right',
    marginTop: -8,
    ...textShadow,
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
  footerText: {
    color: theme.colors.white,
    fontSize: isSmallDevice ? theme.fontSize.xs : theme.fontSize.sm,
    fontFamily: theme.fonts.body,
    textAlign: 'center',
    ...textShadow,
  },
  footerLink: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.semiBold,
  },
});