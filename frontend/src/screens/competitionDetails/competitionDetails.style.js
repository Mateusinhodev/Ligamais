import { StyleSheet } from "react-native";
import theme from "../../constants/theme.js";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  banner: {
    height: 170,
    paddingTop: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  bannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerHeaderTitle: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: theme.spacing.sm,
    fontSize: theme.fontSize.md,
    fontFamily: theme.fonts.heading,
    color: theme.colors.white,
  },
  bannerContent: {
    alignItems: 'center',
    gap: 4,
    paddingBottom: theme.spacing.lg,
  },
  bannerLogo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: theme.colors.white,
    marginBottom: 4,
  },
  bannerDates: {
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fonts.body,
    color: 'rgba(255,255,255,0.85)',
  },
  statusBadge: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.pill,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 4,
    marginTop: 4,
  },
  statusBadgeText: {
    fontSize: theme.fontSize.xs,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.white,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.background,
  },
  notFoundText: {
    fontSize: theme.fontSize.md,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
  },
  notFoundLink: {
    fontSize: theme.fontSize.md,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.primary,
  },
});