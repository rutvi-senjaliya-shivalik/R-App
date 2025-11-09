import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { AppHeader } from '../../components/common';
import { COLORS, FF, FS } from '../../constants';
import Svg, { Path } from 'react-native-svg';

// Icons
const FloorIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path
      d="M10 14V8.66668C10 8.48987 9.92976 8.32029 9.80474 8.19526C9.67971 8.07024 9.51014 8.00001 9.33333 8.00001H6.66667C6.48986 8.00001 6.32029 8.07024 6.19526 8.19526C6.07024 8.32029 6 8.48987 6 8.66668V14M2 6.66668C1.99995 6.47272 2.04222 6.28109 2.12386 6.10515C2.2055 5.92922 2.32453 5.77321 2.47267 5.64801L7.13933 1.64801C7.37999 1.44462 7.6849 1.33302 8 1.33302C8.3151 1.33302 8.62001 1.44462 8.86067 1.64801L13.5273 5.64801C13.6755 5.77321 13.7945 5.92922 13.8761 6.10515C13.9578 6.28109 14 6.47272 14 6.66668V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V6.66668Z"
      stroke="black"
      strokeOpacity="0.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const DirectionIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path
      d="M10.8266 5.17334L9.624 8.78064C9.55848 8.97704 9.44824 9.15552 9.30184 9.30192C9.15544 9.44832 8.97696 9.55856 8.78056 9.62408L5.1733 10.8266L6.37597 7.21934C6.44142 7.02295 6.5517 6.8445 6.69809 6.69812C6.84447 6.55174 7.02291 6.44146 7.2193 6.37601L10.8266 5.17334Z"
      stroke="black"
      strokeOpacity="0.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.99997 14.6667C11.6819 14.6667 14.6666 11.6819 14.6666 8.00001C14.6666 4.31811 11.6819 1.33334 7.99997 1.33334C4.31807 1.33334 1.3333 4.31811 1.3333 8.00001C1.3333 11.6819 4.31807 14.6667 7.99997 14.6667Z"
      stroke="black"
      strokeOpacity="0.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

type UnitStatus = 'available' | 'booked' | 'sold';

interface Unit {
  id: string;
  unitNumber: string;
  type: string;
  floor: number;
  facing: string;
  price: string;
  status: UnitStatus;
}

interface UnitAvailabilityProps {
  navigation: any;
  route: any;
}

const UnitAvailability: React.FC<UnitAvailabilityProps> = ({ navigation, route }) => {
  const { projectName } = route.params || { projectName: 'Shivalik Villa' };
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Sample units data
  const units: Unit[] = [
    { id: '1', unitNumber: 'Unit A-401', type: '2BHK', floor: 4, facing: 'East Facing', price: '₹45.5L', status: 'available' },
    { id: '2', unitNumber: 'Unit A-402', type: '2BHK', floor: 4, facing: 'East Facing', price: '₹45.5L', status: 'available' },
    { id: '3', unitNumber: 'Unit A-403', type: '2BHK', floor: 4, facing: 'East Facing', price: '₹45.5L', status: 'booked' },
    { id: '4', unitNumber: 'Unit A-404', type: '2BHK', floor: 4, facing: 'East Facing', price: '₹45.5L', status: 'sold' },
    { id: '5', unitNumber: 'Unit A-405', type: '2BHK', floor: 4, facing: 'East Facing', price: '₹45.5L', status: 'available' },
    { id: '6', unitNumber: 'Unit A-406', type: '2BHK', floor: 4, facing: 'East Facing', price: '₹45.5L', status: 'available' },
  ];

  const handleBellPress = () => {
    console.log('Bell pressed');
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleUnitPress = (unit: Unit) => {
    setSelectedUnit(unit);
    setModalVisible(true);
  };

  const handleAddLead = () => {
    setModalVisible(false);
    // Navigate to Add Lead screen with unit details
    navigation.navigate('AddLead', { unit: selectedUnit });
  };

  const getStatusColor = (status: UnitStatus) => {
    switch (status) {
      case 'available':
        return '#10B981';
      case 'booked':
        return '#F59E0B';
      case 'sold':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getStatusText = (status: UnitStatus) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <View style={styles.container}>
      <AppHeader 
        title="Unit Availability"
        onBellPress={handleBellPress}
        onProfilePress={handleProfilePress}
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.unitsGrid}>
          {units.map((unit) => (
            <TouchableOpacity
              key={unit.id}
              style={[
                styles.unitCard,
                selectedUnit?.id === unit.id && styles.unitCardSelected,
              ]}
              onPress={() => handleUnitPress(unit)}
              activeOpacity={0.7}
            >
              {/* Unit Number and Status */}
              <View style={styles.unitHeader}>
                <Text style={styles.unitNumber}>{unit.unitNumber}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(unit.status) }]}>
                  <Text style={styles.statusText}>{getStatusText(unit.status)}</Text>
                </View>
              </View>

              {/* Unit Type */}
              <Text style={styles.unitType}>{unit.type}</Text>

              {/* Floor Info */}
              <View style={styles.infoRow}>
                <FloorIcon />
                <Text style={styles.infoText}>Floor {unit.floor}</Text>
              </View>

              {/* Facing Info */}
              <View style={[styles.infoRow, styles.lastInfoRow]}>
                <DirectionIcon />
                <Text style={styles.infoText}>{unit.facing}</Text>
              </View>

              {/* Price */}
              <Text style={styles.price}>{unit.price}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Unit Details Bottom Sheet */}
      {modalVisible && (
        <View style={styles.bottomSheetOverlay}>
          <TouchableOpacity 
            style={styles.bottomSheetBackdrop}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          />
          <View style={styles.bottomSheetContent}>
            {selectedUnit && (
              <>
                {/* Unit Header */}
                <View style={styles.sheetHeader}>
                  <View>
                    <Text style={styles.sheetTitle}>
                      {selectedUnit.unitNumber} • {selectedUnit.type}
                    </Text>
                    <Text style={styles.sheetSubtitle}>
                      Floor {selectedUnit.floor} • {selectedUnit.facing}
                    </Text>
                  </View>
                  <Text style={styles.sheetPrice}>{selectedUnit.price}</Text>
                </View>

                {/* Area Details */}
                <View style={styles.areaContainer}>
                  <View style={styles.areaCard}>
                    <Text style={styles.areaLabel}>Carpet Area</Text>
                    <Text style={styles.areaValue}>980 sq.ft</Text>
                  </View>
                  <View style={styles.areaCard}>
                    <Text style={styles.areaLabel}>Super Area</Text>
                    <Text style={styles.areaValue}>1250 sq.ft</Text>
                  </View>
                </View>

                {/* Add Lead Button */}
                {selectedUnit.status === 'available' && (
                  <TouchableOpacity 
                    style={styles.addLeadButton}
                    onPress={handleAddLead}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.addLeadButtonText}>Add Lead</Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  unitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    paddingTop: 16,
    gap: 12,
  },
  unitCard: {
    width: '48%',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    gap: 6,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  unitCardSelected: {
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.BLACK,
  },
  unitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingBottom: 8,
    marginHorizontal: -4,
    paddingHorizontal: 4,
  },
  unitNumber: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: '#9CA3AF',
    lineHeight: 16,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusText: {
    fontSize: FS.FS10,
    fontFamily: FF[600],
    fontWeight: '600',
    color: COLORS.WHITE,
    lineHeight: 14,
  },
  unitType: {
    fontSize: FS.FS20,
    fontFamily: FF[700],
    fontWeight: '700',
    color: COLORS.BLACK,
    lineHeight: 28,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: '#6B7280',
    lineHeight: 18,
  },
  lastInfoRow: {
    paddingBottom: 6,
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    marginHorizontal: -4,
    paddingHorizontal: 4,
  },
  price: {
    fontSize: FS.FS18,
    fontFamily: FF[700],
    fontWeight: '700',
    color: COLORS.BLACK,
    lineHeight: 24,
    marginTop: 4,
  },
  bottomSheetOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    justifyContent: 'flex-end',
  },
  bottomSheetBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bottomSheetContent: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  sheetTitle: {
    fontSize: FS.FS20,
    fontFamily: FF[700],
    fontWeight: '700',
    color: COLORS.BLACK,
    lineHeight: 28,
    marginBottom: 4,
  },
  sheetSubtitle: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: '#6B7280',
    lineHeight: 20,
  },
  sheetPrice: {
    fontSize: FS.FS24,
    fontFamily: FF[700],
    fontWeight: '700',
    color: COLORS.BLACK,
    lineHeight: 32,
  },
  areaContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  areaCard: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
  },
  areaLabel: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: '#9CA3AF',
    lineHeight: 16,
    marginBottom: 4,
  },
  areaValue: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    fontWeight: '600',
    color: COLORS.BLACK,
    lineHeight: 20,
  },
  addLeadButton: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: COLORS.BLACK,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  addLeadButtonText: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    fontWeight: '600',
    color: COLORS.WHITE,
    lineHeight: 20,
  },
});

export default UnitAvailability;
