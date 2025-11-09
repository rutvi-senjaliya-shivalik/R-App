import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/common/container';
import { RootState } from '../../store/reducers';
import {
  fetchMyRegistrations,
  cancelRegistration,
} from '../../store/actions/events/eventsAction';
import { selectUserDetailData } from '../../store/selectors/auth';
import { COLORS, SPACING, BORDER_RADIUS, FF, FS, LH } from '../../constants';

interface MyRegistrationsProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
  };
}

const MyRegistrations: React.FC<MyRegistrationsProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const userDetailData = useSelector(selectUserDetailData);
  const user = userDetailData?.data?.result;
  const memberId = user?._id || user?.id;

  const { loading, myRegistrations, error } = useSelector(
    (state: RootState) => state.events,
  );

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (memberId) {
      dispatch(fetchMyRegistrations(memberId) as never);
    }
  }, [dispatch, memberId]);

  const onRefresh = () => {
    setRefreshing(true);
    if (memberId) {
      dispatch(fetchMyRegistrations(memberId) as never);
    }
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleCancelRegistration = (registrationId: string, eventName: string) => {
    Alert.alert(
      'Cancel Registration',
      `Are you sure you want to cancel your registration for "${eventName}"?`,
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            dispatch(cancelRegistration(registrationId) as never);
            setTimeout(() => {
              Alert.alert('Success', 'Registration cancelled successfully');
              if (memberId) {
                dispatch(fetchMyRegistrations(memberId) as never);
              }
            }, 1000);
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

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'registered':
      case 'confirmed':
        return {
          backgroundColor: COLORS.LIGHT_GREEN,
          textColor: COLORS.GREEN_TEXT,
        };
      case 'waitlist':
      case 'pending':
        return {
          backgroundColor: COLORS.ORANGE_BG,
          textColor: COLORS.ORANGE_TEXT,
        };
      case 'cancelled':
        return {
          backgroundColor: COLORS.LIGHT_GRAY,
          textColor: COLORS.GREY_TEXT,
        };
      default:
        return {
          backgroundColor: COLORS.OCEAN_BLUE_BG,
          textColor: COLORS.OCEAN_BLUE_TEXT,
        };
    }
  };

  const renderRegistrationItem = ({ item }: { item: any }) => {
    const canCancel = item.registrationStatus === 'registered' &&
                      new Date(item.eventDetails?.eventDate) > new Date();
    const statusStyle = getStatusStyle(item.registrationStatus);

    return (
      <View style={styles.registrationCard}>
        {/* Event Icon and Name */}
        <View style={styles.cardHeader}>
          <Text style={styles.eventIcon}>
            {getEventIcon(item.eventDetails?.eventType)}
          </Text>
          <View style={styles.headerInfo}>
            <Text style={styles.eventName}>{item.eventDetails?.eventName}</Text>
            <Text style={styles.eventType}>{item.eventDetails?.eventType}</Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: statusStyle.backgroundColor },
            ]}>
            <Text style={[styles.statusText, { color: statusStyle.textColor }]}>
              {item.registrationStatus.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Event Details */}
        <View style={styles.detailsSection}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>📅 Date:</Text>
            <Text style={styles.detailValue}>
              {formatDate(item.eventDetails?.eventDate)}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>🕐 Time:</Text>
            <Text style={styles.detailValue}>
              {formatTime(item.eventDetails?.startTime)} - {formatTime(item.eventDetails?.endTime)}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>📍 Venue:</Text>
            <Text style={styles.detailValue}>{item.eventDetails?.venue}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>👥 Guests:</Text>
            <Text style={styles.detailValue}>{item.numberOfGuests}</Text>
          </View>
        </View>

        {/* Registration Info */}
        <View style={styles.registrationInfo}>
          <Text style={styles.registrationDate}>
            Registered on: {formatDate(item.registeredAt)}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() =>
              navigation.navigate('EventDetails', {
                eventId: item.eventId,
              })
            }>
            <Text style={styles.viewButtonText}>View Event</Text>
          </TouchableOpacity>

          {canCancel && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() =>
                handleCancelRegistration(item._id, item.eventDetails?.eventName)
              }>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  if (loading && (!myRegistrations || myRegistrations.length === 0)) {
    return (
      <Container>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.BLACK} />
          <Text style={styles.loadingText}>Loading registrations...</Text>
        </View>
      </Container>
    );
  }

  if (error && (!myRegistrations || myRegistrations.length === 0)) {
    return (
      <Container>
        <View style={styles.centerContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              if (memberId) {
                dispatch(fetchMyRegistrations(memberId) as never);
              }
            }}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <View style={styles.container}>
        <FlatList
          data={myRegistrations}
          renderItem={renderRegistrationItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.BLACK]}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📭</Text>
              <Text style={styles.emptyText}>No Event Registrations</Text>
              <Text style={styles.emptySubtext}>
                Register for events to see them here
              </Text>
            </View>
          }
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  listContent: {
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: SPACING.LG,
  },
  emptyText: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    marginBottom: SPACING.SM,
  },
  emptySubtext: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
  },
  registrationCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.LG,
    marginBottom: SPACING.MD,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.MD,
  },
  eventIcon: {
    fontSize: 40,
    marginRight: SPACING.MD,
  },
  headerInfo: {
    flex: 1,
  },
  eventName: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    marginBottom: SPACING.XS,
    lineHeight: LH.LH20,
  },
  eventType: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    textTransform: 'capitalize',
  },
  statusBadge: {
    paddingHorizontal: SPACING.SM,
    paddingVertical: SPACING.XS,
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  statusText: {
    fontSize: FS.FS10,
    fontFamily: FF[600],
    textTransform: 'uppercase',
  },
  detailsSection: {
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: BORDER_RADIUS.SM,
    padding: SPACING.MD,
    marginBottom: SPACING.MD,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.XS,
  },
  detailLabel: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    flex: 1,
    lineHeight: LH.LH16,
  },
  detailValue: {
    fontSize: FS.FS12,
    fontFamily: FF[500],
    color: COLORS.BLACK,
    flex: 1,
    textAlign: 'right',
    lineHeight: LH.LH16,
  },
  registrationInfo: {
    marginBottom: SPACING.MD,
    paddingTop: SPACING.SM,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER_GREY,
  },
  registrationDate: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    fontStyle: 'italic',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SPACING.SM,
  },
  viewButton: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    paddingVertical: SPACING.SM,
    borderRadius: BORDER_RADIUS.SM,
    alignItems: 'center',
  },
  viewButtonText: {
    color: COLORS.WHITE,
    fontSize: FS.FS14,
    fontFamily: FF[600],
  },
  cancelButton: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.ERROR_COLOR,
    paddingVertical: SPACING.SM,
    borderRadius: BORDER_RADIUS.SM,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.ERROR_COLOR,
    fontSize: FS.FS14,
    fontFamily: FF[600],
  },
});

export default MyRegistrations;
