import { StyleSheet } from "react-native";
import theme from "../../../constants/theme.js";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.xl,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  filterTab: {
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
  },
  filterText: {
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fonts.medium,
    color: theme.colors.textSecondary,
  },
  filterTextActive: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.semiBold,
  },
  filterUnderline: {
    height: 2,
    width: '100%',
    backgroundColor: theme.colors.primary,
    marginTop: 6,
    borderRadius: 1,
  },
  content: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  matchCard: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  matchRound: {
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  matchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  matchCenter: {
    flex: 0.8,
    alignItems: 'center',
  },
  matchScore: {
    fontSize: theme.fontSize.lg,
    fontFamily: theme.fonts.heading,
    color: theme.colors.text,
  },
  matchVs: {
    fontSize: theme.fontSize.md,
    fontFamily: theme.fonts.heading,
    color: theme.colors.textSecondary,
  },
  matchInfo: {
    fontSize: theme.fontSize.xs,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
  scheduledBadge: {
    alignSelf: 'center',
    backgroundColor: '#EAF7EC',
    borderRadius: theme.radius.pill,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 4,
    marginTop: theme.spacing.sm,
  },
  scheduledBadgeText: {
    fontSize: theme.fontSize.xs,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.primary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  emptyText: {
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
});