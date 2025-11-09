import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Container, HeaderComponent } from '../../../../components/common';
import EventsListStyles from './styles/eventsListStyles';
import { COLORS } from '../../../../constants';
import { useTranslation } from '../../../../context/LanguageContext';
import { useDispatch, useSelector } from 'react-redux';
import { getEventsListAction } from '../../../../store/actions/smartSociety/getEventsListAction';

const EventsList = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch() as any;
  const isMountedRef = useRef(true);
  const selectedRole = props.route?.params?.selectedRole;
  const [filter, setFilter] = useState<'upcoming' | 'past'>('upcoming');

  const eventsListLoading = useSelector(
    (state: any) => state.getEventsList?.loading,
  );
  const eventsListData = useSelector((state: any) => state.getEventsList?.data);

  useEffect(() => {
    isMountedRef.current = true;
    loadEvents();
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Reload events when filter changes
  useEffect(() => {
    if (isMountedRef.current) {
      loadEvents();
    }
  }, [filter]);

  const loadEvents = async () => {
    try {
      const upcoming = filter === 'upcoming';
      await dispatch(
        getEventsListAction({
          upcoming,
          status: 'Published',
          page: 1,
          limit: 10,
        }),
      );
    } catch (error: any) {
      console.error('Error loading events:', error);
      // Error is already handled by reducer, but we can log it here for debugging
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Failed to load events';
      console.error('Events List Error:', errorMessage);
    }
  };

  // Extract events from API response - handle multiple response formats
  const events = (() => {
    if (!eventsListData) return [];

    const response = eventsListData?.data || eventsListData;

    // Format 1: Direct array
    if (Array.isArray(response)) {
      return response;
    }

    // Format 2: data.result array
    if (response?.result && Array.isArray(response.result)) {
      return response.result;
    }

    // Format 3: data.data array
    if (response?.data && Array.isArray(response.data)) {
      return response.data;
    }

    // Format 4: data.events array
    if (response?.events && Array.isArray(response.events)) {
      return response.events;
    }

    // Format 5: data.result.events array
    if (response?.result?.events && Array.isArray(response.result.events)) {
      return response.result.events;
    }

    // Format 6: data.result.data array
    if (response?.result?.data && Array.isArray(response.result.data)) {
      return response.result.data;
    }

    console.warn('⚠️ Unexpected events list response format:', response);
    return [];
  })();

  const filteredEvents = Array.isArray(events)
    ? events.filter(event => {
        if (!event || !event.date) return false;

        try {
          const eventDate = new Date(event.date);
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          if (filter === 'upcoming') {
            return eventDate >= today;
          } else {
            return eventDate < today;
          }
        } catch (error) {
          console.error('Error filtering event:', error);
          return false;
        }
      })
    : [];

  const handleEventPress = (event: any) => {
    props.navigation?.navigate('EventDetail', { event, selectedRole });
  };

  const handleAddEvent = () => {
    props.navigation?.navigate('AddEvent', { selectedRole });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderEventCard = ({ item }: any) => {
    // Handle both old and new API response formats
    const eventName = item.name || item.title;
    const eventLocation = item.location || item.venue;

    // Calculate RSVP count - handle multiple formats
    const getRsvpCount = () => {
      if (item.registeredCount !== undefined) return item.registeredCount;
      if (
        item.rsvp &&
        typeof item.rsvp === 'object' &&
        !Array.isArray(item.rsvp)
      ) {
        return Object.keys(item.rsvp).length;
      }
      if (Array.isArray(item.rsvp)) {
        return item.rsvp.length;
      }
      if (Array.isArray(item.registrations)) {
        return item.registrations.length;
      }
      return 0;
    };

    const rsvpCount = getRsvpCount();

    // Get user RSVP status - will be updated when user data is available
    const userRsvp = item.userRsvpStatus || null;
    const hasPaid = item.userPaymentStatus || false;

    return (
      <TouchableOpacity
        style={EventsListStyles.eventCard}
        activeOpacity={0.7}
        onPress={() => handleEventPress(item)}
      >
        {item.imageUrl && (
          <Image
            source={{ uri: item.imageUrl }}
            style={EventsListStyles.eventImage}
          />
        )}
        <View style={EventsListStyles.eventContent}>
          <View style={EventsListStyles.eventHeader}>
            <View style={EventsListStyles.eventHeaderLeft}>
              <Text style={EventsListStyles.dateText}>
                {formatDate(item.date)}
              </Text>
              <Text style={EventsListStyles.timeText}>{item.time}</Text>
            </View>
            <View style={EventsListStyles.badgeContainer}>
              {item.isPaid && (
                <View style={EventsListStyles.paidBadge}>
                  <Text style={EventsListStyles.paidBadgeText}>
                    ₹{item.amount?.toLocaleString() || '0'}
                  </Text>
                </View>
              )}
              {userRsvp && (
                <View
                  style={[
                    EventsListStyles.rsvpBadge,
                    {
                      backgroundColor:
                        userRsvp === 'Going'
                          ? COLORS.LIGHT_GREEN
                          : COLORS.YELLOW_BG,
                    },
                  ]}
                >
                  <Text
                    style={[
                      EventsListStyles.rsvpBadgeText,
                      {
                        color:
                          userRsvp === 'Going'
                            ? COLORS.GREEN_TEXT
                            : COLORS.ORANGE_TEXT,
                      },
                    ]}
                  >
                    {userRsvp}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <Text style={EventsListStyles.title}>{eventName}</Text>
          <Text style={EventsListStyles.description} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={EventsListStyles.eventFooter}>
            <Text style={EventsListStyles.venueText}>📍 {eventLocation}</Text>
            <Text style={EventsListStyles.rsvpCountText}>
              {rsvpCount} {t('smartSociety.rsvps')}
            </Text>
          </View>
          {item.isPaid && !hasPaid && (
            <View style={EventsListStyles.paymentReminder}>
              <Text style={EventsListStyles.paymentReminderText}>
                {t('smartSociety.paymentRequired')}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const isAdmin = selectedRole?.id === 'admin';

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.events')}
        onPress={() => props.navigation?.goBack()}
      />
      <View style={EventsListStyles.container}>
        <View style={EventsListStyles.filterContainer}>
          <TouchableOpacity
            style={[
              EventsListStyles.filterTab,
              filter === 'upcoming' && EventsListStyles.filterTabActive,
            ]}
            onPress={() => setFilter('upcoming')}
          >
            <Text
              style={[
                EventsListStyles.filterTabText,
                filter === 'upcoming' && EventsListStyles.filterTabTextActive,
              ]}
            >
              {t('smartSociety.upcoming')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              EventsListStyles.filterTab,
              filter === 'past' && EventsListStyles.filterTabActive,
            ]}
            onPress={() => setFilter('past')}
          >
            <Text
              style={[
                EventsListStyles.filterTabText,
                filter === 'past' && EventsListStyles.filterTabTextActive,
              ]}
            >
              {t('smartSociety.past')}
            </Text>
          </TouchableOpacity>
        </View>

        {eventsListLoading && (!events || events.length === 0) ? (
          <View style={EventsListStyles.emptyState}>
            <ActivityIndicator size="large" color={COLORS.OCEAN_BLUE_TEXT} />
            <Text style={EventsListStyles.emptyStateText}>
              {t('common.loading')}
            </Text>
          </View>
        ) : (
          <FlatList
            data={Array.isArray(filteredEvents) ? filteredEvents : []}
            renderItem={renderEventCard}
            keyExtractor={item =>
              item?.id || item?._id || Math.random().toString()
            }
            contentContainerStyle={EventsListStyles.eventsList}
            refreshing={eventsListLoading}
            onRefresh={loadEvents}
            ListEmptyComponent={
              <View style={EventsListStyles.emptyState}>
                <Text style={EventsListStyles.emptyStateText}>
                  {t('smartSociety.noEventsFound')}
                </Text>
              </View>
            }
          />
        )}

        {isAdmin && (
          <TouchableOpacity
            style={EventsListStyles.fab}
            activeOpacity={0.8}
            onPress={handleAddEvent}
          >
            <Text style={EventsListStyles.fabText}>+</Text>
          </TouchableOpacity>
        )}
      </View>
    </Container>
  );
};

export default EventsList;
