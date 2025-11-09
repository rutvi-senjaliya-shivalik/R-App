import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS, FF, FS } from '../../constants';

interface UnitCardProps {
  unitNumber: string;
  configuration: string;
  floor: string;
  facing: string;
  price: number;
  status: 'available' | 'sold' | 'blocked' | 'on-hold';
  onPress?: () => void;
  isSelected?: boolean;
}

// Home Icon
const HomeIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path
      d="M2 6L8 2L14 6V13C14 13.5304 13.7893 14.0391 13.4142 14.4142C13.0391 14.7893 12.5304 14 12 14H4C3.46957 14 2.96086 13.7893 2.58579 13.4142C2.21071 13.0391 2 12.5304 2 12V6Z"
      stroke="#9CA3AF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Compass Icon
const CompassIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path
      d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
      stroke="#9CA3AF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 6L9 9L6 10L7 7L10 6Z"
      stroke="#9CA3AF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const getStatusColor = (status: string) => {
  switch (status) {
    case 'available':
      return { bg: '#D1FAE5', text: '#059669' };
    case 'sold':
      return { bg: '#FEE2E2', text: '#DC2626' };
    case 'blocked':
      return { bg: '#FEF3C7', text: '#D97706' };
    case 'on-hold':
      return { bg: '#E0E7FF', text: '#4F46E5' };
    default:
      return { bg: '#F3F4F6', text: '#6B7280' };
  }
};

const formatPrice = (price: number): string => {
  const lakhs = price / 100000;
  if (lakhs >= 100) {
    return `₹${(lakhs / 100).toFixed(2)}Cr`;
  }
  return `₹${lakhs.toFixed(1)}L`;
};

const UnitCard: React.FC<UnitCardProps> = ({
  unitNumber,
  configuration,
  floor,
  facing,
  price,
  status,
  onPress,
  isSelected = false,
}) => {
  const statusColors = getStatusColor(status);
  const isAvailable = status === 'available';

  const CardWrapper = isAvailable ? TouchableOpacity : View;

  return (
    <CardWrapper
      style={[
        styles.card,
        isSelected && styles.selectedCard,
        !isAvailable && styles.disabledCard,
      ]}
      onPress={isAvailable ? onPress : undefined}
      activeOpacity={0.7}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.unitNumber}>{unitNumber}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusColors.bg }]}>
          <Text style={[styles.statusText, { color: statusColors.text }]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Text>
        </View>
      </View>

      {/* Configuration */}
      <Text style={styles.configuration}>{configuration}</Text>

      {/* Details */}
      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <HomeIcon />
          <Text style={styles.detailText}>{floor}</Text>
        </View>
        <View style={styles.detailItem}>
          <CompassIcon />
          <Text style={styles.detailText}>{facing}</Text>
        </View>
      </View>

      {/* Price */}
      <Text style={styles.price}>{formatPrice(price)}</Text>
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    gap: 8,
    borderWidth: 2,
    borderColor: '#D1D5DB',
  },
  selectedCard: {
    borderColor: COLORS.BLACK,
    backgroundColor: COLORS.WHITE,
  },
  disabledCard: {
    opacity: 0.6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unitNumber: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: '#6B7280',
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: FS.FS10,
    fontFamily: FF[600],
    fontWeight: '600',
  },
  configuration: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    fontWeight: '600',
  },
  detailsRow: {
    flexDirection: 'column',
    gap: 6,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: '#6B7280',
  },
  price: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    fontWeight: '600',
    marginTop: 4,
  },
});

export default UnitCard;
