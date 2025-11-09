import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const sosStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 16,
  },

  // SOS Button Section
  sosButtonContainer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  sosTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A237E',
    marginBottom: 8,
    textAlign: 'center',
  },
  sosSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  sosButton: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#F44336',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F44336',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 6,
    borderColor: '#fff',
  },
  sosButtonIcon: {
    fontSize: 48,
    marginBottom: 4,
  },
  sosButtonText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 2,
  },
  sosButtonSubtext: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
    fontWeight: '600',
  },
  sosNote: {
    fontSize: 12,
    color: '#9E9E9E',
    marginTop: 20,
    textAlign: 'center',
  },

  // Emergency Contacts Section
  contactsSection: {
    marginTop: 24,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A237E',
    marginBottom: 16,
  },
  contactCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactCardCalling: {
    backgroundColor: '#E3F2FD',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.DARK_BLUE,
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactIcon: {
    fontSize: 36,
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A237E',
    marginBottom: 4,
  },
  contactDescription: {
    fontSize: 12,
    color: '#666',
  },
  contactRight: {
    alignItems: 'flex-end',
  },
  contactNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.DARK_BLUE,
    marginBottom: 8,
  },
  callButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  callButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },

  // Safety Tips Section
  tipsSection: {
    marginTop: 8,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  tipCard: {
    backgroundColor: '#FFF9C4',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#FBC02D',
  },
  tipIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  tipText: {
    fontSize: 13,
    color: '#5D4037',
    flex: 1,
    lineHeight: 18,
  },

  // Floating SOS Button (Global)
  floatingSosButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#F44336',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F44336',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#fff',
    zIndex: 1000,
  },
  floatingSosIcon: {
    fontSize: 32,
  },
  floatingSosText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
    marginTop: 2,
  },
});

export default sosStyles;
