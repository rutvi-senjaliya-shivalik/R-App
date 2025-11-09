import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS, FF, FS } from '../../constants';

export type LeadStatus = 
  | 'New Lead'
  | 'Contacted'
  | 'Site Visit Scheduled'
  | 'Site Visit Completed'
  | 'Negotiation'
  | 'Booking in Progress'
  | 'Booked'
  | 'Lost/Dead';

interface LeadCardProps {
  name: string;
  projectName: string;
  status: LeadStatus;
  managedBy: string;
  lastContact: string;
  onPress?: () => void;
  priority?: 'high' | 'medium' | 'low';
}

// Arrow Right Icon
const ArrowRightIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 18L15 12L9 6"
      stroke="#6B7280"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Get status badge color
const getStatusColor = (status: LeadStatus): { bg: string; text: string } => {
  switch (status) {
    case 'New Lead':
      return { bg: '#3B82F6', text: '#FFFFFF' }; // Blue
    case 'Contacted':
      return { bg: '#8B5CF6', text: '#FFFFFF' }; // Purple
    case 'Site Visit Scheduled':
      return { bg: '#F59E0B', text: '#FFFFFF' }; // Orange
    case 'Site Visit Completed':
      return { bg: '#10B981', text: '#FFFFFF' }; // Green
    case 'Negotiation':
      return { bg: '#F97316', text: '#FFFFFF' }; // Dark Orange
    case 'Booking in Progress':
      return { bg: '#06B6D4', text: '#FFFFFF' }; // Cyan
    case 'Booked':
      return { bg: '#22C55E', text: '#FFFFFF' }; // Bright Green
    case 'Lost/Dead':
      return { bg: '#EF4444', text: '#FFFFFF' }; // Red
    default:
      return { bg: '#6B7280', text: '#FFFFFF' }; // Gray
  }
};

// Get priority indicator color
const getPriorityColor = (priority?: 'high' | 'medium' | 'low'): string => {
  switch (priority) {
    case 'high':
      return '#EF4444'; // Red
    case 'medium':
      return '#F59E0B'; // Orange
    case 'low':
      return '#10B981'; // Green
    default:
      return '#6B7280'; // Gray
  }
};

const LeadCard: React.FC<LeadCardProps> = ({
  name,
  projectName,
  status,
  managedBy,
  lastContact,
  onPress,
  priority,
}) => {
  const statusColors = getStatusColor(status);
  const priorityColor = getPriorityColor(priority);

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.innerLayout}>
        {/* Upper Layout */}
        <View style={styles.upperLayout}>
          {/* Name Row */}
          <View style={styles.nameRow}>
            <View style={styles.nameContainer}>
              {/* Priority Indicator */}
              {priority && (
                <View 
                  style={[
                    styles.priorityDot, 
                    { backgroundColor: priorityColor }
                  ]} 
                />
              )}
              <Text style={styles.nameText}>{name}</Text>
            </View>
            
            {/* Arrow Icon */}
            <View style={styles.iconContainer}>
              <ArrowRightIcon />
            </View>
          </View>

          {/* Project Name */}
          <Text style={styles.projectText}>{projectName}</Text>
        </View>

        {/* Badge and Info Row */}
        <View style={styles.bottomRow}>
          {/* Status Badge */}
          <View style={styles.badgeLayout}>
            <View 
              style={[
                styles.badge, 
                { backgroundColor: statusColors.bg }
              ]}
            >
              <Text 
                style={[
                  styles.badgeText, 
                  { color: statusColors.text }
                ]}
              >
                {status}
              </Text>
            </View>
          </View>
        </View>

        {/* Manager and Last Contact Row */}
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>
            Managed by: <Text style={styles.infoValue}>{managedBy}</Text>
          </Text>
          <Text style={styles.infoText}>
            Last contact: <Text style={styles.infoValue}>{lastContact}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    marginBottom: 12,
  },
  innerLayout: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
  },
  upperLayout: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 6,
    alignSelf: 'stretch',
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    alignSelf: 'stretch',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
  },
  priorityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  nameText: {
    fontSize: FS.FS20,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    fontWeight: '600',
    lineHeight: 24,
  },
  iconContainer: {
    padding: 4,
    paddingHorizontal: 7,
    alignItems: 'center',
    gap: 10,
  },
  projectText: {
    color: '#6B7280',
    fontFamily: FF[400],
    fontSize: FS.FS16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20.952,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  badgeLayout: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 4,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderRadius: 12,
  },
  badgeText: {
    fontFamily: FF[500],
    fontSize: FS.FS12,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: 8,
  },
  infoText: {
    color: '#9CA3AF',
    fontFamily: FF[400],
    fontSize: FS.FS12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 16,
    flex: 1,
  },
  infoValue: {
    color: '#6B7280',
    fontFamily: FF[500],
    fontWeight: '500',
  },
});

export default LeadCard;
