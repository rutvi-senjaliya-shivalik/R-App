import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, RefreshControl, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/common/container';
import { RootState } from '../../store/reducers';
import { fetchEvents } from '../../store/actions/events/eventsAction';
import { selectUserDetailData } from '../../store/selectors/auth';
import { COLORS, SPACING, BORDER_RADIUS, FF, FS, LH } from '../../constants';

interface EventsListProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

const EventsList: React.FC<EventsListProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const userDetailData = useSelector(selectUserDetailData);
  const user = userDetailData?.data?.result;
  const buildingId = user?.buildingId || user?.building?._id;

  const { loading, events, error } = useSelector((state: RootState) => state.events);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    if (buildingId) {
      dispatch(fetchEvents(buildingId) as never);
    }
  }, [dispatch, buildingId]);

  const onRefresh = () => {
    setRefreshing(true);
    if (buildingId) {
      dispatch(fetchEvents(buildingId) as never);
    }
    setTimeout(() => setRefreshing(false), 1000);
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

  const isUpcoming = (eventDate: string): boolean => {
    return new Date(eventDate) >= new Date();
  };

  const renderEventItem = ({ item }: { item: any }) => {
    const upcoming = isUpcoming(item.eventDate);

    return (
      <TouchableOpacity
        style={styles.eventCard}
        onPress={() => navigation.navigate('EventDetails', { eventId: item._id })}
      >
        <View style={styles.eventIconContainer}>
          <Text style={styles.eventIcon}>{getEventIcon(item.eventType)}</Text>
        </View>

        <View style={styles.eventInfo}>
          <Text style={styles.eventName}>{item.name}</Text>
          <Text style={styles.eventType}>{item.eventType}</Text>

          <View style={styles.eventMeta}>
            <View style={styles.metaRow}>
              <Text style={styles.metaIcon}>📅</Text>
              <Text style={styles.metaText}>
                {new Date(item.eventDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </Text>
            </View>

            {item.eventTime && (
              <View style={styles.metaRow}>
                <Text style={styles.metaIcon}>⏰</Text>
                <Text style={styles.metaText}>{item.eventTime}</Text>
              </View>
            )}
          </View>

          {item.venue && (
            <View style={styles.metaRow}>
              <Text style={styles.metaIcon}>📍</Text>
              <Text style={styles.metaText}>{item.venue}</Text>
            </View>
          )}

          <View style={styles.eventFooter}>
            {item.registrationLimit && (
              <Text style={styles.spotsText}>
                {item.registrationLimit - (item.currentRegistrations || 0)} spots left
              </Text>
            )}
            {!upcoming && (
              <View style={styles.pastBadge}>
                <Text style={styles.pastText}>PAST EVENT</Text>
              </View>
            )}
          </View>
        </View>

        <Text style={styles.viewDetails}>→</Text>
      </TouchableOpacity>
    );
  };

  if (loading && events.length === 0) {
    return (
      <Container>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Events</Text>
        </View>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.BLACK} />
          <Text style={styles.loadingText}>Loading events...</Text>
        </View>
      </Container>
    );
  }

  if (error && events.length === 0) {
    return (
      <Container>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Events</Text>
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              if (buildingId) {
                dispatch(fetchEvents(buildingId) as never);
              }
            }}
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
        <Text style={styles.headerTitle}>Community Events</Text>
        <Text style={styles.headerSubtitle}>
          {events.length} {events.length === 1 ? 'event' : 'events'}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.myRegistrationsButton}
        onPress={() => navigation.navigate('MyRegistrations')}
      >
        <Text style={styles.myRegistrationsText}>🎫 My Registrations</Text>
      </TouchableOpacity>

      {events.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyIcon}>🎉</Text>
          <Text style={styles.emptyText}>No events scheduled</Text>
          <Text style={styles.emptySubtext}>Check back later for upcoming events</Text>
        </View>
      ) : (
        <FlatList
          data={events}
          renderItem={renderEventItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.BLACK]} />
          }
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: SPACING.XL,
    paddingVertical: SPACING.XL,
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GREY,
  },
  headerTitle: {
    fontSize: FS.FS22,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    marginBottom: SPACING.XS,
    lineHeight: LH.LH28,
  },
  headerSubtitle: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH20,
  },
  myRegistrationsButton: {
    marginHorizontal: SPACING.LG,
    marginVertical: SPACING.LG,
    backgroundColor: COLORS.BLACK,
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.XL,
    borderRadius: BORDER_RADIUS.MD,
    alignItems: 'center',
  },
  myRegistrationsText: {
    color: COLORS.WHITE,
    fontSize: FS.FS16,
    fontFamily: FF[600],
  },
  listContainer: {
    padding: SPACING.LG,
  },
  eventCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.LG,
    marginBottom: SPACING.LG,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  eventIconContainer: {
    width: 60,
    height: 60,
    borderRadius: BORDER_RADIUS.MD,
    backgroundColor: COLORS.LIGHT_GRAY,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.LG,
  },
  eventIcon: {
    fontSize: 32,
  },
  eventInfo: {
    flex: 1,
  },
  eventName: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    marginBottom: SPACING.XS,
    lineHeight: LH.LH24,
  },
  eventType: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    marginBottom: SPACING.SM,
    lineHeight: LH.LH20,
  },
  eventMeta: {
    marginBottom: SPACING.SM,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.XS,
  },
  metaIcon: {
    fontSize: FS.FS14,
    marginRight: SPACING.SM,
    width: 20,
  },
  metaText: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH16,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.SM,
  },
  spotsText: {
    fontSize: FS.FS12,
    fontFamily: FF[600],
    color: COLORS.GREEN_TEXT,
  },
  pastBadge: {
    backgroundColor: COLORS.LIGHT_GRAY,
    paddingHorizontal: SPACING.SM,
    paddingVertical: SPACING.XS,
    borderRadius: BORDER_RADIUS.SM,
  },
  pastText: {
    fontSize: FS.FS10,
    fontFamily: FF[600],
    color: COLORS.GREY_TEXT,
    textTransform: 'uppercase',
  },
  viewDetails: {
    fontSize: FS.FS22,
    color: COLORS.BLACK,
    fontFamily: FF[300],
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
    lineHeight: LH.LH20,
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
    fontFamily: FF[600],
    color: COLORS.GREY_TEXT,
    marginBottom: SPACING.SM,
  },
  emptySubtext: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
  },
});

export default EventsList;
