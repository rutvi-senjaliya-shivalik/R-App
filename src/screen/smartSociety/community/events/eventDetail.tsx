import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Container, HeaderComponent, CustomButton } from '../../../../components/common';
import EventDetailStyles from './styles/eventDetailStyles';
import { COLORS } from '../../../../constants';
import { useTranslation } from '../../../../context/LanguageContext';
import { useDispatch, useSelector } from 'react-redux';
import { getEventDetailAction } from '../../../../store/actions/smartSociety/getEventDetailAction';
import { updateEventRsvpAction, cancelEventRegistrationAction } from '../../../../store/actions/smartSociety/updateEventRsvpAction';
import PrefManager from '../../../../utils/prefManager';
import { STRING } from '../../../../constants';

const EventDetail = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch() as any;
  const isMountedRef = useRef(true);
  const event = props.route?.params?.event;
  const selectedRole = props.route?.params?.selectedRole;
  const eventId = event?.id || event?._id;
  
  const eventDetailLoading = useSelector((state: any) => state.getEventDetail?.loading);
  const eventDetailData = useSelector((state: any) => state.getEventDetail?.data);
  const eventDetailError = useSelector((state: any) => state.getEventDetail?.error);
  
  const updateRsvpLoading = useSelector((state: any) => state.updateEventRsvp?.loading);
  const updateRsvpData = useSelector((state: any) => state.updateEventRsvp?.data);
  const updateRsvpError = useSelector((state: any) => state.updateEventRsvp?.error);
  
  const cancelRegistrationLoading = useSelector((state: any) => state.cancelEventRegistration?.loading);
  const cancelRegistrationData = useSelector((state: any) => state.cancelEventRegistration?.data);
  const cancelRegistrationError = useSelector((state: any) => state.cancelEventRegistration?.error);

  const [rsvpStatus, setRsvpStatus] = useState<string | null>(null);
  const [eventData, setEventData] = useState(event);
  const [hasPaid, setHasPaid] = useState<boolean>(false);

  useEffect(() => {
    isMountedRef.current = true;
    if (eventId) {
      loadEventDetail();
    } else if (event) {
      // Use passed event data if no ID
      initializeEventData(event);
    }
    return () => {
      isMountedRef.current = false;
    };
  }, [eventId]);

  // Load event detail from API
  const loadEventDetail = async () => {
    if (!eventId) return;
    try {
      const response = await dispatch(getEventDetailAction(eventId));
      if (response?.data?.result || response?.data?.data || response?.data) {
        const eventInfo = response.data.result || response.data.data || response.data;
        initializeEventData(eventInfo);
      }
    } catch (error: any) {
      console.error('Error loading event detail:', error);
      // Fallback to passed event data if API fails
      if (event) {
        initializeEventData(event);
      }
    }
  };

  // Initialize event data and RSVP status
  const initializeEventData = (eventInfo: any) => {
    setEventData(eventInfo);
    
    // Extract user's RSVP status from event data - handle multiple formats
    let userRsvp = null;
    
    // Format 1: Direct userRsvpStatus field
    if (eventInfo.userRsvpStatus) {
      userRsvp = eventInfo.userRsvpStatus;
    }
    // Format 2: In registrations array
    else if (Array.isArray(eventInfo.registrations)) {
      const userRegistration = eventInfo.registrations.find((reg: any) => reg.isCurrentUser || reg.isUser);
      if (userRegistration) {
        userRsvp = userRegistration.status;
      }
    }
    // Format 3: In rsvp object (need to get current user ID)
    else if (eventInfo.rsvp && typeof eventInfo.rsvp === 'object') {
      // Try to get user ID from storage
      PrefManager.getValue(STRING.USER).then((user: any) => {
        if (user) {
          const userId = user.id || user.userId || user._id;
          if (userId && eventInfo.rsvp[userId]) {
            setRsvpStatus(eventInfo.rsvp[userId]);
          }
        }
      }).catch(() => {});
    }
    
    setRsvpStatus(userRsvp);
    
    // Extract payment status - handle multiple formats
    let userPaymentStatus = false;
    
    if (eventInfo.userPaymentStatus !== undefined) {
      userPaymentStatus = eventInfo.userPaymentStatus;
    } else if (eventInfo.payments && typeof eventInfo.payments === 'object') {
      // Try to get user ID from storage
      PrefManager.getValue(STRING.USER).then((user: any) => {
        if (user) {
          const userId = user.id || user.userId || user._id;
          if (userId && eventInfo.payments[userId]) {
            setHasPaid(true);
          }
        }
      }).catch(() => {});
    } else if (Array.isArray(eventInfo.payments)) {
      const userPayment = eventInfo.payments.find((payment: any) => payment.isCurrentUser || payment.isUser);
      if (userPayment) {
        userPaymentStatus = userPayment.paid || userPayment.status === 'paid';
      }
    }
    
    setHasPaid(userPaymentStatus);
  };

  // Update event data when API response changes
  useEffect(() => {
    if (eventDetailData && isMountedRef.current) {
      // Handle multiple response formats
      const response = eventDetailData?.data || eventDetailData;
      const eventInfo = response?.result || response?.data || response;
      
      if (eventInfo) {
        initializeEventData(eventInfo);
      }
    }
  }, [eventDetailData]);

  // Handle event detail errors
  useEffect(() => {
    if (eventDetailError && isMountedRef.current) {
      const errorMessage =
        eventDetailError?.response?.data?.message ||
        eventDetailError?.response?.data?.error ||
        eventDetailError?.message ||
        t('smartSociety.failedToLoadEventDetails');
      console.error('Event Detail Error:', errorMessage);
      // Don't show alert if we have fallback event data
      if (!event) {
        Alert.alert(t('common.error'), errorMessage);
      }
    }
  }, [eventDetailError]);

  // Handle RSVP update success
  useEffect(() => {
    if (updateRsvpData && isMountedRef.current) {
      // Handle multiple response formats
      const response = updateRsvpData?.data || updateRsvpData;
      const updatedRsvp = response?.result?.status || response?.status || response?.data?.status;
      
      if (updatedRsvp) {
        setRsvpStatus(updatedRsvp);
        // Reload event detail to get updated RSVP counts
        if (eventId) {
          setTimeout(() => {
            loadEventDetail();
          }, 500); // Small delay to ensure backend has processed the update
        }
      } else {
        // If status not in response, reload event detail to get updated status
        if (eventId) {
          setTimeout(() => {
            loadEventDetail();
          }, 500);
        }
      }
      // Clear the reducer state
      dispatch({ type: 'UPDATE_EVENT_RSVP_CLEAR' });
    }
  }, [updateRsvpData]);

  // Handle RSVP update errors
  useEffect(() => {
    if (updateRsvpError && isMountedRef.current) {
      const errorMessage =
        updateRsvpError?.response?.data?.message ||
        updateRsvpError?.message ||
        t('smartSociety.failedToUpdateRSVP');
      Alert.alert(t('common.error'), errorMessage);
    }
  }, [updateRsvpError]);

  // Handle cancel registration success
  useEffect(() => {
    if (cancelRegistrationData && isMountedRef.current) {
      setRsvpStatus(null);
      Alert.alert(t('common.success'), t('smartSociety.registrationCancelled'));
      // Reload event detail to get updated RSVP counts
      if (eventId) {
        loadEventDetail();
      }
      // Clear the reducer state
      dispatch({ type: 'CANCEL_EVENT_REGISTRATION_CLEAR' });
    }
  }, [cancelRegistrationData]);

  // Handle cancel registration errors
  useEffect(() => {
    if (cancelRegistrationError && isMountedRef.current) {
      const errorMessage =
        cancelRegistrationError?.response?.data?.message ||
        cancelRegistrationError?.message ||
        t('smartSociety.failedToCancelRegistration');
      Alert.alert(t('common.error'), errorMessage);
    }
  }, [cancelRegistrationError]);

  const isAdmin = selectedRole?.id === 'admin';
  const isResident = selectedRole?.id === 'resident';

  const handleRsvp = async (status: 'Going' | 'Maybe' | 'Not Going') => {
    if (!eventId) {
      Alert.alert(t('common.error'), t('smartSociety.eventIdNotFound'));
      return;
    }

    if (updateRsvpLoading || cancelRegistrationLoading) {
      return; // Prevent multiple submissions
    }

    try {
      // If user is already registered and selecting "Not Going", cancel registration
      if (rsvpStatus && status === 'Not Going') {
        await dispatch(cancelEventRegistrationAction(eventId));
        // Success alert will be shown in useEffect for cancelRegistrationData
      } else {
        await dispatch(updateEventRsvpAction(eventId, status));
        // Don't show alert here - let the useEffect handle it after reloading event detail
        // This ensures we show the correct status after the API has updated
      }
    } catch (error: any) {
      console.error('Error updating RSVP:', error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        t('smartSociety.failedToUpdateRSVP');
      Alert.alert(t('common.error'), errorMessage);
    }
  };

  const handlePayNow = () => {
    if (!eventData.isPaid) return;
    
    // Navigate to payment screen with event data
    props.navigation?.navigate('PaymentScreen', {
      event: eventData,
      type: 'event',
      selectedRole,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Handle different RSVP response formats
  const getRsvpCount = () => {
    if (!eventData) return 0;
    
    // Format 1: rsvp is an object with user IDs as keys
    if (eventData.rsvp && typeof eventData.rsvp === 'object' && !Array.isArray(eventData.rsvp)) {
      return Object.keys(eventData.rsvp).length;
    }
    
    // Format 2: rsvp is an array
    if (Array.isArray(eventData.rsvp)) {
      return eventData.rsvp.length;
    }
    
    // Format 3: registeredCount field
    if (eventData.registeredCount !== undefined) {
      return eventData.registeredCount;
    }
    
    // Format 4: registrations array
    if (Array.isArray(eventData.registrations)) {
      return eventData.registrations.length;
    }
    
    return 0;
  };

  const getGoingCount = () => {
    if (!eventData) return 0;
    
    // Format 1: rsvp is an object
    if (eventData.rsvp && typeof eventData.rsvp === 'object' && !Array.isArray(eventData.rsvp)) {
      return Object.values(eventData.rsvp).filter(
        (status: any) => status === 'Going' || status === 'going',
      ).length;
    }
    
    // Format 2: rsvp is an array
    if (Array.isArray(eventData.rsvp)) {
      return eventData.rsvp.filter(
        (item: any) => (item.status === 'Going' || item.status === 'going') || item === 'Going' || item === 'going',
      ).length;
    }
    
    // Format 3: goingCount field
    if (eventData.goingCount !== undefined) {
      return eventData.goingCount;
    }
    
    // Format 4: registrations array
    if (Array.isArray(eventData.registrations)) {
      return eventData.registrations.filter(
        (item: any) => item.status === 'Going' || item.status === 'going',
      ).length;
    }
    
    return 0;
  };

  const rsvpCount = getRsvpCount();
  const goingCount = getGoingCount();

  if (eventDetailLoading && !eventData) {
    return (
      <Container>
        <HeaderComponent
          Title={t('smartSociety.eventDetails')}
          onPress={() => props.navigation?.goBack()}
        />
        <View style={EventDetailStyles.container}>
          <ActivityIndicator size="large" color={COLORS.OCEAN_BLUE_TEXT} />
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            {t('common.loading')}
          </Text>
        </View>
      </Container>
    );
  }

  if (!eventData) {
    return (
      <Container>
        <HeaderComponent
          Title={t('smartSociety.eventDetails')}
          onPress={() => props.navigation?.goBack()}
        />
        <View style={EventDetailStyles.container}>
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            {t('smartSociety.eventNotFound')}
          </Text>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.eventDetails')}
        onPress={() => props.navigation?.goBack()}
      />
      <ScrollView
        style={EventDetailStyles.container}
        contentContainerStyle={EventDetailStyles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshing={eventDetailLoading}
        onRefresh={eventId ? loadEventDetail : undefined}
      >
        {eventData.imageUrl && (
          <Image
            source={{ uri: eventData.imageUrl }}
            style={EventDetailStyles.eventImage}
          />
        )}

        <View style={EventDetailStyles.headerCard}>
          <Text style={EventDetailStyles.title}>{eventData.name || eventData.title}</Text>
          <View style={EventDetailStyles.dateTimeRow}>
            <View style={EventDetailStyles.dateTimeItem}>
              <Text style={EventDetailStyles.dateTimeLabel}>{t('smartSociety.date')}</Text>
              <Text style={EventDetailStyles.dateTimeValue}>
                {formatDate(eventData.date)}
              </Text>
            </View>
            <View style={EventDetailStyles.dateTimeItem}>
              <Text style={EventDetailStyles.dateTimeLabel}>{t('smartSociety.time')}</Text>
              <Text style={EventDetailStyles.dateTimeValue}>
                {eventData.time}
              </Text>
            </View>
          </View>
          <View style={EventDetailStyles.venueRow}>
            <Text style={EventDetailStyles.venueLabel}>{t('smartSociety.venue')}</Text>
            <Text style={EventDetailStyles.venueValue}>{eventData.location || eventData.venue}</Text>
          </View>
          {eventData.isPaid && (
            <View style={EventDetailStyles.paymentRow}>
              <View style={EventDetailStyles.paymentInfo}>
                <Text style={EventDetailStyles.paymentLabel}>
                  {t('smartSociety.eventFee')}
                </Text>
                <Text style={EventDetailStyles.paymentAmount}>
                  ₹{eventData.amount?.toLocaleString() || '0'}
                </Text>
              </View>
              {hasPaid && (
                <View style={EventDetailStyles.paidBadge}>
                  <Text style={EventDetailStyles.paidBadgeText}>
                    {t('smartSociety.paid')}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>

        <View style={EventDetailStyles.section}>
          <Text style={EventDetailStyles.sectionTitle}>{t('smartSociety.description')}</Text>
          <Text style={EventDetailStyles.description}>
            {eventData.description}
          </Text>
        </View>

        <View style={EventDetailStyles.section}>
          <Text style={EventDetailStyles.sectionTitle}>{t('smartSociety.rsvpStatus')}</Text>
          <View style={EventDetailStyles.rsvpStats}>
            <View style={EventDetailStyles.statItem}>
              <Text style={EventDetailStyles.statValue}>{goingCount}</Text>
              <Text style={EventDetailStyles.statLabel}>{t('smartSociety.going')}</Text>
            </View>
            <View style={EventDetailStyles.statItem}>
              <Text style={EventDetailStyles.statValue}>{rsvpCount}</Text>
              <Text style={EventDetailStyles.statLabel}>{t('smartSociety.totalRSVPs')}</Text>
            </View>
          </View>
        </View>

        {/* Payment Section for Paid Events */}
        {isResident && eventData.isPaid && !hasPaid && (
          <View style={EventDetailStyles.section}>
            <View style={EventDetailStyles.paymentCard}>
              <View style={EventDetailStyles.paymentCardHeader}>
                <Text style={EventDetailStyles.paymentCardTitle}>
                  {t('smartSociety.eventPayment')}
                </Text>
                <Text style={EventDetailStyles.paymentCardAmount}>
                  ₹{eventData.amount?.toLocaleString() || '0'}
                </Text>
              </View>
              <Text style={EventDetailStyles.paymentCardDescription}>
                {t('smartSociety.payToAttendEvent')}
              </Text>
              <CustomButton
                title={t('smartSociety.payNow')}
                onPress={handlePayNow}
                style={EventDetailStyles.payNowButton}
              />
            </View>
          </View>
        )}

        {isResident && (
          <View style={EventDetailStyles.section}>
            <Text style={EventDetailStyles.sectionTitle}>{t('smartSociety.yourRSVP')}</Text>
            <View style={EventDetailStyles.rsvpButtons}>
              <TouchableOpacity
                style={[
                  EventDetailStyles.rsvpButton,
                  rsvpStatus === 'Going' && EventDetailStyles.rsvpButtonActive,
                  rsvpStatus === 'Going' && {
                    backgroundColor: COLORS.LIGHT_GREEN,
                    borderColor: COLORS.LIGHT_BORDER_GREEN,
                  },
                  (updateRsvpLoading || cancelRegistrationLoading) && { opacity: 0.6 },
                ]}
                onPress={() => handleRsvp('Going')}
                disabled={updateRsvpLoading || cancelRegistrationLoading}
              >
                {(updateRsvpLoading || cancelRegistrationLoading) && rsvpStatus === 'Going' ? (
                  <ActivityIndicator size="small" color={COLORS.GREEN_TEXT} />
                ) : (
                  <Text
                    style={[
                      EventDetailStyles.rsvpButtonText,
                      rsvpStatus === 'Going' && { color: COLORS.GREEN_TEXT },
                    ]}
                  >
                    {t('smartSociety.going')}
                  </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  EventDetailStyles.rsvpButton,
                  rsvpStatus === 'Maybe' && EventDetailStyles.rsvpButtonActive,
                  rsvpStatus === 'Maybe' && {
                    backgroundColor: COLORS.YELLOW_BG,
                    borderColor: COLORS.YELLOW_BORDER,
                  },
                  (updateRsvpLoading || cancelRegistrationLoading) && { opacity: 0.6 },
                ]}
                onPress={() => handleRsvp('Maybe')}
                disabled={updateRsvpLoading || cancelRegistrationLoading}
              >
                {(updateRsvpLoading || cancelRegistrationLoading) && rsvpStatus === 'Maybe' ? (
                  <ActivityIndicator size="small" color={COLORS.ORANGE_TEXT} />
                ) : (
                  <Text
                    style={[
                      EventDetailStyles.rsvpButtonText,
                      rsvpStatus === 'Maybe' && { color: COLORS.ORANGE_TEXT },
                    ]}
                  >
                    {t('smartSociety.maybe')}
                  </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  EventDetailStyles.rsvpButton,
                  rsvpStatus === 'Not Going' && EventDetailStyles.rsvpButtonActive,
                  rsvpStatus === 'Not Going' && {
                    backgroundColor: COLORS.ORANGE_BG,
                    borderColor: COLORS.ORANGE_BORDER,
                  },
                  (updateRsvpLoading || cancelRegistrationLoading) && { opacity: 0.6 },
                ]}
                onPress={() => handleRsvp('Not Going')}
                disabled={updateRsvpLoading || cancelRegistrationLoading}
              >
                {(updateRsvpLoading || cancelRegistrationLoading) && rsvpStatus === 'Not Going' ? (
                  <ActivityIndicator size="small" color={COLORS.ORANGE_TEXT} />
                ) : (
                  <Text
                    style={[
                      EventDetailStyles.rsvpButtonText,
                      rsvpStatus === 'Not Going' && { color: COLORS.ORANGE_TEXT },
                    ]}
                  >
                    {t('smartSociety.notGoing')}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}

        {isAdmin && (
          <View style={EventDetailStyles.section}>
            <Text style={EventDetailStyles.sectionTitle}>{t('smartSociety.attendees')}</Text>
            <View style={EventDetailStyles.attendeesList}>
              <Text style={EventDetailStyles.attendeesText}>
                {t('smartSociety.peopleHaveRSVPd', { count: rsvpCount })}
              </Text>
              {/* TODO: Show list of attendees */}
            </View>
          </View>
        )}
      </ScrollView>
    </Container>
  );
};

export default EventDetail;

