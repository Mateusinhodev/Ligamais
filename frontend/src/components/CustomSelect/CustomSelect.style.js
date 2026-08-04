import { StyleSheet } from "react-native";
import theme from "../../constants/theme.js";

export const styles = StyleSheet.create({
  selectButton: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface,
    height: 48,
    paddingHorizontal: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  placeholderText: {
    fontSize: theme.fontSize.md,
    fontFamily: theme.fonts.body,
    color: '#999',
  },
  selectedText: {
    fontSize: theme.fontSize.md,
    fontFamily: theme.fonts.body,
    color: theme.colors.text,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
    maxHeight: '60%',
    paddingBottom: theme.spacing.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  modalTitle: {
    fontSize: theme.fontSize.lg,
    fontFamily: theme.fonts.heading,
    color: theme.colors.text,
  },
  optionsList: {
    paddingHorizontal: theme.spacing.md,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.radius.sm,
  },
  optionItemActive: {
    backgroundColor: '#EAF7EC',
  },
  optionText: {
    fontSize: theme.fontSize.md,
    fontFamily: theme.fonts.body,
    color: theme.colors.text,
  },
  optionTextActive: {
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.primary,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionItemDisabled: {
    opacity: 0.5,
  },
  optionTextDisabled: {
    color: '#999',
  },
  optionDisabledReason: {
    fontSize: theme.fontSize.xs,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
    selectedContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    flex: 1,
  },
  optionContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    flex: 1,
  },
  colorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
});