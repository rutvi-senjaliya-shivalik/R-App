import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/common/container';
import { RootState } from '../../store/reducers';
import { fetchAmenities } from '../../store/actions/amenities/amenitiesAction';
import { selectUserDetailData } from '../../store/selectors/auth';
import { COLORS, FF, FS, SPACING, BORDER_RADIUS } from '../../constants';

interface AmenitiesListProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

const AmenitiesList: React.FC<AmenitiesListProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const { userData } = useSelector((state: any) => state.otp);
  const userDetailData = useSelector(selectUserDetailData);
  const user = userDetailData?.data?.result;

  const buildingId =
    userData?.member?.buildingId ||
    user?.buildingId ||
    user?.building?._id;

  const { loading, amenities, error } = useSelector(
    (state: RootState) => state.amenities
  );
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    console.log('🏢 AmenitiesList - buildingId:', buildingId);
    if (buildingId) {
      console.log('🏊 Fetching amenities for buildingId:', buildingId);
      dispatch(fetchAmenities(buildingId) as never);
    } else {
      console.warn('⚠️ No buildingId found - cannot fetch amenities');
    }
  }, [dispatch, buildingId]);

  useEffect(() => {
    if (amenities?.length) {
      console.log(
        '✅ Amenities fetched:',
        amenities.map((a) => ({
          name: a.name,
          images: a.images,
        }))
      );
    }
  }, [amenities]);

  const onRefresh = () => {
    setRefreshing(true);
    if (buildingId) {
      dispatch(fetchAmenities(buildingId) as never);
    }
    setTimeout(() => setRefreshing(false), 1000);
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

  const renderAmenityItem = ({ item }: { item: any }) => {
    // ✅ Handle both array and stringified array cases
    const imageSource = Array.isArray(item.images)
      ? item.images[0]
      : (() => {
        try {
          const parsed = JSON.parse(item.images);
          return Array.isArray(parsed) ? parsed[0] : null;
        } catch {
          return null;
        }
      })();

    return (
      <TouchableOpacity
        style={styles.amenityCard}
        onPress={() =>
          navigation.navigate('SimpleBooking', {
            amenityId: item._id,
            amenity: item,
          })
        }
      >
        {imageSource ? (
          <Image
            source={{ uri: imageSource }}
            style={styles.amenityImage}
            resizeMode="cover"
            onError={(e) =>
              console.warn('⚠️ Image failed to load:', e.nativeEvent.error)
            }
          />
        ) : (
          // ✅ Fallback placeholder
          <Image
            source={{
              uri: 'https://via.placeholder.com/300x200?text=No+Image',
            }}
            style={styles.amenityImage}
            resizeMode="cover"
          />
        )}

        <View style={styles.amenityCardContent}>
          <View style={styles.amenityInfo}>
            <Text style={styles.amenityName}>{item.name}</Text>
            <Text style={styles.amenityDescription} numberOfLines={2}>
              {item.description}
            </Text>

            <View style={styles.amenityMeta}>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(item.amenityStatus) + '20' },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    { color: getStatusColor(item.amenityStatus) },
                  ]}
                >
                  {item.amenityStatus?.toUpperCase() || 'AVAILABLE'}
                </Text>
              </View>

              {item.amenityType === 'paid' && (
                <View style={styles.priceBadge}>
                  <Text style={styles.priceText}>
                    ₹{item.bookingCharge || 0}
                  </Text>
                </View>
              )}

              {item.amenityType === 'free' && (
                <View style={styles.freeBadge}>
                  <Text style={styles.freeText}>FREE</Text>
                </View>
              )}
            </View>

            <View style={styles.amenityDetails}>
              <Text style={styles.detailText}>
                👥 Capacity: {item.capacity}
              </Text>
              {item.requiresApproval && (
                <Text style={styles.approvalText}>
                  ⚠️ Requires Approval
                </Text>
              )}
            </View>
          </View>

          <Text style={styles.viewDetails}>→</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading && amenities.length === 0) {
    return (
      <Container>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Amenities</Text>
        </View>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.BLACK} />
          <Text style={styles.loadingText}>Loading amenities...</Text>
        </View>
      </Container>
    );
  }

  if (error && amenities.length === 0) {
    return (
      <Container>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Amenities</Text>
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              if (buildingId) {
                dispatch(fetchAmenities(buildingId) as never);
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
        <Text style={styles.headerTitle}>Amenities</Text>
        <Text style={styles.headerSubtitle}>
          {amenities.length}{' '}
          {amenities.length === 1 ? 'amenity' : 'amenities'} available
        </Text>
      </View>

      <TouchableOpacity
        style={styles.myBookingsButton}
        onPress={() => navigation.navigate('MyBookings')}
      >
        <Text style={styles.myBookingsText}>📅 My Bookings</Text>
      </TouchableOpacity>

      {amenities.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No amenities available</Text>
          <Text style={styles.emptySubtext}>Check back later</Text>
        </View>
      ) : (
        <FlatList
          data={amenities}
          renderItem={renderAmenityItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.BLACK]}
            />
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
    fontSize: FS.FS24,
    fontFamily: FF[700],
    color: COLORS.BLACK,
    marginBottom: SPACING.XS,
  },
  headerSubtitle: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
  },
  myBookingsButton: {
    margin: SPACING.LG,
    backgroundColor: COLORS.BLACK,
    paddingVertical: 14,
    paddingHorizontal: SPACING.XL,
    borderRadius: BORDER_RADIUS.MD,
    alignItems: 'center',
  },
  myBookingsText: {
    color: COLORS.WHITE,
    fontSize: FS.FS16,
    fontFamily: FF[600],
  },
  listContainer: {
    padding: SPACING.LG,
  },
  amenityCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.LG,
    marginBottom: SPACING.LG,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  amenityImage: {
    width: '100%',
    height: 180,
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  amenityCardContent: {
    padding: SPACING.LG,
    flexDirection: 'row',
    alignItems: 'center',
  },
  amenityDescription: {
    fontSize: FS.FS13,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    marginBottom: SPACING.SM,
    lineHeight: 18,
  },
  amenityDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.MD,
    marginTop: SPACING.SM,
  },
  detailText: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
  },
  approvalText: {
    fontSize: FS.FS11,
    fontFamily: FF[600],
    color: COLORS.ORANGE_TEXT,
  },
  priceBadge: {
    backgroundColor: COLORS.LIGHT_GREEN,
    paddingHorizontal: SPACING.SM + 2,
    paddingVertical: SPACING.XS,
    borderRadius: BORDER_RADIUS.SM,
    borderWidth: 1,
    borderColor: COLORS.LIGHT_BORDER_GREEN,
  },
  priceText: {
    fontSize: FS.FS13,
    fontFamily: FF[700],
    color: COLORS.GREEN_TEXT,
  },
  freeBadge: {
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    paddingHorizontal: SPACING.SM + 2,
    paddingVertical: SPACING.XS,
    borderRadius: BORDER_RADIUS.SM,
    borderWidth: 1,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
  },
  freeText: {
    fontSize: FS.FS11,
    fontFamily: FF[700],
    color: COLORS.OCEAN_BLUE_TEXT,
  },
  amenityInfo: {
    flex: 1,
  },
  amenityName: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    marginBottom: SPACING.XS,
  },
  amenityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.XS,
  },
  statusBadge: {
    paddingHorizontal: SPACING.SM + 2,
    paddingVertical: SPACING.XS,
    borderRadius: BORDER_RADIUS.SM,
    marginRight: SPACING.SM,
  },
  statusText: {
    fontSize: FS.FS11,
    fontFamily: FF[700],
  },
  viewDetails: {
    fontSize: FS.FS24,
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

export default AmenitiesList;
