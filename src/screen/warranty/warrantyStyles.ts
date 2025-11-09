import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const warrantyStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  categoryContainer: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  categoryChipActive: {
    backgroundColor: COLORS.DARK_BLUE,
    borderColor: COLORS.DARK_BLUE,
  },
  categoryChipText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  categoryChipTextActive: {
    color: '#fff',
  },
  contentWrapper: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    marginBottom: 12,
  },
  categoryBadge: {
    fontSize: 11,
    color: COLORS.DARK_BLUE,
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
    fontWeight: '600',
  },
  brandName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A237E',
    marginBottom: 4,
  },
  productName: {
    fontSize: 14,
    color: '#616161',
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#757575',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#212121',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  serviceCenterTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#424242',
    marginBottom: 8,
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  callButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  callButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  emailButton: {
    flex: 1,
    backgroundColor: COLORS.DARK_BLUE,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  emailButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#9E9E9E',
    fontWeight: '500',
  },
});

export default warrantyStyles;
