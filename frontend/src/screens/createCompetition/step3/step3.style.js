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
  teamCard: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  teamHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  teamHeaderTitle: {
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
  },
  teamBody: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  shieldContainer: {
    width: 64,
    height: 64,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamFields: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: theme.spacing.sm,
  },
  label: {
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  addTeamButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderStyle: 'dashed',
    borderRadius: theme.radius.md,
    paddingVertical: 14,
    marginBottom: theme.spacing.md,
  },
  addTeamText: {
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.primary,
  },
  continueButton: {
    marginTop: theme.spacing.sm,
  },
});