import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/common/container';
import { RootState } from '../../store/reducers';
import { bookAmenitySlot } from '../../store/actions/amenities/amenitiesAction';
import { selectUserDetailData } from '../../store/selectors/auth';
import { COLORS, FF, FS, SPACING, BORDER_RADIUS } from '../../constants';

interface BookAmenityProps {
  navigation: {
    goBack: () => void;
    navigate: (screen: string) => void;
  };
  route: {
    params: {
      amenityId: string;
      slotId?: string;
      amenityName: string;
      slotTime?: string;
      bookingDate: string;
    };
  };
}

const BookAmenity: React.FC<BookAmenityProps> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { amenityId, slotId, amenityName, slotTime, bookingDate } = route.params;

  const userDetailData = useSelector(selectUserDetailData);
  const user = userDetailData?.data?.result;
  const unitId = user?.unitId || user?.unit?._id;
  const memberId = user?._id || user?.id;

  const { booking } = useSelector((state: RootState) => state.amenities);

  const [notes, setNotes] = useState('');

  const handleBooking = () => {
    if (!slotId) {
      Alert.alert('Error', 'Please select a slot first');
      return;
    }

    if (!memberId || !unitId) {
      Alert.alert('Error', 'User information not available');
      return;
    }

    dispatch(
      bookAmenitySlot(amenityId, slotId, memberId, unitId, bookingDate) as never
    );

    // Show success message
    setTimeout(() => {
      if (!booking) {
        Alert.alert(
          'Success',
          'Your booking has been confirmed!',
          [
            {
              text: 'View My Bookings',
              onPress: () => navigation.navigate('MyBookings'),
            },
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      }
    }, 1000);
  };

  return (
    <Container>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirm Booking</Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Booking Details</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Amenity</Text>
            <Text style={styles.detailValue}>{amenityName}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>
              {new Date(bookingDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>

          {slotTime && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Time Slot</Text>
              <Text style={styles.detailValue}>{slotTime}</Text>
            </View>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Additional Notes (Optional)</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Any special requirements or notes..."
            multiline
            numberOfLines={4}
            value={notes}
            onChangeText={setNotes}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Booking Guidelines</Text>
          <View style={styles.guidelineItem}>
            <Text style={styles.guidelineBullet}>•</Text>
            <Text style={styles.guidelineText}>
              Please arrive 5 minutes before your slot time
            </Text>
          </View>
          <View style={styles.guidelineItem}>
            <Text style={styles.guidelineBullet}>•</Text>
            <Text style={styles.guidelineText}>
              Cancellations must be made at least 2 hours in advance
            </Text>
          </View>
          <View style={styles.guidelineItem}>
            <Text style={styles.guidelineBullet}>•</Text>
            <Text style={styles.guidelineText}>
              Follow all amenity rules and regulations
            </Text>
          </View>
          <View style={styles.guidelineItem}>
            <Text style={styles.guidelineBullet}>•</Text>
            <Text style={styles.guidelineText}>
              No-shows may result in booking restrictions
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.bookButton, booking && styles.bookButtonDisabled]}
          onPress={handleBooking}
          disabled={booking}
        >
          <Text style={styles.bookButtonText}>
            {booking ? 'Booking...' : 'Confirm Booking'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
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
    marginBottom: SPACING.SM,
  },
  backButtonText: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK,
  },
  headerTitle: {
    fontSize: FS.FS24,
    fontFamily: FF[700],
    color: COLORS.BLACK,
  },
  container: {
    flex: 1,
    padding: SPACING.XL,
  },
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.LG,
    padding: SPACING.XL,
    marginBottom: SPACING.LG,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  cardTitle: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    marginBottom: SPACING.LG,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.MD,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GREY,
  },
  detailLabel: {
    fontSize: FS.FS15,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
  },
  detailValue: {
    fontSize: FS.FS15,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    flex: 1,
    textAlign: 'right',
  },
  textArea: {
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.LG,
    fontSize: FS.FS15,
    fontFamily: FF[400],
    color: COLORS.BLACK,
    minHeight: 100,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  guidelineItem: {
    flexDirection: 'row',
    marginBottom: SPACING.MD,
  },
  guidelineBullet: {
    fontSize: FS.FS16,
    color: COLORS.BLACK,
    marginRight: SPACING.SM,
    marginTop: 2,
  },
  guidelineText: {
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
    marginBottom: SPACING.MD,
  },
  bookButtonDisabled: {
    backgroundColor: COLORS.GREY_TEXT,
  },
  bookButtonText: {
    color: COLORS.WHITE,
    fontSize: FS.FS18,
    fontFamily: FF[600],
  },
  cancelButton: {
    backgroundColor: COLORS.WHITE,
    paddingVertical: SPACING.LG,
    borderRadius: BORDER_RADIUS.MD,
    alignItems: 'center',
    marginBottom: SPACING.XL,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  cancelButtonText: {
    color: COLORS.GREY_TEXT,
    fontSize: FS.FS16,
    fontFamily: FF[600],
  },
});

export default BookAmenity;
