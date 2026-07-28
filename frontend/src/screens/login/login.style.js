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
  forgotPassword: {
    color: theme.colors.primary,
    fontSize: isSmallDevice ? theme.fontSize.xs : theme.fontSize.sm,
    fontFamily: theme.fonts.semiBold,
    textAlign: 'right',
    marginTop: -8,
    ...textShadow,
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