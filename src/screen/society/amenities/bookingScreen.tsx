import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { Container, HeaderComponent, CustomButton } from '../../../components/common';
import { Calendar, DateData } from 'react-native-calendars';
import { amenitiesBookingStyles } from './bookingStyles';
import { COLORS } from '../../../constants';

type MarkedDates = {
  [key: string]: {
    selected: boolean;
    selectedColor: string;
  };
};

const AmenitiesBookingScreen = ({ route, navigation }: any) => {
  const { amenity } = route.params || {};
  const [selectedDates, setSelectedDates] = useState<MarkedDates>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDayPress = useCallback((day: DateData) => {
    const dateString = day.dateString;
    setSelectedDates((prev) => {
      const newDates = { ...prev };
      if (newDates[dateString]) {
        delete newDates[dateString];
      } else {
        newDates[dateString] = {
          selected: true,
          selectedColor: COLORS.DARK_BLUE,
        };
      }
      return newDates;
    });
  }, []);

  const handleBooking = useCallback(async () => {
    const selectedDateKeys = Object.keys(selectedDates);
    if (selectedDateKeys.length === 0) {
      Alert.alert('No Dates Selected', 'Please select at least one date for booking.');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Booking Successful',
        `${amenity?.name} booked for ${selectedDateKeys.length} date(s)`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ],
      );
    }, 1000);
  }, [selectedDates, amenity, navigation]);

  return (
    <Container>
      <View style={amenitiesBookingStyles.container}>
        <HeaderComponent Title="Book Amenity" onPress={() => navigation.goBack()} />
        <ScrollView
          style={amenitiesBookingStyles.contentWrapper}
          contentContainerStyle={amenitiesBookingStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={amenitiesBookingStyles.amenityInfoCard}>
            <Text style={amenitiesBookingStyles.amenityName}>{amenity?.name}</Text>
            <Text style={amenitiesBookingStyles.amenityDescription}>{amenity?.description}</Text>
          </View>

          <Text style={amenitiesBookingStyles.sectionTitle}>Select Booking Dates</Text>

          <Calendar
            current={new Date().toISOString().split('T')[0]}
            minDate={new Date().toISOString().split('T')[0]}
            markedDates={selectedDates}
            onDayPress={handleDayPress}
            theme={{
              selectedDayBackgroundColor: COLORS.DARK_BLUE,
              todayTextColor: COLORS.DARK_BLUE,
              arrowColor: COLORS.DARK_BLUE,
              textDayFontFamily: 'BricolageGrotesque-Medium',
              textMonthFontFamily: 'BricolageGrotesque-SemiBold',
              textDayHeaderFontFamily: 'BricolageGrotesque-Medium',
            }}
          />

          {Object.keys(selectedDates).length > 0 && (
            <View style={amenitiesBookingStyles.selectedDatesContainer}>
              <Text style={amenitiesBookingStyles.selectedDatesTitle}>
                Selected Dates ({Object.keys(selectedDates).length})
              </Text>
              {Object.keys(selectedDates)
                .sort()
                .map((date) => (
                  <Text key={date} style={amenitiesBookingStyles.selectedDate}>
                    • {date}
                  </Text>
                ))}
            </View>
          )}
        </ScrollView>

        <View style={amenitiesBookingStyles.submitButtonWrapper}>
          <CustomButton
            title={isSubmitting ? 'Booking...' : 'Confirm Booking'}
            onPress={handleBooking}
            loading={isSubmitting}
          />
        </View>
      </View>
    </Container>
  );
};

export default AmenitiesBookingScreen;

