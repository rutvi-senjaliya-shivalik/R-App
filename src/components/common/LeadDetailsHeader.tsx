import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { COLORS, FF, FS } from '../../constants';

interface LeadDetailsHeaderProps {
  name: string;
  projectName: string;
  status: string;
  isOnHold: boolean;
  onHoldToggle: (value: boolean) => void;
  holdMessage?: string;
  lastUpdated: string;
}

// Clock Icon
const ClockIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Circle cx="10" cy="10" r="8" stroke="#EF4444" strokeWidth="2" />
    <Path
      d="M10 5V10L13 13"
      stroke="#EF4444"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

// Get status badge color
const getStatusColor = (status: string): { bg: string; text: string } => {
  switch (status) {
    case 'New Lead':
      return { bg: '#3B82F6', text: '#FFFFFF' };
    case 'Contacted':
      return { bg: '#8B5CF6', text: '#FFFFFF' };
    case 'Site Visit Scheduled':
      return { bg: '#F59E0B', text: '#FFFFFF' };
    case 'Site Visit Completed':
      return { bg: '#10B981', text: '#FFFFFF' };
    case 'Negotiation':
      return { bg: '#F97316', text: '#FFFFFF' };
    case 'Booking in Progress':
      return { bg: '#06B6D4', text: '#FFFFFF' };
    case 'Booked':
      return { bg: '#22C55E', text: '#FFFFFF' };
    case 'Lost/Dead':
      return { bg: '#EF4444', text: '#FFFFFF' };
    default:
      return { bg: '#6B7280', text: '#FFFFFF' };
  }
};

const LeadDetailsHeader: React.FC<LeadDetailsHeaderProps> = ({
  name,
  projectName,
  status,
  isOnHold,
  onHoldToggle,
  holdMessage = 'Hold will be removed in 48 hours',
  lastUpdated,
}) => {
  const statusColors = getStatusColor(status);

  return (
    <View style={styles.container}>
      {/* Name and Toggle Row */}
      <View style={styles.headerRow}>
        <View style={styles.nameSection}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.projectName}>{projectName}</Text>
        </View>
        <View style={styles.toggleSection}>
          <Switch
            value={isOnHold}
            onValueChange={onHoldToggle}
            trackColor={{ false: '#D1D5DB', true: '#000000' }}
            thumbColor={COLORS.WHITE}
          />
          <Text style={styles.toggleLabel}>On Hold</Text>
        </View>
      </View>

      {/* Status Badge */}
      <View
        style={[styles.statusBadge, { backgroundColor: statusColors.bg }]}
      >
        <Text style={[styles.statusText, { color: statusColors.text }]}>
          {status}
        </Text>
      </View>

      {/* Hold Alert */}
      {isOnHold && (
        <View style={styles.holdAlert}>
          <ClockIcon />
          <View style={styles.holdTextContainer}>
            <Text style={styles.holdTitle}>Unit On Hold</Text>
            <Text style={styles.holdMessage}>{holdMessage}</Text>
          </View>
        </View>
      )}

      {/* Last Updated */}
      <Text style={styles.lastUpdated}>Last Updated: {lastUpdated}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  nameSection: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: FS.FS20,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    fontWeight: '600',
  },
  projectName: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: '#6B7280',
  },
  toggleSection: {
    alignItems: 'center',
    gap: 4,
  },
  toggleLabel: {
    fontSize: FS.FS12,
    fontFamily: FF[500],
    color: '#6B7280',
    fontWeight: '500',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  statusText: {
    fontSize: FS.FS12,
    fontFamily: FF[500],
    fontWeight: '500',
  },
  holdAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    padding: 12,
  },
  holdTextContainer: {
    flex: 1,
    gap: 2,
  },
  holdTitle: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: '#EF4444',
    fontWeight: '600',
  },
  holdMessage: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: '#EF4444',
  },
  lastUpdated: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: '#9CA3AF',
  },
});

export default LeadDetailsHeader;
