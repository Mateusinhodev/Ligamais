import { StyleSheet, Dimensions } from "react-native";
import theme from "../../constants/theme.js";

const { height } = Dimensions.get('window');

// Breakpoint: telas com menos de 700pt de altura (ex: iPhone SE) são
// consideradas "pequenas" e recebem tamanhos/espaçamentos reduzidos.
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
    top: isSmallDevice ? -50 : -20,
    alignItems: 'center',
  },
  logo: {
    width: isSmallDevice ? 190 : 280,
  },
  formCard: {
    width: '100%',
    paddingHorizontal: isSmallDevice ? theme.spacing.md : theme.spacing.lg,
    paddingTop: isSmallDevice ? 10 : 20,
    paddingBottom: isSmallDevice 
      ? theme.spacing.lg 
      : theme.spacing.xl + theme.spacing.sm,
    gap: isSmallDevice ? theme.spacing.sm : theme.spacing.md,
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
    gap: isSmallDevice ? theme.spacing.sm : theme.spacing.sm + theme.spacing.xs,
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