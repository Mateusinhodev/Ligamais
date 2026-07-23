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
    width: '100%',
    gap: isSmallDevice ? theme.spacing.xs : theme.spacing.sm,
  },
  label: {
    color: theme.colors.text,
    fontSize: isSmallDevice ? theme.fontSize.xs : theme.fontSize.sm,
    fontFamily: theme.fonts.semiBold,
  },
  labelDark: {
    color: theme.colors.white,
    fontFamily: theme.fonts.medium,
    ...textShadow,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    height: 48,
    paddingHorizontal: theme.spacing.md,
    fontSize: isSmallDevice ? theme.fontSize.sm : theme.fontSize.md,
    fontFamily: theme.fonts.body,
    color: theme.colors.text,
    backgroundColor: theme.colors.surface,
  },
  inputDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    color: theme.colors.white,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.fontSize.xs,
    fontFamily: theme.fonts.body,
  },
});