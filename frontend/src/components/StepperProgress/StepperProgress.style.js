import { StyleSheet } from "react-native";
import theme from "../../constants/theme.js";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  item: {
    alignItems: 'center',
    width: 100,
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  circleActive: {
    backgroundColor: theme.colors.primary,
  },
  circleText: {
    color: theme.colors.white,
    fontFamily: theme.fonts.button,
    fontSize: theme.fontSize.sm,
  },
  circleTextInactive: {
    color: theme.colors.textSecondary,
  },
  label: {
    fontSize: theme.fontSize.xs,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  labelActive: {
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.primary,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: theme.colors.border,
    marginTop: 13,
    marginHorizontal: -20,
  },
  lineActive: {
    backgroundColor: theme.colors.primary,
  },
});