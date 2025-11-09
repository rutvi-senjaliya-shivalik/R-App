import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Container, HeaderComponent, CustomButton } from '../../../../components/common';
import NoticeDetailStyles from './styles/noticeDetailStyles';
import { COLORS } from '../../../../constants';
import { useTranslation } from '../../../../context/LanguageContext';
import { useDispatch, useSelector } from 'react-redux';
import { getNoticeDetailAction } from '../../../../store/actions/smartSociety/getNoticeDetailAction';
import { acknowledgeNoticeAction } from '../../../../store/actions/smartSociety/acknowledgeNoticeAction';

const NoticeDetail = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch() as any;
  const isMountedRef = useRef(true);
  const notice = props.route?.params?.notice;
  const selectedRole = props.route?.params?.selectedRole;
  const noticeId = notice?.id || notice?._id;
  
  const noticeDetailLoading = useSelector((state: any) => state.getNoticeDetail?.loading);
  const noticeDetailData = useSelector((state: any) => state.getNoticeDetail?.data);
  const noticeDetailError = useSelector((state: any) => state.getNoticeDetail?.error);
  
  const acknowledgeLoading = useSelector((state: any) => state.acknowledgeNotice?.loading);
  const acknowledgeData = useSelector((state: any) => state.acknowledgeNotice?.data);
  const acknowledgeError = useSelector((state: any) => state.acknowledgeNotice?.error);

  const [noticeData, setNoticeData] = useState(notice);
  const [isAcknowledged, setIsAcknowledged] = useState(false);

  useEffect(() => {
    isMountedRef.current = true;
    
    // Initialize acknowledgment status from passed notice data
    if (notice) {
      const acknowledged = notice.isAcknowledged || 
                          notice.acknowledged || 
                          notice.userAcknowledged ||
                          (notice.acknowledgments && Array.isArray(notice.acknowledgments) && notice.acknowledgments.length > 0);
      if (acknowledged) {
        setIsAcknowledged(true);
      }
    }
    
    if (noticeId) {
      loadNoticeDetail();
    } else if (notice) {
      setNoticeData(notice);
    }
    
    return () => {
      isMountedRef.current = false;
    };
  }, [noticeId]);

  // Load notice detail from API
  const loadNoticeDetail = async () => {
    if (!noticeId) return;
    try {
      const response = await dispatch(getNoticeDetailAction(noticeId));
      
      // Handle multiple response formats
      const responseData = response?.data || response;
      const noticeInfo = responseData?.result || responseData?.data || responseData;
      
      if (noticeInfo) {
        setNoticeData(noticeInfo);
        
        // Check if notice is already acknowledged from API response
        const acknowledged = noticeInfo.isAcknowledged || 
                           noticeInfo.acknowledged || 
                           noticeInfo.userAcknowledged ||
                           (noticeInfo.acknowledgments && Array.isArray(noticeInfo.acknowledgments) && noticeInfo.acknowledgments.length > 0);
        
        if (acknowledged) {
          setIsAcknowledged(true);
        } else if (!acknowledged && selectedRole?.id === 'resident') {
          // Auto-acknowledge when viewing (only if not already acknowledged)
          // Use the local 'acknowledged' variable instead of state to avoid race condition
          handleAcknowledge();
        }
      }
    } catch (error: any) {
      console.error('Error loading notice detail:', error);
      // Fallback to passed notice data if API fails
      if (notice) {
        setNoticeData(notice);
      }
    }
  };

  // Update notice data when API response changes
  useEffect(() => {
    if (noticeDetailData && isMountedRef.current) {
      // Handle multiple response formats
      const response = noticeDetailData?.data || noticeDetailData;
      const noticeInfo = response?.result || response?.data || response;
      
      if (noticeInfo) {
        setNoticeData(noticeInfo);
        
        // Check if notice is already acknowledged from API response
        const acknowledged = noticeInfo.isAcknowledged || 
                           noticeInfo.acknowledged || 
                           noticeInfo.userAcknowledged ||
                           (noticeInfo.acknowledgments && Array.isArray(noticeInfo.acknowledgments) && noticeInfo.acknowledgments.length > 0);
        
        if (acknowledged) {
          setIsAcknowledged(true);
        }
      }
    }
  }, [noticeDetailData]);

  // Handle notice detail errors
  useEffect(() => {
    if (noticeDetailError && isMountedRef.current) {
      const errorMessage =
        noticeDetailError?.response?.data?.message ||
        noticeDetailError?.response?.data?.error ||
        noticeDetailError?.message ||
        t('smartSociety.failedToLoadNoticeDetails');
      console.error('Notice Detail Error:', errorMessage);
      // Don't show alert if we have fallback notice data
      if (!notice) {
        Alert.alert(t('common.error'), errorMessage);
      }
    }
  }, [noticeDetailError]);

  // Handle acknowledge success
  useEffect(() => {
    if (acknowledgeData && isMountedRef.current) {
      setIsAcknowledged(true);
      
      // Reload notice detail to get updated acknowledgment status
      if (noticeId) {
        setTimeout(() => {
          loadNoticeDetail();
        }, 500); // Small delay to ensure backend has processed the acknowledgment
      }
      
      // Clear the reducer state
      dispatch({ type: 'ACKNOWLEDGE_NOTICE_CLEAR' });
    }
  }, [acknowledgeData]);

  // Handle acknowledge errors
  useEffect(() => {
    if (acknowledgeError && isMountedRef.current) {
      const errorMessage =
        acknowledgeError?.response?.data?.message ||
        acknowledgeError?.response?.data?.error ||
        acknowledgeError?.message ||
        t('smartSociety.failedToAcknowledgeNotice');
      
      console.error('Acknowledge error:', errorMessage);
      
      // Only show alert if it's a manual acknowledgment (not auto-acknowledge)
      // We can check if user clicked the button by checking if acknowledgeLoading was true
      // But since we're in useEffect, we'll show alert for non-403 errors
      if (acknowledgeError?.response?.status !== 403 && 
          acknowledgeError?.response?.status !== 400) {
        // Don't show alert for auto-acknowledge failures (they're expected if already acknowledged)
        // Only show for unexpected errors
        if (!acknowledgeError?.response?.data?.message?.toLowerCase().includes('already')) {
          Alert.alert(t('common.error'), errorMessage);
        }
      }
      
      // Clear the reducer state even on error
      dispatch({ type: 'ACKNOWLEDGE_NOTICE_CLEAR' });
    }
  }, [acknowledgeError]);

  const handleAcknowledge = async () => {
    if (!noticeId || isAcknowledged || acknowledgeLoading) {
      return;
    }

    try {
      await dispatch(acknowledgeNoticeAction(noticeId));
      // Success handling is done in useEffect for acknowledgeData
    } catch (error: any) {
      console.error('Error acknowledging notice:', error);
      // Error handling is done in useEffect for acknowledgeError
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        t('smartSociety.failedToAcknowledgeNotice');
      
      // Only show alert for unexpected errors (not "already acknowledged")
      if (!errorMessage.toLowerCase().includes('already')) {
        Alert.alert(t('common.error'), errorMessage);
      }
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'urgent':
        return { bg: COLORS.ORANGE_BG, text: COLORS.ERROR_COLOR, border: COLORS.ORANGE_BORDER };
      case 'high':
        return { bg: COLORS.YELLOW_BG, text: COLORS.ORANGE_TEXT, border: COLORS.YELLOW_BORDER };
      case 'medium':
        return { bg: COLORS.YELLOW_BG, text: COLORS.ORANGE_TEXT, border: COLORS.YELLOW_BORDER };
      case 'low':
        return { bg: COLORS.OCEAN_BLUE_BG, text: COLORS.OCEAN_BLUE_TEXT, border: COLORS.OCEAN_BLUE_BORDER };
      // Legacy support for old values
      case 'emergency':
        return { bg: COLORS.ORANGE_BG, text: COLORS.ERROR_COLOR, border: COLORS.ORANGE_BORDER };
      case 'important':
        return { bg: COLORS.YELLOW_BG, text: COLORS.ORANGE_TEXT, border: COLORS.YELLOW_BORDER };
      case 'normal':
        return { bg: COLORS.OCEAN_BLUE_BG, text: COLORS.OCEAN_BLUE_TEXT, border: COLORS.OCEAN_BLUE_BORDER };
      default:
        return { bg: COLORS.OCEAN_BLUE_BG, text: COLORS.OCEAN_BLUE_TEXT, border: COLORS.OCEAN_BLUE_BORDER };
    }
  };

  if (noticeDetailLoading && !noticeData) {
    return (
      <Container>
        <HeaderComponent
          Title={t('smartSociety.noticeDetails')}
          onPress={() => props.navigation?.goBack()}
        />
        <View style={NoticeDetailStyles.container}>
          <ActivityIndicator size="large" color={COLORS.OCEAN_BLUE_TEXT} />
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            {t('common.loading')}
          </Text>
        </View>
      </Container>
    );
  }

  if (!noticeData) {
    return (
      <Container>
        <HeaderComponent
          Title={t('smartSociety.noticeDetails')}
          onPress={() => props.navigation?.goBack()}
        />
        <View style={NoticeDetailStyles.container}>
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            {t('smartSociety.noticeNotFound')}
          </Text>
        </View>
      </Container>
    );
  }

  const priorityColor = getPriorityColor(noticeData.priority || 'Medium');

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.noticeDetails')}
        onPress={() => props.navigation?.goBack()}
      />
      <ScrollView
        style={NoticeDetailStyles.container}
        contentContainerStyle={NoticeDetailStyles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshing={noticeDetailLoading}
        onRefresh={noticeId ? loadNoticeDetail : undefined}
      >
        <View style={NoticeDetailStyles.headerCard}>
          <View style={NoticeDetailStyles.headerRow}>
            <Text style={NoticeDetailStyles.categoryBadge}>
              {noticeData.category?.charAt(0).toUpperCase() + noticeData.category?.slice(1) || 'General'}
            </Text>
            <View
              style={[
                NoticeDetailStyles.priorityBadge,
                {
                  backgroundColor: priorityColor.bg,
                  borderColor: priorityColor.border,
                },
              ]}
            >
              <Text style={[NoticeDetailStyles.priorityText, { color: priorityColor.text }]}>
                {noticeData.priority || 'Medium'}
              </Text>
            </View>
          </View>
          <Text style={NoticeDetailStyles.title}>{noticeData.title}</Text>
        </View>

        <View style={NoticeDetailStyles.section}>
          <Text style={NoticeDetailStyles.description}>
            {noticeData.description}
          </Text>
        </View>

        <View style={NoticeDetailStyles.section}>
          {noticeData.targetAudience && noticeData.targetAudience.length > 0 && (
            <View style={NoticeDetailStyles.infoRow}>
              <Text style={NoticeDetailStyles.infoLabel}>{t('smartSociety.targetAudience')}:</Text>
              <Text style={NoticeDetailStyles.infoValue}>
                {Array.isArray(noticeData.targetAudience) 
                  ? noticeData.targetAudience.join(', ') 
                  : noticeData.targetAudience}
              </Text>
            </View>
          )}
          {noticeData.targetUnits && noticeData.targetUnits.length > 0 && (
            <View style={NoticeDetailStyles.infoRow}>
              <Text style={NoticeDetailStyles.infoLabel}>{t('smartSociety.targetUnits')}:</Text>
              <Text style={NoticeDetailStyles.infoValue}>
                {Array.isArray(noticeData.targetUnits) 
                  ? noticeData.targetUnits.join(', ') 
                  : noticeData.targetUnits}
              </Text>
            </View>
          )}
          <View style={NoticeDetailStyles.infoRow}>
            <Text style={NoticeDetailStyles.infoLabel}>{t('smartSociety.date')}:</Text>
            <Text style={NoticeDetailStyles.infoValue}>
              {noticeData.createdAt 
                ? new Date(noticeData.createdAt).toLocaleString()
                : noticeData.createdAt || 'N/A'}
            </Text>
          </View>
          {noticeData.validFrom && (
            <View style={NoticeDetailStyles.infoRow}>
              <Text style={NoticeDetailStyles.infoLabel}>{t('smartSociety.validFrom')}:</Text>
              <Text style={NoticeDetailStyles.infoValue}>
                {new Date(noticeData.validFrom).toLocaleString()}
              </Text>
            </View>
          )}
          {noticeData.validUntil && (
            <View style={NoticeDetailStyles.infoRow}>
              <Text style={NoticeDetailStyles.infoLabel}>{t('smartSociety.validUntil')}:</Text>
              <Text style={NoticeDetailStyles.infoValue}>
                {new Date(noticeData.validUntil).toLocaleString()}
              </Text>
            </View>
          )}
        </View>

        {selectedRole?.id === 'resident' && !isAcknowledged && (
          <View style={NoticeDetailStyles.section}>
            <CustomButton
              title={acknowledgeLoading ? t('common.pleaseWait') : t('smartSociety.acknowledgeNotice')}
              onPress={handleAcknowledge}
              disabled={acknowledgeLoading}
              loading={acknowledgeLoading}
            />
          </View>
        )}

        {isAcknowledged && (
          <View style={NoticeDetailStyles.section}>
            <Text style={[NoticeDetailStyles.infoValue, { color: COLORS.GREEN_TEXT }]}>
              ✓ {t('smartSociety.noticeAcknowledged')}
            </Text>
          </View>
        )}
      </ScrollView>
    </Container>
  );
};

export default NoticeDetail;

