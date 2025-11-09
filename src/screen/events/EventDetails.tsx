import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/common/container';
import { RootState } from '../../store/reducers';
import {
  fetchEventDetails,
  registerForEvent,
} from '../../store/actions/events/eventsAction';
import { selectUserDetailData } from '../../store/selectors/auth';
import { COLORS, SPACING, BORDER_RADIUS, FF, FS, LH } from '../../constants';

interface EventDetailsProps {
  navigation: {
    goBack: () => void;
  };
  route: {
    params: {
      eventId: string;
    };
  };
}

const EventDetails: React.FC<EventDetailsProps> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { eventId } = route.params;

  const userDetailData = useSelector(selectUserDetailData);
  const user = userDetailData?.data?.result;
  const unitId = user?.unitId || user?.unit?._id;
  const memberId = user?._id || user?.id;

  const { loading, eventDetails, error } = useSelector(
    (state: RootState) => state.events,
  );

  const [numberOfGuests, setNumberOfGuests] = useState('0');
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    dispatch(fetchEventDetails(eventId) as never);
  }, [dispatch, eventId]);

  const handleRegister = () => {
    const guests = parseInt(numberOfGuests, 10);

    if (isNaN(guests) || guests < 0) {
      Alert.alert('Invalid Input', 'Please enter a valid number of guests');
      return;
    }

    if (eventDetails?.maxGuestsPerUnit && guests > eventDetails.maxGuestsPerUnit) {
      Alert.alert(
        'Too Many Guests',
        `Maximum ${eventDetails.maxGuestsPerUnit} guests allowed per unit`,
      );
      return;
    }

    if (!memberId || !unitId) {
      Alert.alert('Error', 'User information not available');
      return;
    }

    Alert.alert(
      'Confirm Registration',
      `Register for ${eventDetails?.eventName} with ${guests} guest(s)?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Register',
          onPress: () => {
            setRegistering(true);
            dispatch(
              registerForEvent(eventId, memberId, guests, unitId) as never,
            );
            setTimeout(() => {
              setRegistering(false);
              Alert.alert('Success', 'Registration successful!', [
                {
                  text: 'OK',
                  onPress: () => navigation.goBack(),
                },
              ]);
            }, 1500);
          },
        },
      ],
    );
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = (timeString: string): string => {
    if (!timeString) return '';
    return timeString;
  };

  const getEventIcon = (eventType: string): string => {
    switch (eventType?.toLowerCase()) {
      case 'festival':
        return '🎊';
      case 'sports':
        return '⚽';
      case 'cultural':
        return '🎭';
      case 'workshop':
        return '📚';
      case 'meeting':
        return '🤝';
      case 'celebration':
        return '🎉';
      default:
        return '📅';
    }
  };

  if (loading) {
    return (
      <Container>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.BLACK} />
          <Text style={styles.loadingText}>Loading event details...</Text>
        </View>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <View style={styles.centerContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => dispatch(fetchEventDetails(eventId) as never)}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }

  if (!eventDetails) {
    return (
      <Container>
        <View style={styles.centerContainer}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyText}>Event not found</Text>
        </View>
      </Container>
    );
  }

  const isRegistrationOpen =
    eventDetails.registrationStatus === 'open' &&
    new Date(eventDetails.eventDate) > new Date();

  return (
    <Container>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text style={styles.eventIcon}>
              {getEventIcon(eventDetails.eventType)}
            </Text>
            <Text style={styles.eventName}>{eventDetails.eventName}</Text>
            <View style={styles.eventTypeBadge}>
              <Text style={styles.eventTypeText}>{eventDetails.eventType}</Text>
            </View>
          </View>

          {/* Date & Time Section */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>📅 Date:</Text>
              <Text style={styles.infoValue}>
                {formatDate(eventDetails.eventDate)}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>🕐 Time:</Text>
              <Text style={styles.infoValue}>
                {formatTime(eventDetails.startTime)} - {formatTime(eventDetails.endTime)}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>📍 Venue:</Text>
              <Text style={styles.infoValue}>{eventDetails.venue}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About the Event</Text>
            <Text style={styles.description}>{eventDetails.description}</Text>
          </View>

          {/* Registration Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Registration Details</Text>
            <View style={styles.registrationInfo}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Status:</Text>
                <View
                  style={[
                    styles.statusBadge,
                    eventDetails.registrationStatus === 'open'
                      ? styles.statusOpen
                      : styles.statusClosed,
                  ]}>
                  <Text style={[
                    styles.statusText,
                    eventDetails.registrationStatus !== 'open' && styles.statusClosedText
                  ]}>
                    {eventDetails.registrationStatus.toUpperCase()}
                  </Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Max Guests per Unit:</Text>
                <Text style={styles.infoValue}>
                  {eventDetails.maxGuestsPerUnit}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Max Participants:</Text>
                <Text style={styles.infoValue}>
                  {eventDetails.maxParticipants}
                </Text>
              </View>
              {eventDetails.registeredCount !== undefined && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Registered:</Text>
                  <Text style={styles.infoValue}>
                    {eventDetails.registeredCount} / {eventDetails.maxParticipants}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Registration Form */}
          {isRegistrationOpen && (
            <View style={styles.registrationForm}>
              <Text style={styles.sectionTitle}>Register for Event</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Number of Guests</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter number of guests"
                  keyboardType="numeric"
                  value={numberOfGuests}
                  onChangeText={setNumberOfGuests}
                  maxLength={2}
                />
                <Text style={styles.inputHint}>
                  Maximum {eventDetails.maxGuestsPerUnit} guests allowed
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.registerButton, registering && styles.buttonDisabled]}
                onPress={handleRegister}
                disabled={registering}>
                {registering ? (
                  <ActivityIndicator size="small" color={COLORS.WHITE} />
                ) : (
                  <Text style={styles.registerButtonText}>Register Now</Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          {!isRegistrationOpen && (
            <View style={styles.closedNotice}>
              <Text style={styles.closedNoticeIcon}>🔒</Text>
              <Text style={styles.closedNoticeText}>
                Registration is currently closed for this event
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  content: {
    padding: SPACING.XL,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.XL,
  },
  loadingText: {
    marginTop: SPACING.MD,
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH20,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: SPACING.LG,
  },
  errorText: {
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.ERROR_COLOR,
    textAlign: 'center',
    marginBottom: SPACING.XL,
    lineHeight: LH.LH20,
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
  emptyIcon: {
    fontSize: 64,
    marginBottom: SPACING.LG,
  },
  emptyText: {
    fontSize: FS.FS18,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
  },
  headerSection: {
    alignItems: 'center',
    paddingVertical: SPACING.XXL,
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.MD,
    marginBottom: SPACING.LG,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  eventIcon: {
    fontSize: 64,
    marginBottom: SPACING.MD,
  },
  eventName: {
    fontSize: FS.FS22,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    textAlign: 'center',
    marginBottom: SPACING.SM,
    lineHeight: LH.LH28,
  },
  eventTypeBadge: {
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.SM,
    borderRadius: BORDER_RADIUS.LG,
  },
  eventTypeText: {
    color: COLORS.WHITE,
    fontSize: FS.FS12,
    fontFamily: FF[600],
    textTransform: 'uppercase',
  },
  infoCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.LG,
    marginBottom: SPACING.LG,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.SM,
  },
  infoLabel: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    flex: 1,
    lineHeight: LH.LH20,
  },
  infoValue: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    flex: 1,
    textAlign: 'right',
    lineHeight: LH.LH20,
  },
  section: {
    marginBottom: SPACING.LG,
  },
  sectionTitle: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    marginBottom: SPACING.MD,
    lineHeight: LH.LH24,
  },
  description: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH20,
    backgroundColor: COLORS.WHITE,
    padding: SPACING.LG,
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  registrationInfo: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.LG,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  statusBadge: {
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.XS,
    borderRadius: BORDER_RADIUS.MD,
  },
  statusOpen: {
    backgroundColor: COLORS.LIGHT_GREEN,
    borderWidth: 1,
    borderColor: COLORS.LIGHT_BORDER_GREEN,
  },
  statusClosed: {
    backgroundColor: COLORS.LIGHT_GRAY,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  statusText: {
    color: COLORS.GREEN_TEXT,
    fontSize: FS.FS12,
    fontFamily: FF[600],
  },
  statusClosedText: {
    color: COLORS.GREY_TEXT,
  },
  registrationForm: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.LG,
    marginTop: SPACING.SM,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  inputContainer: {
    marginBottom: SPACING.LG,
  },
  inputLabel: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    marginBottom: SPACING.SM,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    borderRadius: BORDER_RADIUS.SM,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.SM,
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.BLACK,
    backgroundColor: COLORS.WHITE,
  },
  inputHint: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    marginTop: SPACING.XS,
  },
  registerButton: {
    backgroundColor: COLORS.BLACK,
    paddingVertical: SPACING.MD,
    borderRadius: BORDER_RADIUS.SM,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: COLORS.GREY_TEXT,
  },
  registerButtonText: {
    color: COLORS.WHITE,
    fontSize: FS.FS16,
    fontFamily: FF[600],
  },
  closedNotice: {
    backgroundColor: COLORS.ORANGE_BG,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.XL,
    alignItems: 'center',
    marginTop: SPACING.SM,
    borderWidth: 1,
    borderColor: COLORS.ORANGE_BORDER,
  },
  closedNoticeIcon: {
    fontSize: 48,
    marginBottom: SPACING.MD,
  },
  closedNoticeText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.ORANGE_TEXT,
    textAlign: 'center',
    lineHeight: LH.LH20,
  },
});

export default EventDetails;
