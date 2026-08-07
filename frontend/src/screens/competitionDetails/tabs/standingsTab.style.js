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
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingBottom: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  },
  headerCell: {
    fontSize: theme.fontSize.xs,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.textSecondary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  cell: {
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fonts.body,
    color: theme.colors.text,
    textAlign: 'center',
  },
  posCell: {
    width: 32,
    textAlign: 'center',
  },
  teamCell: {
    width: 140,
  },
  teamCellRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  teamName: {
    flex: 1,
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
  },
  statCell: {
    width: 36,
  },
  pointsCell: {
    width: 32,
  },
  pointsText: {
    fontFamily: theme.fonts.heading,
    color: theme.colors.primary,
  },
  legendContainer: {
    marginTop: theme.spacing.lg,
    gap: 4,
  },
  legendText: {
    fontSize: theme.fontSize.xs,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
  },
  legendAbbr: {
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
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
  },
});