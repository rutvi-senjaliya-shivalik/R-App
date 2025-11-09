import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Container, HeaderComponent } from '../../../../components/common';
import NoticesListStyles from './styles/noticesListStyles';
import { COLORS } from '../../../../constants';
import { useTranslation } from '../../../../context/LanguageContext';
import { useDispatch, useSelector } from 'react-redux';
import { getNoticesListAction } from '../../../../store/actions/smartSociety/getNoticesListAction';

const NoticesList = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch() as any;
  const isMountedRef = useRef(true);
  const selectedRole = props.route?.params?.selectedRole;
  const [filter, setFilter] = useState<
    'all' | 'general' | 'maintenance' | 'security' | 'event'
  >('all');

  const noticesListLoading = useSelector(
    (state: any) => state.getNoticesList?.loading,
  );
  const noticesListData = useSelector(
    (state: any) => state.getNoticesList?.data,
  );
  const noticesListError = useSelector(
    (state: any) => state.getNoticesList?.error,
  );
  const [hasShownPermissionError, setHasShownPermissionError] = useState(false);

  const loadNotices = useCallback(async () => {
    try {
      const category =
        filter === 'all'
          ? undefined
          : filter.charAt(0).toUpperCase() + filter.slice(1);
      await dispatch(
        getNoticesListAction({
          page: 1,
          limit: 50,
          category,
          status: 'Published',
        }),
      );
    } catch (error: any) {
      console.error('Error loading notices:', error);

      // Error is already handled by reducer, but we can log it here for debugging
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        t('smartSociety.failedToLoadNotices') ||
        'Failed to load notices';
      console.error('Notices List Error:', errorMessage);

      // Handle 403 Forbidden error - user doesn't have permission
      if (
        error?.response?.status === 403 ||
        error?.status === 403 ||
        error?.isPermissionError
      ) {
        // Only show alert once, not on every filter change or retry
        if (isMountedRef.current && !hasShownPermissionError) {
          setHasShownPermissionError(true);
          Alert.alert(
            t('common.error') ||
              t('smartSociety.permissionDenied') ||
              'Permission Denied',
            errorMessage,
            [{ text: t('common.ok') || 'OK' }],
          );
        }
      }
    }
  }, [filter, dispatch, t, hasShownPermissionError]);

  useEffect(() => {
    isMountedRef.current = true;
    loadNotices();
    return () => {
      isMountedRef.current = false;
    };
  }, [loadNotices]);

  // Reload notices when filter changes
  useEffect(() => {
    if (isMountedRef.current) {
      loadNotices();
    }
  }, [filter, loadNotices]);

  // Extract notices from API response - handle multiple response formats
  const notices = (() => {
    if (!noticesListData) return [];

    const response = noticesListData?.data || noticesListData;

    // Format 1: Direct array
    if (Array.isArray(response)) {
      return response;
    }

    // Format 2: data.notices array
    if (response?.notices && Array.isArray(response.notices)) {
      return response.notices;
    }

    // Format 3: data.result array
    if (response?.result && Array.isArray(response.result)) {
      return response.result;
    }

    // Format 4: data.data array
    if (response?.data && Array.isArray(response.data)) {
      return response.data;
    }

    // Format 5: data.result.notices array
    if (response?.result?.notices && Array.isArray(response.result.notices)) {
      return response.result.notices;
    }

    // Format 6: data.result.data array
    if (response?.result?.data && Array.isArray(response.result.data)) {
      return response.result.data;
    }

    console.warn('⚠️ Unexpected notices list response format:', response);
    return [];
  })();

  const getPriorityColor = (priority?: string) => {
    if (!priority) {
      return {
        bg: COLORS.OCEAN_BLUE_BG,
        text: COLORS.OCEAN_BLUE_TEXT,
        border: COLORS.OCEAN_BLUE_BORDER,
      };
    }

    switch (priority.toLowerCase()) {
      case 'urgent':
        return {
          bg: COLORS.ORANGE_BG,
          text: COLORS.ERROR_COLOR,
          border: COLORS.ORANGE_BORDER,
        };
      case 'high':
        return {
          bg: COLORS.YELLOW_BG,
          text: COLORS.ORANGE_TEXT,
          border: COLORS.YELLOW_BORDER,
        };
      case 'medium':
        return {
          bg: COLORS.YELLOW_BG,
          text: COLORS.ORANGE_TEXT,
          border: COLORS.YELLOW_BORDER,
        };
      case 'low':
        return {
          bg: COLORS.OCEAN_BLUE_BG,
          text: COLORS.OCEAN_BLUE_TEXT,
          border: COLORS.OCEAN_BLUE_BORDER,
        };
      // Legacy support for old values
      case 'emergency':
        return {
          bg: COLORS.ORANGE_BG,
          text: COLORS.ERROR_COLOR,
          border: COLORS.ORANGE_BORDER,
        };
      case 'important':
        return {
          bg: COLORS.YELLOW_BG,
          text: COLORS.ORANGE_TEXT,
          border: COLORS.YELLOW_BORDER,
        };
      case 'normal':
        return {
          bg: COLORS.OCEAN_BLUE_BG,
          text: COLORS.OCEAN_BLUE_TEXT,
          border: COLORS.OCEAN_BLUE_BORDER,
        };
      default:
        return {
          bg: COLORS.OCEAN_BLUE_BG,
          text: COLORS.OCEAN_BLUE_TEXT,
          border: COLORS.OCEAN_BLUE_BORDER,
        };
    }
  };

  const filteredNotices = Array.isArray(notices)
    ? notices.filter(notice => {
        if (!notice) return false;
        if (filter === 'all') return true;
        const noticeCategory = notice.category?.toLowerCase() || '';
        return noticeCategory === filter.toLowerCase();
      })
    : [];

  const handleNoticePress = (notice: any) => {
    props.navigation?.navigate('NoticeDetail', { notice, selectedRole });
  };

  const handleAddNotice = () => {
    props.navigation?.navigate('AddNotice', { selectedRole });
  };

  const renderNoticeCard = ({ item }: any) => {
    if (!item) return null;

    const priorityColor = getPriorityColor(item.priority);
    const category = item.category || 'General';
    const priority = item.priority || 'Medium';
    const title = item.title || '';
    const description = item.description || '';
    const createdAt =
      item.createdAt || item.created_at || new Date().toISOString();
    const isRead =
      item.isRead ||
      item.is_read ||
      item.acknowledged ||
      item.isAcknowledged ||
      false;

    // Translate category
    const getCategoryLabel = (cat: string) => {
      const categoryMap: Record<string, string> = {
        General: t('smartSociety.general') || 'General',
        Maintenance: t('smartSociety.maintenance') || 'Maintenance',
        Security: t('smartSociety.security') || 'Security',
        Event: t('smartSociety.event') || 'Event',
      };
      return categoryMap[cat] || cat.charAt(0).toUpperCase() + cat.slice(1);
    };

    // Translate priority
    const getPriorityLabel = (pri: string) => {
      const priorityMap: Record<string, string> = {
        Low: t('smartSociety.low') || 'Low',
        Medium: t('smartSociety.medium') || 'Medium',
        High: t('smartSociety.high') || 'High',
        Urgent: t('smartSociety.urgent') || 'Urgent',
        Normal: t('smartSociety.normal') || 'Normal',
        Important: t('smartSociety.important') || 'Important',
        Emergency: t('smartSociety.emergency') || 'Emergency',
      };
      return priorityMap[pri] || pri;
    };

    return (
      <TouchableOpacity
        style={[
          NoticesListStyles.noticeCard,
          !isRead && NoticesListStyles.unreadCard,
        ]}
        activeOpacity={0.7}
        onPress={() => handleNoticePress(item)}
      >
        <View style={NoticesListStyles.noticeHeader}>
          <View style={NoticesListStyles.noticeHeaderLeft}>
            <Text style={NoticesListStyles.categoryBadge}>
              {getCategoryLabel(category)}
            </Text>
            <View
              style={[
                NoticesListStyles.priorityBadge,
                {
                  backgroundColor: priorityColor.bg,
                  borderColor: priorityColor.border,
                },
              ]}
            >
              <Text
                style={[
                  NoticesListStyles.priorityText,
                  { color: priorityColor.text },
                ]}
              >
                {getPriorityLabel(priority)}
              </Text>
            </View>
          </View>
          {!isRead && <View style={NoticesListStyles.unreadDot} />}
        </View>
        <Text style={NoticesListStyles.title}>{title}</Text>
        <Text style={NoticesListStyles.description} numberOfLines={2}>
          {description}
        </Text>
        <Text style={NoticesListStyles.dateText}>
          {new Date(createdAt).toLocaleDateString()}
        </Text>
      </TouchableOpacity>
    );
  };

  const isAdmin = selectedRole?.id === 'admin';

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.noticesAndAnnouncements')}
        onPress={() => props.navigation?.goBack()}
      />
      <View style={NoticesListStyles.container}>
        <View style={NoticesListStyles.filterContainer}>
          {(
            ['all', 'general', 'maintenance', 'security', 'event'] as const
          ).map(filterType => (
            <TouchableOpacity
              key={filterType}
              style={[
                NoticesListStyles.filterTab,
                filter === filterType && NoticesListStyles.filterTabActive,
              ]}
              onPress={() => setFilter(filterType)}
            >
              <Text
                style={[
                  NoticesListStyles.filterTabText,
                  filter === filterType &&
                    NoticesListStyles.filterTabTextActive,
                ]}
              >
                {filterType === 'all'
                  ? t('common.all')
                  : filterType === 'general'
                  ? t('smartSociety.general')
                  : filterType === 'maintenance'
                  ? t('smartSociety.maintenance')
                  : filterType === 'security'
                  ? t('smartSociety.security')
                  : t('smartSociety.event')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {noticesListLoading && (!notices || notices.length === 0) ? (
          <View style={NoticesListStyles.emptyState}>
            <ActivityIndicator size="large" color={COLORS.OCEAN_BLUE_TEXT} />
            <Text style={NoticesListStyles.emptyStateText}>
              {t('common.loading')}
            </Text>
          </View>
        ) : noticesListError &&
          (noticesListError?.response?.status === 403 ||
            noticesListError?.status === 403 ||
            noticesListError?.isPermissionError) ? (
          <View style={NoticesListStyles.emptyState}>
            <Text
              style={[
                NoticesListStyles.emptyStateText,
                { color: COLORS.ERROR_COLOR, textAlign: 'center' },
              ]}
            >
              {t('common.error') ||
                t('smartSociety.permissionDenied') ||
                'Permission Denied'}
            </Text>
            <Text
              style={[
                NoticesListStyles.emptyStateText,
                { marginTop: 8, fontSize: 14 },
              ]}
            >
              {noticesListError?.response?.data?.message ||
                noticesListError?.response?.data?.error ||
                noticesListError?.message ||
                t('smartSociety.noPermissionToAccessNotices') ||
                'You do not have permission to access notices. Please contact your administrator.'}
            </Text>
          </View>
        ) : (
          <FlatList
            data={Array.isArray(filteredNotices) ? filteredNotices : []}
            renderItem={renderNoticeCard}
            keyExtractor={item =>
              item?.id || item?._id || Math.random().toString()
            }
            contentContainerStyle={NoticesListStyles.noticesList}
            refreshing={noticesListLoading}
            onRefresh={loadNotices}
            ListEmptyComponent={
              <View style={NoticesListStyles.emptyState}>
                <Text style={NoticesListStyles.emptyStateText}>
                  {t('smartSociety.noNoticesFound')}
                </Text>
              </View>
            }
          />
        )}

        {isAdmin && (
          <TouchableOpacity
            style={NoticesListStyles.fab}
            activeOpacity={0.8}
            onPress={handleAddNotice}
          >
            <Text style={NoticesListStyles.fabText}>+</Text>
          </TouchableOpacity>
        )}
      </View>
    </Container>
  );
};

export default NoticesList;
