import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/common/container';
import { RootState } from '../../store/reducers';
import { fetchNotices } from '../../store/actions/notices/noticesAction';
import { selectUserDetailData } from '../../store/selectors/auth';
import { COLORS, FF, FS, LH, SPACING, BORDER_RADIUS } from '../../constants';

interface NoticesListProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

const NoticesList: React.FC<NoticesListProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  // Get user data from Redux
  const { userData } = useSelector((state: any) => state.otp);
  const userDetailData = useSelector(selectUserDetailData);
  const user = userDetailData?.data?.result;
  
  // Priority: userData.member (from registration) > userDetail API response
  const unitId = userData?.member?.unitId ||
                 user?.unitId ||
                 user?.unit?._id;
  
  // Get buildingId as fallback
  const buildingId = userData?.member?.buildingId ||
                     user?.buildingId ||
                     user?.building?._id;

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

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'urgent':
        return COLORS.ERROR_COLOR;
      case 'important':
        return COLORS.ORANGE_TEXT;
      default:
        return COLORS.GREEN_TEXT;
    }
  };

  const getPriorityBadgeStyle = (priority: string) => {
    return {
      ...styles.priorityBadge,
      backgroundColor: getPriorityColor(priority) + '20',
    };
  };

  const getPriorityTextStyle = (priority: string) => {
    return {
      ...styles.priorityText,
      color: getPriorityColor(priority),
    };
  };

  const renderNoticeItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.noticeCard, { borderLeftColor: getPriorityColor(item.priority) }]}
      onPress={() => navigation.navigate('NoticeDetails', { noticeId: item._id })}
    >
      <View style={styles.noticeHeader}>
        <View style={getPriorityBadgeStyle(item.priority)}>
          <Text style={getPriorityTextStyle(item.priority)}>
            {item.priority.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.noticeDate}>
          {new Date(item.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </Text>
      </View>

      <Text style={styles.noticeTitle}>{item.title}</Text>

      {item.description && (
        <Text style={styles.noticeDescription} numberOfLines={2}>
          {item.description}
        </Text>
      )}

      <View style={styles.noticeFooter}>
        <Text style={styles.noticeAuthor}>
          Posted by: {item.postedBy?.name || 'Management'}
        </Text>
        <Text style={styles.viewDetails}>View Details →</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading && notices.length === 0) {
    return (
      <Container>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Notices & Announcements</Text>
        </View>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.BLACK} />
          <Text style={styles.loadingText}>Loading notices...</Text>
        </View>
      </Container>
    );
  }

  if (error && notices.length === 0) {
    return (
      <Container>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Notices & Announcements</Text>
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => unitId && dispatch(fetchNotices(unitId) as never)}
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
        <Text style={styles.headerTitle}>Notices & Announcements</Text>
        <Text style={styles.headerSubtitle}>
          {notices.length} {notices.length === 1 ? 'notice' : 'notices'}
        </Text>
      </View>

      {notices.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No notices available</Text>
          <Text style={styles.emptySubtext}>Check back later for new announcements</Text>
        </View>
      ) : (
        <FlatList
          data={notices}
          renderItem={renderNoticeItem}
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
    fontSize: FS.FS24,
    fontFamily: FF[700],
    color: COLORS.BLACK,
    marginBottom: SPACING.XS,
    lineHeight: LH.LH30,
  },
  headerSubtitle: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH20,
  },
  listContainer: {
    padding: SPACING.LG,
  },
  noticeCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.LG,
    marginBottom: SPACING.LG,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  noticeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.MD,
  },
  priorityBadge: {
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.XS,
    borderRadius: BORDER_RADIUS.MD,
  },
  priorityText: {
    fontSize: FS.FS11,
    fontFamily: FF[700],
    textTransform: 'uppercase',
  },
  noticeDate: {
    fontSize: FS.FS13,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH18,
  },
  noticeTitle: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    marginBottom: SPACING.SM,
    lineHeight: LH.LH24,
  },
  noticeDescription: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH20,
    marginBottom: SPACING.MD,
  },
  noticeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.SM,
    paddingTop: SPACING.MD,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER_GREY,
  },
  noticeAuthor: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH16,
  },
  viewDetails: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    lineHeight: LH.LH20,
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
    lineHeight: LH.LH22,
  },
  errorText: {
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.ERROR_COLOR,
    textAlign: 'center',
    marginBottom: SPACING.XL,
    lineHeight: LH.LH22,
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
    lineHeight: LH.LH22,
  },
  emptyText: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.GREY_TEXT,
    marginBottom: SPACING.SM,
    lineHeight: LH.LH24,
  },
  emptySubtext: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH20,
  },
});

export default NoticesList;
