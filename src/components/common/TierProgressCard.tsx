import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FF, FS } from '../../constants';

interface TierProgressCardProps {
  currentTier?: string;
  commissionRate?: string;
  progress?: number; // 0 to 100
  progressLabel?: string;
}

const TierProgressCard: React.FC<TierProgressCardProps> = ({
  currentTier = 'Gold',
  commissionRate = '2.5%',
  progress = 68,
  progressLabel = 'Monthly Target Progress',
}) => {
  return (
    <View style={styles.mainCard}>
      {/* Card Title */}
      <Text style={styles.cardTitle}>Milestone Tracker</Text>

      {/* Progress Section */}
      <View style={styles.progressSection}>
        {/* Progress Label and Percentage */}
        <View style={styles.headerRow}>
          <Text style={styles.progressText}>{progressLabel}</Text>
          <Text style={styles.percentageText}>{progress}%</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
        </View>

        {/* Labels Row */}
        <View style={styles.labelsRow}>
          {/* Current Tier */}
          <View style={styles.labelContainer}>
            <Text style={styles.labelTitle}>Current Tier</Text>
            <View style={styles.labelBox}>
              <Text style={styles.labelValue}>{currentTier}</Text>
            </View>
          </View>

          {/* Commission Rate */}
          <View style={styles.labelContainer}>
            <Text style={styles.labelTitle}>Commission Rate</Text>
            <View style={styles.labelBox}>
              <Text style={styles.labelValue}>{commissionRate}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainCard: {
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'column',
    gap: 16,
    marginTop: 20,
  },
  cardTitle: {
    color: '#6B7280',
    fontFamily: FF[600],
    fontSize: FS.FS18,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 4,
  },
  progressSection: {
    flexDirection: 'column',
    gap: 16,
    padding: 20,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  progressText: {
    color: COLORS.BLACK,
    fontFamily: FF[600],
    fontSize: FS.FS16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
  },
  percentageText: {
    color: COLORS.BLACK,
    fontFamily: FF[700],
    fontSize: FS.FS24,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 32,
  },
  progressBarContainer: {
    height: 12,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  progressBarBackground: {
    height: 12,
    width: '100%',
    backgroundColor: '#D1D5DB',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#000000',
    borderRadius: 6,
  },
  labelsRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    gap: 16,
    marginTop: 8,
  },
  labelContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  labelTitle: {
    color: '#6B7280',
    textAlign: 'center',
    fontFamily: FF[400],
    fontSize: FS.FS14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
  },
  labelBox: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#000000',
    borderRadius: 24,
    minHeight: 48,
  },
  labelValue: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: FF[700],
    fontSize: FS.FS18,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 24,
  },
});

export default TierProgressCard;
