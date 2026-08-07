import { StyleSheet } from "react-native";
import theme from "../../../constants/theme.js";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.fontSize.md,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  statValue: {
    fontSize: theme.fontSize.xl,
    fontFamily: theme.fonts.heading,
    color: theme.colors.text,
  },
  statLabel: {
    fontSize: theme.fontSize.xs,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  matchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
  },
  matchTeamColumn: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  matchTeamName: {
    fontSize: theme.fontSize.xs,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
    textAlign: 'center',
  },
  matchInfoColumn: {
    flex: 1.2,
    alignItems: 'center',
    gap: 2,
  },
  matchRound: {
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
  },
  matchDateTime: {
    fontSize: theme.fontSize.xs,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
  },
  matchLocation: {
    fontSize: theme.fontSize.xs,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
  },
  emptyText: {
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.md,
  },
});