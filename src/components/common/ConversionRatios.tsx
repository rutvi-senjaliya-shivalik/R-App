import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { COLORS, FF, FS } from '../../constants';

interface RatioData {
  title: string;
  subtitle: string;
  percentage: number;
  change: number;
  isPositive: boolean;
  barHeights: number[]; // Array of heights for the bar chart (0-100)
}

interface ConversionRatiosProps {
  leadToVisitRatio?: RatioData;
  visitToBookingRatio?: RatioData;
}

// Simple Bar Chart Component
const BarChart: React.FC<{ heights: number[] }> = ({ heights }) => {
  const barWidth = 10;
  const barGap = 4;
  const maxHeight = 42;
  const chartWidth = heights.length * (barWidth + barGap);

  return (
    <View style={styles.chartContainer}>
      <Svg width={chartWidth} height={maxHeight} viewBox={`0 0 ${chartWidth} ${maxHeight}`}>
        {heights.map((height, index) => {
          const barHeight = (height / 100) * maxHeight;
          const x = index * (barWidth + barGap);
          const y = maxHeight - barHeight;
          
          return (
            <Rect
              key={index}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill="#000000"
              rx={2}
            />
          );
        })}
      </Svg>
    </View>
  );
};

// Single Ratio Card Component
const RatioCard: React.FC<{ data: RatioData }> = ({ data }) => {
  return (
    <View style={styles.ratioCard}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        {/* Left Side - Title and Subtitle */}
        <View style={styles.titleContainer}>
          <Text style={styles.ratioTitle}>{data.title}</Text>
          <Text style={styles.ratioSubtitle}>{data.subtitle}</Text>
        </View>

        {/* Right Side - Percentage and Change */}
        <View style={styles.statsContainer}>
          <Text style={styles.percentageText}>{data.percentage}%</Text>
          <View style={styles.changeContainer}>
            <Text style={[styles.changeIcon, data.isPositive ? styles.positive : styles.negative]}>
              {data.isPositive ? '↑' : '↓'}
            </Text>
            <Text style={[styles.changeText, data.isPositive ? styles.positive : styles.negative]}>
              {data.isPositive ? '+' : ''}{data.change}%
            </Text>
          </View>
        </View>
      </View>

      {/* Bar Chart */}
      <View style={styles.chartWrapper}>
        <BarChart heights={data.barHeights} />
      </View>
    </View>
  );
};

const ConversionRatios: React.FC<ConversionRatiosProps> = ({
  leadToVisitRatio = {
    title: 'Lead → Visit Ratio',
    subtitle: 'Last 30 days',
    percentage: 42,
    change: 5,
    isPositive: true,
    barHeights: [60, 70, 85, 95, 80, 90],
  },
  visitToBookingRatio = {
    title: 'Visit → Booking Ratio',
    subtitle: 'Last 30 days',
    percentage: 28,
    change: -2,
    isPositive: false,
    barHeights: [55, 65, 80, 90, 75, 85],
  },
}) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.sectionTitle}>Conversion Ratios</Text>
      
      <View style={styles.cardsContainer}>
        <RatioCard data={leadToVisitRatio} />
        <RatioCard data={visitToBookingRatio} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'column',
    gap: 14,
    marginTop: 20,
  },
  sectionTitle: {
    color: '#6B7280',
    fontFamily: FF[600],
    fontSize: FS.FS18,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
  },
  cardsContainer: {
    flexDirection: 'column',
    gap: 12,
  },
  ratioCard: {
    padding: 16,
    paddingBottom: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  titleContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 4,
  },
  ratioTitle: {
    color: COLORS.BLACK,
    fontFamily: FF[600],
    fontSize: FS.FS16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
  },
  ratioSubtitle: {
    color: '#6B7280',
    fontFamily: FF[400],
    fontSize: FS.FS12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 16,
  },
  statsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 4,
  },
  percentageText: {
    color: COLORS.BLACK,
    fontFamily: FF[700],
    fontSize: FS.FS32,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 40,
  },
  changeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  changeIcon: {
    fontFamily: FF[600],
    fontSize: FS.FS14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 20,
  },
  changeText: {
    fontFamily: FF[600],
    fontSize: FS.FS14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 20,
  },
  positive: {
    color: '#10B981',
  },
  negative: {
    color: '#EF4444',
  },
  chartWrapper: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
  },
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default ConversionRatios;
