import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/common/container';
import { RootState } from '../../store/reducers';
import { fetchAmenityDetails, fetchAvailableSlots } from '../../store/actions/amenities/amenitiesAction';
import { COLORS, FF, FS, SPACING, BORDER_RADIUS } from '../../constants';

interface AmenityDetailsProps {
  navigation: {
    goBack: () => void;
    navigate: (screen: string, params?: any) => void;
  };
  route: {
    params: {
      amenityId: string;
    };
  };
}

const AmenityDetails: React.FC<AmenityDetailsProps> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { amenityId } = route.params;

  const { loading, amenityDetails, availableSlots, error } = useSelector((state: RootState) => state.amenities);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    dispatch(fetchAmenityDetails(amenityId, selectedDate) as never);
    if (amenityDetails?.bookingRequired) {
      dispatch(fetchAvailableSlots(amenityId, selectedDate) as never);
    }
  }, [dispatch, amenityId, selectedDate]);

  const getAmenityIcon = (amenityType: string): string => {
    switch (amenityType?.toLowerCase()) {
      case 'swimming pool':
        return '🏊';
      case 'gym':
        return '💪';
      case 'clubhouse':
        return '🏛️';
      case 'sports court':
        return '🎾';
      case 'community hall':
        return '🏢';
      case 'garden':
        return '🌳';
      default:
        return '🏢';
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'available':
        return '#4CAF50';
      case 'unavailable':
        return '#F44336';
      case 'maintenance':
        return '#FF9800';
      default:
        return '#999';
    }
  };

  const getSlotStatusColor = (status: string): string => {
    switch (status) {
      case 'available':
        return '#4CAF50';
      case 'booked':
        return '#F44336';
      default:
        return '#999';
    }
  };

  if (loading && !amenityDetails) {
    return (
      <Container>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.BLACK} />
          <Text style={styles.loadingText}>Loading amenity details...</Text>
        </View>
      </Container>
    );
  }

  if (error || !amenityDetails) {
    return (
      <Container>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error || 'Amenity not found'}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => dispatch(fetchAmenityDetails(amenityId) as never)}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.iconHeader}>
          <Text style={styles.largeIcon}>{getAmenityIcon(amenityDetails.amenityType)}</Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{amenityDetails.name}</Text>
          <Text style={styles.subtitle}>{amenityDetails.amenityType}</Text>
        </View>

        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(amenityDetails.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(amenityDetails.status) }]}>
            {amenityDetails.status.toUpperCase()}
          </Text>
        </View>

        {amenityDetails.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{amenityDetails.description}</Text>
          </View>
        )}

        <View style={styles.infoGrid}>
          {amenityDetails.location && (
            <View style={styles.infoCard}>
              <Text style={styles.infoIcon}>📍</Text>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>{amenityDetails.location}</Text>
            </View>
          )}

          {amenityDetails.capacity && (
            <View style={styles.infoCard}>
              <Text style={styles.infoIcon}>👥</Text>
              <Text style={styles.infoLabel}>Capacity</Text>
              <Text style={styles.infoValue}>{amenityDetails.capacity} people</Text>
            </View>
          )}

          {amenityDetails.slotDuration && (
            <View style={styles.infoCard}>
              <Text style={styles.infoIcon}>⏱️</Text>
              <Text style={styles.infoLabel}>Slot Duration</Text>
              <Text style={styles.infoValue}>{amenityDetails.slotDuration} mins</Text>
            </View>
          )}

          {amenityDetails.pricePerSlot !== undefined && (
            <View style={styles.infoCard}>
              <Text style={styles.infoIcon}>💰</Text>
              <Text style={styles.infoLabel}>Price</Text>
              <Text style={styles.infoValue}>
                {amenityDetails.pricePerSlot === 0 ? 'Free' : `₹${amenityDetails.pricePerSlot}`}
              </Text>
            </View>
          )}
        </View>

        {amenityDetails.bookingRequired && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Slots - {selectedDate}</Text>

            {availableSlots && availableSlots.length > 0 ? (
              <View style={styles.slotsGrid}>
                {availableSlots.map((slot: any) => (
                  <TouchableOpacity
                    key={slot._id}
                    style={[
                      styles.slotCard,
                      slot.status === 'booked' && styles.slotCardBooked,
                    ]}
                    disabled={slot.status === 'booked'}
                    onPress={() => {
                      if (slot.status === 'available') {
                        navigation.navigate('BookAmenity', {
                          amenityId,
                          slotId: slot._id,
                          amenityName: amenityDetails.name,
                          slotTime: `${slot.startTime} - ${slot.endTime}`,
                          bookingDate: selectedDate,
                        });
                      }
                    }}
                  >
                    <Text style={[
                      styles.slotTime,
                      slot.status === 'booked' && styles.slotTimeBooked,
                    ]}>
                      {slot.startTime} - {slot.endTime}
                    </Text>
                    <View style={[
                      styles.slotStatusBadge,
                      { backgroundColor: getSlotStatusColor(slot.status) + '20' }
                    ]}>
                      <Text style={[
                        styles.slotStatusText,
                        { color: getSlotStatusColor(slot.status) }
                      ]}>
                        {slot.status.toUpperCase()}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <Text style={styles.noSlotsText}>No slots available for this date</Text>
            )}
          </View>
        )}

        {amenityDetails.rules && amenityDetails.rules.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Rules & Guidelines</Text>
            {amenityDetails.rules.map((rule: string, index: number) => (
              <View key={index} style={styles.ruleItem}>
                <Text style={styles.ruleBullet}>•</Text>
                <Text style={styles.ruleText}>{rule}</Text>
              </View>
            ))}
          </View>
        )}

        {amenityDetails.bookingRequired && amenityDetails.status === 'available' && (
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => {
              if (availableSlots && availableSlots.length > 0) {
                // Scroll up to slots section
              } else {
                navigation.navigate('BookAmenity', {
                  amenityId,
                  amenityName: amenityDetails.name,
                  bookingDate: selectedDate,
                });
              }
            }}
          >
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: SPACING.XL,
    paddingVertical: SPACING.LG,
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GREY,
  },
  backButton: {
    paddingVertical: SPACING.SM,
  },
  backButtonText: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK,
  },
  container: {
    flex: 1,
    padding: SPACING.XL,
  },
  iconHeader: {
    alignItems: 'center',
    marginBottom: SPACING.LG,
  },
  largeIcon: {
    fontSize: 80,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: SPACING.LG,
  },
  title: {
    fontSize: FS.FS28,
    fontFamily: FF[700],
    color: COLORS.BLACK,
    marginBottom: SPACING.XS,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
  },
  statusBadge: {
    alignSelf: 'center',
    paddingHorizontal: SPACING.XL,
    paddingVertical: SPACING.SM,
    borderRadius: BORDER_RADIUS.LG,
    marginBottom: SPACING.XXL,
  },
  statusText: {
    fontSize: FS.FS13,
    fontFamily: FF[700],
  },
  section: {
    marginBottom: SPACING.XXL,
  },
  sectionTitle: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    marginBottom: SPACING.MD,
  },
  description: {
    fontSize: FS.FS15,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: 24,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.XXL,
    marginHorizontal: -SPACING.SM,
  },
  infoCard: {
    width: '50%',
    padding: SPACING.SM,
  },
  infoIcon: {
    fontSize: 24,
    marginBottom: SPACING.SM,
  },
  infoLabel: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    marginBottom: SPACING.XS,
  },
  infoValue: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK,
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.XS - 2,
  },
  slotCard: {
    width: '50%',
    padding: SPACING.XS + 2,
  },
  slotCardBooked: {
    opacity: 0.5,
  },
  slotTime: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    marginBottom: SPACING.XS + 2,
    backgroundColor: COLORS.LIGHT_GRAY,
    padding: SPACING.MD,
    borderRadius: BORDER_RADIUS.SM,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  slotTimeBooked: {
    color: COLORS.GREY_TEXT,
  },
  slotStatusBadge: {
    paddingHorizontal: SPACING.SM,
    paddingVertical: SPACING.XS,
    borderRadius: BORDER_RADIUS.SM,
    alignSelf: 'center',
  },
  slotStatusText: {
    fontSize: FS.FS10,
    fontFamily: FF[700],
  },
  noSlotsText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
    paddingVertical: SPACING.XL,
  },
  ruleItem: {
    flexDirection: 'row',
    marginBottom: SPACING.SM,
  },
  ruleBullet: {
    fontSize: FS.FS16,
    color: COLORS.BLACK,
    marginRight: SPACING.SM,
    marginTop: 2,
  },
  ruleText: {
    flex: 1,
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: 22,
  },
  bookButton: {
    backgroundColor: COLORS.BLACK,
    paddingVertical: SPACING.LG,
    borderRadius: BORDER_RADIUS.MD,
    alignItems: 'center',
    marginBottom: SPACING.XL,
  },
  bookButtonText: {
    color: COLORS.WHITE,
    fontSize: FS.FS18,
    fontFamily: FF[600],
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.XL,
  },
  loadingText: {
    marginTop: SPACING.LG,
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
  },
  errorText: {
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.ERROR_COLOR,
    textAlign: 'center',
    marginBottom: SPACING.XL,
  },
  retryButton: {
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: SPACING.XXL,
    paddingVertical: SPACING.MD,
    borderRadius: BORDER_RADIUS.SM,
  },
  retryButtonText: {
    color: COLORS.WHITE,
    fontSize: FS.FS16,
    fontFamily: FF[600],
  },
});

export default AmenityDetails;
