import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS, FF, FS } from '../../constants';
import type { Unit } from '../../services/api';

interface UnitDetailsBottomSheetProps {
  visible: boolean;
  unit: Unit | null;
  onClose: () => void;
  onAddLead: () => void;
}

const { height } = Dimensions.get('window');

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

const formatPrice = (price: number): string => {
  const lakhs = price / 100000;
  if (lakhs >= 100) {
    return `₹${(lakhs / 100).toFixed(2)}Cr`;
  }
  return `₹${lakhs.toFixed(1)}L`;
};

const UnitDetailsBottomSheet: React.FC<UnitDetailsBottomSheetProps> = ({
  visible,
  unit,
  onClose,
  onAddLead,
}) => {
  if (!unit) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.bottomSheet}>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.headerLeft}>
                  <Text style={styles.unitTitle}>
                    {unit.unitNumber} • {unit.configuration}
                  </Text>
                  <View style={styles.detailsRow}>
                    <View style={styles.detailItem}>
                      <HomeIcon />
                      <Text style={styles.detailText}>{unit.floor}</Text>
                    </View>
                    <Text style={styles.separator}>•</Text>
                    <View style={styles.detailItem}>
                      <CompassIcon />
                      <Text style={styles.detailText}>{unit.facing}</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.price}>{formatPrice(unit.totalPrice)}</Text>
              </View>

              {/* Area Details */}
              <View style={styles.areaContainer}>
                <View style={styles.areaCard}>
                  <Text style={styles.areaLabel}>Carpet Area</Text>
                  <Text style={styles.areaValue}>{unit.carpetArea} sq.ft</Text>
                </View>
                <View style={styles.areaCard}>
                  <Text style={styles.areaLabel}>Super Area</Text>
                  <Text style={styles.areaValue}>{unit.builtupArea} sq.ft</Text>
                </View>
              </View>

              {/* Add Lead Button */}
              <TouchableOpacity style={styles.addLeadButton} onPress={onAddLead}>
                <Text style={styles.addLeadText}>Add Lead</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#E5E7EB',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 40,
    maxHeight: height * 0.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
    gap: 8,
  },
  unitTitle: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    fontWeight: '600',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: '#9CA3AF',
  },
  separator: {
    fontSize: FS.FS12,
    color: '#9CA3AF',
  },
  price: {
    fontSize: FS.FS20,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    fontWeight: '600',
  },
  areaContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  areaCard: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  areaLabel: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: '#9CA3AF',
  },
  areaValue: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    fontWeight: '600',
  },
  addLeadButton: {
    backgroundColor: COLORS.BLACK,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addLeadText: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.WHITE,
    fontWeight: '600',
  },
});

export default UnitDetailsBottomSheet;
