import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FF, FS } from '../../constants';

interface MetricsCardProps {
  userName?: string;
  activeLeads?: number;
  bookings?: number;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ 
  userName = 'User',
  activeLeads = 0,
  bookings = 0 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Welcome Section */}
        <View style={styles.namesSection}>
          <Text style={styles.welcomeLabel}>Welcome back,</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>

        {/* Metrics Row */}
        <View style={styles.metricsRow}>
          {/* Active Leads */}
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Active Leads</Text>
            <Text style={styles.metricValue}>{activeLeads}</Text>
          </View>

          {/* Bookings */}
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Bookings</Text>
            <Text style={styles.metricValue}>{bookings}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    paddingHorizontal: 21,
    backgroundColor: '#000000',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal: 16,
    marginTop: 24,
  },
  innerContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 26,
  },
  namesSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
    alignSelf: 'stretch',
  },
  welcomeLabel: {
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: '#FFFFFF',
    letterSpacing: 0.2,
    opacity: 0.8,
  },
  userName: {
    fontSize: FS.FS32,
    fontFamily: FF[700],
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  metricsRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    gap: 16,
  },
  metricItem: {
    flex: 1,
    minWidth: 0,
    padding: 16,
    paddingRight: 25,
    paddingBottom: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
  },
  metricLabel: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: '#FFFFFF',
    letterSpacing: 0.1,
    opacity: 0.8,
  },
  metricValue: {
    fontSize: FS.FS24,
    fontFamily: FF[700],
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});

export default MetricsCard;
