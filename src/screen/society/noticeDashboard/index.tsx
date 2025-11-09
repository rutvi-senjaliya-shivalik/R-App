/**
 * NoticeDashboard Screen Component
 * 
 * Displays a list of society notices/announcements.
 * Features:
 * - Animated card entries with fade-in effect
 * - Optional images for notices
 * - Pull-to-refresh functionality
 * - API integration with GET /api/v1/notices
 */
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Animated,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Container, HeaderComponent } from '../../../components/common';
import { noticeDashboardStyles } from './styles';
import { COLORS } from '../../../constants';
import { MakeApiRequest } from '../../../services/apiService';
import { GET_NOTICES_LIST } from '../../../services/httpService';
import { GET } from '../../../constants/api';

type Notice = {
  id: string;
  text: string;
  image?: string | null;
  status: string;
  date: string;
  societyId?: string;
};

type ApiNotice = {
  _id: string;
  societyId: string;
  text: string;
  image?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};


/**
 * AnimatedNoticeCard Component
 * Individual notice card with fade-in animation
 */
const AnimatedNoticeCard = ({ item, index }: { item: Notice; index: number }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Staggered animation for each card
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateY, index]);

  /**
   * Format date to readable format
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
  };

  /**
   * Get status badge color based on status
   */
  const getStatusBadgeStyle = () => {
    switch (item.status?.toLowerCase()) {
      case 'active':
        return {
          badge: noticeDashboardStyles.priorityBadgeLow,
          text: noticeDashboardStyles.priorityTextLow,
        };
      case 'urgent':
        return {
          badge: noticeDashboardStyles.priorityBadgeHigh,
          text: noticeDashboardStyles.priorityTextHigh,
        };
      default:
        return {
          badge: noticeDashboardStyles.priorityBadgeMedium,
          text: noticeDashboardStyles.priorityTextMedium,
        };
    }
  };

  const statusStyle = getStatusBadgeStyle();

  return (
    <Animated.View
      style={[
        noticeDashboardStyles.noticeCard,
        {
          opacity: fadeAnim,
          transform: [{ translateY }],
        },
      ]}
    >
      {/* Notice Header */}
      <View style={noticeDashboardStyles.noticeHeader}>
        <View style={noticeDashboardStyles.noticeHeaderLeft}>
          <Text style={noticeDashboardStyles.noticeDate}>
            {formatDate(item.date)}
          </Text>
        </View>
        {item.status && (
          <View style={[noticeDashboardStyles.priorityBadge, statusStyle.badge]}>
            <Text style={[noticeDashboardStyles.priorityText, statusStyle.text]}>
              {item.status.toUpperCase()}
            </Text>
          </View>
        )}
      </View>

      {/* Notice Content */}
      <View style={noticeDashboardStyles.noticeContent}>
        <Text style={noticeDashboardStyles.noticeDescription}>
          {item.text}
        </Text>
        {item.image && (
          <Image
            source={{ uri: item.image }}
            style={noticeDashboardStyles.noticeImage}
            resizeMode="cover"
          />
        )}
      </View>
    </Animated.View>
  );
};

/**
 * NoticeDashboard Main Component
 */
const NoticeDashboard = ({ navigation }: any) => {
  // State management
  const [notices, setNotices] = useState<Notice[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  /**
   * Maps API notice to UI notice format
   */
  const mapApiNoticeToNotice = useCallback((apiNotice: ApiNotice): Notice => {
    return {
      id: apiNotice._id,
      text: apiNotice.text,
      image: apiNotice.image || null,
      status: apiNotice.status,
      date: apiNotice.createdAt,
      societyId: apiNotice.societyId,
    };
  }, []);

  /**
   * Fetches notices from API
   */
  const fetchNotices = useCallback(async () => {
    try {
      console.log('Fetching notices...');
      
      const response = await MakeApiRequest({
        apiUrl: GET_NOTICES_LIST,
        apiMethod: GET,
      });

      console.log('Notices response:', response);

      if (response?.status === 200) {
        const noticesData = response.data?.result?.notices || [];
        const count = response.data?.result?.totalCount || 0;
        
        const mappedNotices = noticesData.map(mapApiNoticeToNotice);
        
        setNotices(mappedNotices);
        setTotalCount(count);
        
        console.log(`Loaded ${mappedNotices.length} notices`);
      } else {
        console.log('Failed to fetch notices:', response);
        Alert.alert('Error', 'Failed to load notices. Please try again.');
      }
    } catch (error: any) {
      console.log('Error fetching notices:', error);
      
      // Don't show error on initial load if user is not authenticated
      if (error?.response?.status !== 401) {
        Alert.alert(
          'Error',
          error?.response?.data?.message || 'Failed to load notices. Please try again.'
        );
      }
    }
  }, [mapApiNoticeToNotice]);

  /**
   * Fetch notices on component mount
   */
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      await fetchNotices();
      setLoading(false);
    };

    loadInitialData();
  }, [fetchNotices]);

  /**
   * Get last updated timestamp
   */
  const lastUpdated = useMemo(() => {
    if (notices.length === 0) return '';
    const latestDate = new Date(
      Math.max(...notices.map((n) => new Date(n.date).getTime()))
    );
    return latestDate.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }, [notices]);

  /**
   * Handles pull-to-refresh
   */
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchNotices();
    setRefreshing(false);
  }, [fetchNotices]);

  /**
   * Renders individual notice item
   */
  const renderNotice = useCallback(
    ({ item, index }: { item: Notice; index: number }) => {
      return <AnimatedNoticeCard item={item} index={index} />;
    },
    []
  );

  /**
   * Renders empty state
   */
  const renderEmptyState = useCallback(() => {
    return (
      <View style={noticeDashboardStyles.emptyStateContainer}>
        <Text style={noticeDashboardStyles.emptyStateIcon}>📋</Text>
        <Text style={noticeDashboardStyles.emptyStateTitle}>
          No Notices Available
        </Text>
        <Text style={noticeDashboardStyles.emptyStateMessage}>
          There are no notices to display at the moment. Check back later for updates.
        </Text>
      </View>
    );
  }, []);

  /**
   * Key extractor for FlatList
   */
  const keyExtractor = useCallback((item: Notice) => item.id, []);

  /**
   * Renders loading state
   */
  if (loading) {
    return (
      <Container>
        <View style={noticeDashboardStyles.container}>
          <HeaderComponent
            Title="Notice Dashboard"
            onPress={() => navigation.goBack()}
          />
          <View style={noticeDashboardStyles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.BLUE_TEXT} />
            <Text style={noticeDashboardStyles.loadingText}>Loading notices...</Text>
          </View>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <View style={noticeDashboardStyles.container}>
        <HeaderComponent
          Title="Notice Dashboard"
          onPress={() => navigation.goBack()}
        />

        {/* Header Info Section */}
        <View style={noticeDashboardStyles.headerSection}>
          <View style={noticeDashboardStyles.headerInfo}>
            <Text style={noticeDashboardStyles.noticeCount}>
              {totalCount > 0 ? totalCount : notices.length} {totalCount === 1 || notices.length === 1 ? 'Notice' : 'Notices'}
            </Text>
          </View>
          {lastUpdated && (
            <Text style={noticeDashboardStyles.lastUpdated}>
              Last updated: {lastUpdated}
            </Text>
          )}
        </View>

        {/* Notices List */}
        <FlatList
          data={notices}
          renderItem={renderNotice}
          keyExtractor={keyExtractor}
          contentContainerStyle={[
            noticeDashboardStyles.listContent,
            notices.length === 0 && noticeDashboardStyles.emptyListContent,
          ]}
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={COLORS.BLUE_TEXT}
              colors={[COLORS.BLUE_TEXT]}
            />
          }
        />
      </View>
    </Container>
  );
};

export default NoticeDashboard;

