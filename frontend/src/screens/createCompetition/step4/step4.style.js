import { StyleSheet } from "react-native";
import theme from "../../../constants/theme.js";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  cardTitle: {
    fontSize: theme.fontSize.xl,
    fontFamily: theme.fonts.heading,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  cardSubtitle: {
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  reviewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  reviewIconContainer: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.md,
    backgroundColor: '#EAF7EC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewTextContainer: {
    flex: 1,
  },
  reviewLabel: {
    fontSize: theme.fontSize.xs,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
  },
  reviewValue: {
    fontSize: theme.fontSize.md,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
    marginTop: 2,
  },
  createButton: {
    marginTop: theme.spacing.lg,
  },
});