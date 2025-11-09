import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FF, FS } from '../../constants';

interface CommunicationItem {
  id: string;
  title: string;
  description: string;
  date: string;
  isActive?: boolean;
}

interface CommunicationHistoryProps {
  items: CommunicationItem[];
}

const CommunicationHistory: React.FC<CommunicationHistoryProps> = ({ items }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Communication History</Text>

      <View style={styles.timelineContainer}>
        {items.map((item, index) => (
          <View key={item.id} style={styles.timelineItem}>
            {/* Timeline Dot and Line */}
            <View style={styles.timelineLeft}>
              <View
                style={[
                  styles.dot,
                  { backgroundColor: item.isActive ? '#000000' : '#D1D5DB' },
                ]}
              />
              {index < items.length - 1 && <View style={styles.line} />}
            </View>

            {/* Content */}
            <View style={styles.contentContainer}>
              <View style={styles.headerRow}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        ))}
      </View>
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
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  title: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    fontWeight: '600',
    marginBottom: 16,
  },
  timelineContainer: {
    gap: 0,
  },
  timelineItem: {
    flexDirection: 'row',
    gap: 12,
  },
  timelineLeft: {
    alignItems: 'center',
    width: 20,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 4,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    fontWeight: '600',
    flex: 1,
  },
  date: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: '#9CA3AF',
    marginLeft: 8,
  },
  description: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: '#6B7280',
    lineHeight: 20,
  },
});

export default CommunicationHistory;
