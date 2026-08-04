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
  inputGroup: {
    marginBottom: theme.spacing.md,
  },
  inputGroupTop: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  rowGroup: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  flexOne: {
    flex: 1,
  },
  label: {
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  sectionLabel: {
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  scheduleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  scheduleOptionActive: {
    borderColor: theme.colors.primary,
    backgroundColor: '#EAF7EC',
  },
  scheduleIconContainer: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.md,
    backgroundColor: '#EAF7EC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scheduleTextContainer: {
    flex: 1,
  },
  scheduleTitle: {
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
  },
  scheduleSubtitle: {
    fontSize: theme.fontSize.xs,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    backgroundColor: '#EAF7EC',
    borderRadius: theme.radius.md,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  infoText: {
    flex: 1,
    fontSize: theme.fontSize.xs,
    fontFamily: theme.fonts.body,
    color: theme.colors.text,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
  },
  dayChip: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayChipActive: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
  },
  dayChipText: {
    fontSize: theme.fontSize.xs,
    fontFamily: theme.fonts.medium,
    color: theme.colors.textSecondary,
  },
  dayChipTextActive: {
    color: theme.colors.white,
  },
  continueButton: {
    marginTop: theme.spacing.sm,
  },
});