import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '../../components/common';
import { COLORS, FF, FS, SPACING, BORDER_RADIUS } from '../../constants';
import { RootState } from '../../store/reducers';
import { fetchNotices } from '../../store/actions/notices/noticesAction';
import { selectUserDetailData } from '../../store/selectors/auth';

interface CommunityProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

const Community: React.FC<CommunityProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  // Get user data from Redux
  const { userData } = useSelector((state: any) => state.otp);
  const userDetailData = useSelector(selectUserDetailData);
  const user = userDetailData?.data?.result;
  
  // Get unitId and buildingId
  const unitId = userData?.member?.unitId ||
                 user?.unitId ||
                 user?.unit?._id;
  
  const buildingId = userData?.member?.buildingId ||
                     user?.buildingId ||
                     user?.building?._id;

  // Get notices from Redux store
  const { loading, notices, error } = useSelector((state: RootState) => state.notices);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    if (unitId) {
      console.log('📢 Fetching notices for unitId:', unitId);
      dispatch(fetchNotices(unitId) as never);
    } else if (buildingId) {
      console.log('📢 Fetching notices for buildingId:', buildingId);
      dispatch(fetchNotices(undefined, buildingId) as never);
    } else {
      console.warn('⚠️ No unitId or buildingId found - cannot fetch notices');
    }
  }, [dispatch, unitId, buildingId]);

  const onRefresh = () => {
    if (unitId) {
      setRefreshing(true);
      dispatch(fetchNotices(unitId) as never);
      setTimeout(() => setRefreshing(false), 1000);
    } else if (buildingId) {
      setRefreshing(true);
      dispatch(fetchNotices(undefined, buildingId) as never);
      setTimeout(() => setRefreshing(false), 1000);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'urgent':
      case 'high':
        return '#F44336';
      case 'important':
      case 'medium':
        return '#FF9800';
      case 'normal':
      case 'low':
      default:
        return '#4CAF50';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'urgent':
      case 'high':
        return '🔴';
      case 'important':
      case 'medium':
        return '🟡';
      case 'normal':
      case 'low':
      default:
        return '🟢';
    }
  };

  const handleItemPress = (item: any) => {
    navigation.navigate('NoticeDetails', { noticeId: item._id });
  };

  const renderNoticeItem = ({ item }: { item: any }) => {
    const formattedDate = item.publishDate 
      ? new Date(item.publishDate).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      : 'N/A';

    const expiryDate = item.expiryDate
      ? new Date(item.expiryDate).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      : 'No expiry';

    return (
      <TouchableOpacity
        style={styles.communityCard}
        onPress={() => handleItemPress(item)}
      >
        <View style={styles.cardContent}>
          <View style={styles.titleRow}>
            <Text style={styles.priorityIcon}>{getPriorityIcon(item.priority)}</Text>
            <Text style={[styles.cardTitle, styles.titleFlex]}>{item.title}</Text>
          </View>
          <View style={[styles.categoryBadge, { backgroundColor: getPriorityColor(item.priority) }]}>
            <Text style={styles.categoryText}>
              {item.category?.toUpperCase() || 'GENERAL'}
            </Text>
          </View>
          <Text style={styles.cardDescription} numberOfLines={3}>
            {item.description}
          </Text>
          <View style={styles.dateRow}>
            <Text style={styles.dateText}>
              📅 {expiryDate !== 'No expiry' ? `Valid until: ${expiryDate}` : `Published: ${formattedDate}`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Loading state
  if (loading && !refreshing) {
    return (
      <Container style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Notices & Announcements</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.BLUE_TEXT} />
          <Text style={styles.loadingText}>Loading notices...</Text>
        </View>
      </Container>
    );
  }

  // Error state
  if (error && !loading) {
    return (
      <Container style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Notices & Announcements</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }

  // Empty state
  if (!loading && (!notices || notices.length === 0)) {
    return (
      <Container style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Notices & Announcements</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.loadingText}>No notices available</Text>
        </View>
      </Container>
    );
  }

  return (
    <Container style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Notices & Announcements</Text>
      </View>

      <FlatList
        data={notices}
        renderItem={renderNoticeItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  headerContainer: {
    paddingHorizontal: SPACING.XL,
    paddingVertical: SPACING.LG,
  },
  headerTitle: {
    fontSize: FS.FS24,
    fontFamily: FF[600],
    color: COLORS.BLACK,
  },
  listContainer: {
    paddingHorizontal: SPACING.XL,
    paddingBottom: SPACING.XL,
  },
  communityCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.MD,
    marginVertical: SPACING.SM,
    padding: SPACING.LG,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    marginBottom: SPACING.XS,
  },
  cardSubtitle: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    marginBottom: SPACING.SM,
  },
  cardDescription: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: 20,
  },
  readMoreText: {
    color: COLORS.BLACK,
    fontFamily: FF[600],
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.XS,
  },
  priorityIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  titleFlex: {
    flex: 1,
  },
  categoryBadge: {
    paddingHorizontal: SPACING.SM,
    paddingVertical: SPACING.XS,
    borderRadius: BORDER_RADIUS.SM,
    alignSelf: 'flex-start',
    marginBottom: SPACING.SM,
  },
  categoryText: {
    color: COLORS.WHITE,
    fontSize: 11,
    fontFamily: FF[600],
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.MD,
  },
  dateText: {
    fontSize: 12,
    color: COLORS.GREY_TEXT,
  },
  loadingContainer: {
    padding: SPACING.XL,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: SPACING.MD,
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
  },
  errorContainer: {
    padding: SPACING.XL,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.ERROR_COLOR,
    textAlign: 'center',
    marginBottom: SPACING.LG,
  },
  retryButton: {
    backgroundColor: COLORS.BLACK,
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.XL,
    borderRadius: BORDER_RADIUS.SM,
  },
  retryButtonText: {
    color: COLORS.WHITE,
    fontSize: FS.FS14,
    fontFamily: FF[500],
  },
});

export default Community;
