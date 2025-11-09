import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Container, HeaderComponent } from '../../../components/common';
import VisitorLogsStyles from './styles/visitorLogsStyles';
import { COLORS } from '../../../constants';
import { useTranslation } from '../../../context/LanguageContext';
import { useDispatch, useSelector } from 'react-redux';
import { getVisitorsAction, getVisitorsClear } from '../../../store/actions/smartSociety/getVisitorsAction';

const VisitorLogs = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isMountedRef = useRef(true);
  const selectedRole = props.route?.params?.selectedRole;
  const [visitorLogs, setVisitorLogs] = useState<any[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [refreshing, setRefreshing] = useState(false);

  const visitorsState = useSelector((state: any) => state.getVisitors);
  const loading = visitorsState?.loading || false;

  useEffect(() => {
    isMountedRef.current = true;
    dispatch(getVisitorsClear());
    loadVisitorLogs();
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    // Process API response when data is available
    if (visitorsState && !visitorsState.loading) {
      if (visitorsState.data && !visitorsState.error) {
        const responseData = visitorsState.data;
        console.log('📦 Full API response:', JSON.stringify(responseData, null, 2));
        
        // Handle different response structures
        // API response structure: { data: { success: true, message: '...', data: [...], meta: {...} } }
        let visitorsData: any[] = [];
        
        if (Array.isArray(responseData)) {
          visitorsData = responseData;
        } else if (responseData?.data?.data && Array.isArray(responseData.data.data)) {
          // Handle nested data structure: response.data.data
          visitorsData = responseData.data.data;
        } else if (responseData?.data && Array.isArray(responseData.data)) {
          visitorsData = responseData.data;
        } else if (responseData?.result?.data && Array.isArray(responseData.result.data)) {
          visitorsData = responseData.result.data;
        } else if (responseData?.result && Array.isArray(responseData.result)) {
          visitorsData = responseData.result;
        }
        
        console.log('📋 Total visitors received:', visitorsData.length, 'items');
        
        // Map API response to component format
        const mappedLogs = visitorsData.map((visitor: any) => {
          // Determine status based on exit time/date and visitorStatus
          const hasExitTime = visitor.exitTime && visitor.exitTime !== null && visitor.exitTime !== '';
          const hasExitDate = visitor.exitDate && visitor.exitDate !== null && visitor.exitDate !== '';
          const status = (visitor.status || '').toLowerCase();
          const visitorStatus = (visitor.visitorStatus || '').toLowerCase();
          
          let logStatus = 'completed';
          // If no exit time/date, consider it active
          if (!hasExitTime && !hasExitDate) {
            logStatus = 'active';
          } else if (hasExitTime || hasExitDate) {
            logStatus = 'completed';
          } else if (status === 'active' || status === 'pending' || visitorStatus === 'pending approval') {
            logStatus = 'active';
          } else {
            logStatus = 'completed';
          }
          
          // Format phone number
          let phoneNumber = visitor.visitorMobile || visitor.visitorPhone || visitor.phoneNumber || '';
          if (phoneNumber && !phoneNumber.startsWith('+')) {
            // Add country code if not present
            phoneNumber = `+91 ${phoneNumber}`;
          }
          
          return {
            id: visitor._id || visitor.id || '',
            visitorName: visitor.visitorName || visitor.name || '',
            visitorPhone: phoneNumber,
            purpose: visitor.purposeOfVisit || visitor.purpose || visitor.visitorCategory || '',
            flatNo: visitor.hostUnit || visitor.flatNumber || visitor.flatNo || '',
            entryTime: visitor.entryTime || visitor.createdAt || visitor.entryDate || '',
            exitTime: visitor.exitTime || visitor.exitDate || null,
            status: logStatus,
            entryGate: visitor.entryGate || visitor.gate || 'Main Gate',
            approvedBy: visitor.approvedBy || visitor.hostName || visitor.createdBy || 'Resident',
            visitorStatus: visitor.visitorStatus || visitor.status || '',
            vehicleNumber: visitor.vehicleDetails?.vehicleNumber || '',
            numberOfVisitors: visitor.numberOfVisitors || 1,
          };
        });
        
        console.log('✅ Mapped visitor logs:', mappedLogs.length);
        if (mappedLogs.length > 0) {
          console.log('✅ Sample mapped log:', mappedLogs[0]);
        }
        
        if (isMountedRef.current) {
          setVisitorLogs(mappedLogs);
          setRefreshing(false);
        }
      } else if (visitorsState.error) {
        console.error('❌ Error loading visitor logs:', visitorsState.error);
        if (isMountedRef.current) {
          setRefreshing(false);
          let errorMessage = t('smartSociety.failedToLoadVisitors') || 'Failed to load visitor logs. Please try again.';
          
          if (visitorsState.error?.isNetworkError) {
            errorMessage = t('smartSociety.networkError') || 'Network error. Please check your internet connection.';
          } else if (visitorsState.error?.response?.data?.message) {
            errorMessage = visitorsState.error.response.data.message;
          } else if (visitorsState.error?.message) {
            errorMessage = visitorsState.error.message;
          }
          
          Alert.alert(
            t('common.error') || 'Error',
            errorMessage,
            [{ text: t('common.ok') || 'OK' }]
          );
        }
      }
    }
  }, [visitorsState]);

  const loadVisitorLogs = async () => {
    if (!isMountedRef.current) return;
    
    try {
      console.log('📞 Fetching visitor logs from API...');
      
      const response = await dispatch(getVisitorsAction() as any);
      
      console.log('📦 API Response received:', response);
      console.log('📦 API Response data:', response?.data);
    } catch (error: any) {
      console.error('❌ Error loading visitor logs:', error);
      if (isMountedRef.current) {
        setRefreshing(false);
        let errorMessage = t('smartSociety.failedToLoadVisitors') || 'Failed to load visitor logs. Please try again.';
        
        if (error?.isNetworkError) {
          errorMessage = t('smartSociety.networkError') || 'Network error. Please check your internet connection.';
        } else if (error?.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error?.message) {
          errorMessage = error.message;
        }
        
        Alert.alert(
          t('common.error') || 'Error',
          errorMessage,
          [{ text: t('common.ok') || 'OK' }]
        );
      }
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadVisitorLogs();
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return { bg: COLORS.YELLOW_BG, text: COLORS.ORANGE_TEXT, border: COLORS.YELLOW_BORDER };
      case 'completed':
        return { bg: COLORS.LIGHT_GREEN, text: COLORS.GREEN_TEXT, border: COLORS.LIGHT_BORDER_GREEN };
      default:
        return { bg: COLORS.LIGHT_GRAY, text: COLORS.GREY_TEXT, border: COLORS.BORDER_GREY };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return '🟡';
      case 'completed':
        return '✅';
      default:
        return '⚪';
    }
  };

  const filteredLogs = visitorLogs.filter(log => {
    if (filter === 'all') return true;
    return log.status === filter;
  });

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return t('common.na');
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderLogCard = ({ item }: any) => {
    const statusColor = getStatusColor(item.status);
    const statusIcon = getStatusIcon(item.status);

    return (
      <View style={[VisitorLogsStyles.logCard, { borderColor: statusColor.border }]}>
        <View style={VisitorLogsStyles.logHeader}>
          <View style={VisitorLogsStyles.logHeaderLeft}>
            <Text style={VisitorLogsStyles.visitorName}>{item.visitorName}</Text>
            <Text style={VisitorLogsStyles.visitorPhone}>{item.visitorPhone}</Text>
          </View>
          <View
            style={[
              VisitorLogsStyles.statusBadge,
              {
                backgroundColor: statusColor.bg,
                borderColor: statusColor.border,
              },
            ]}
          >
            <Text style={VisitorLogsStyles.statusIcon}>{statusIcon}</Text>
            <Text style={[VisitorLogsStyles.statusText, { color: statusColor.text }]}>
              {item.status === 'active' 
                ? t('smartSociety.active')
                : item.status === 'completed'
                ? t('smartSociety.completed')
                : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>

        <View style={VisitorLogsStyles.logDetails}>
          <View style={VisitorLogsStyles.detailRow}>
            <Text style={VisitorLogsStyles.detailLabel}>{t('smartSociety.purpose')}:</Text>
            <Text style={VisitorLogsStyles.detailValue}>{item.purpose}</Text>
          </View>
          {item.flatNo && (
            <View style={VisitorLogsStyles.detailRow}>
              <Text style={VisitorLogsStyles.detailLabel}>{t('smartSociety.flatNumber') || 'Flat'}:</Text>
              <Text style={VisitorLogsStyles.detailValue}>{item.flatNo}</Text>
            </View>
          )}
          <View style={VisitorLogsStyles.detailRow}>
            <Text style={VisitorLogsStyles.detailLabel}>{t('smartSociety.entryGate')}:</Text>
            <Text style={VisitorLogsStyles.detailValue}>{item.entryGate}</Text>
          </View>
          <View style={VisitorLogsStyles.detailRow}>
            <Text style={VisitorLogsStyles.detailLabel}>{t('smartSociety.entryTime')}:</Text>
            <Text style={VisitorLogsStyles.detailValue}>
              {formatDateTime(item.entryTime)}
            </Text>
          </View>
          {item.exitTime && (
            <View style={VisitorLogsStyles.detailRow}>
              <Text style={VisitorLogsStyles.detailLabel}>{t('smartSociety.exitTime')}:</Text>
              <Text style={VisitorLogsStyles.detailValue}>
                {formatDateTime(item.exitTime)}
              </Text>
            </View>
          )}
          {item.vehicleNumber && (
            <View style={VisitorLogsStyles.detailRow}>
              <Text style={VisitorLogsStyles.detailLabel}>{t('smartSociety.vehicleNumber') || 'Vehicle'}:</Text>
              <Text style={VisitorLogsStyles.detailValue}>{item.vehicleNumber}</Text>
            </View>
          )}
          {item.status === 'active' && (
            <View style={VisitorLogsStyles.activeIndicator}>
              <Text style={VisitorLogsStyles.activeText}>
                {t('smartSociety.currentlyInPremises')}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.visitorLogs')}
        onPress={() => props.navigation?.goBack()}
      />
      <View style={VisitorLogsStyles.container}>
        <View style={VisitorLogsStyles.filterContainer}>
          {(['all', 'active', 'completed'] as const).map((filterType) => (
            <TouchableOpacity
              key={filterType}
              style={[
                VisitorLogsStyles.filterTab,
                filter === filterType && VisitorLogsStyles.filterTabActive,
              ]}
              onPress={() => setFilter(filterType)}
            >
              <Text
                style={[
                  VisitorLogsStyles.filterTabText,
                  filter === filterType && VisitorLogsStyles.filterTabTextActive,
                ]}
              >
                {filterType === 'all' 
                  ? t('common.all')
                  : filterType === 'active'
                  ? t('smartSociety.active')
                  : t('smartSociety.completed')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {loading && !refreshing ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <ActivityIndicator size="large" color={COLORS.DARK_BLUE} />
            <Text style={{ marginTop: 10, color: COLORS.GREY_TEXT }}>
              {t('smartSociety.loadingVisitors') || 'Loading visitor logs...'}
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredLogs}
            renderItem={renderLogCard}
            keyExtractor={item => item.id}
            contentContainerStyle={VisitorLogsStyles.logsList}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
              <View style={VisitorLogsStyles.emptyState}>
                <Text style={VisitorLogsStyles.emptyStateText}>
                  {loading
                    ? t('smartSociety.loadingVisitors') || 'Loading visitor logs...'
                    : t('smartSociety.noVisitorLogsFound') || 'No visitor logs found'}
                </Text>
              </View>
            }
          />
        )}
      </View>
    </Container>
  );
};

export default VisitorLogs;

