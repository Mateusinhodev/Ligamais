import { StyleSheet } from "react-native";

const GREEN = '#3CB043';

const textShadow = {
  textShadowColor: 'rgba(0, 0, 0, 0.8)',
  textShadowOffset: { width: 0, height: 1 },
  textShadowRadius: 4,
};

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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: 20,
    alignItems: 'center',
  },
  logo: {
    width: 220,
    aspectRatio: 1,
  },
  formCard: {
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    gap: 20,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    ...textShadow,
  },
  formContainer: {
    width: '100%',
    gap: 14,
  },
  inputGroup: {
    width: '100%',
    gap: 8,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    ...textShadow,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    color: '#fff',
    fontSize: 15,
  },
  buttonPrimary: {
    backgroundColor: GREEN,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonPrimaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  footerText: {
    color: '#eee',
    fontSize: 14,
    textAlign: 'center',
    ...textShadow,
  },
  footerLink: {
    color: GREEN,
    fontWeight: '700',
  },
});