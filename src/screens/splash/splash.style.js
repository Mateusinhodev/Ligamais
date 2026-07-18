import { StyleSheet } from "react-native";

const GREEN = '#3CB043';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 140,
  },
  logo: {
    width: 280,
    aspectRatio: 1,
  },
  buttonsContainer: {
    width: '100%',
    gap: 14,
    marginBottom: 80,
  },
  buttonPrimary: {
    backgroundColor: GREEN,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonPrimaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: GREEN,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonSecondaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});