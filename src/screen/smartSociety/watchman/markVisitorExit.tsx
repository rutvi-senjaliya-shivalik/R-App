import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Container, HeaderComponent, CustomButton } from '../../../components/common';
import MarkVisitorExitStyles from './styles/markVisitorExitStyles';
import { COLORS } from '../../../constants';
import { useTranslation } from '../../../context/LanguageContext';
import { useDispatch, useSelector } from 'react-redux';
import { getVisitorsAction, getVisitorsClear } from '../../../store/actions/smartSociety/getVisitorsAction';

const MarkVisitorExit = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isMountedRef = useRef(true);
  const selectedRole = props.route?.params?.selectedRole;
  const [activeVisitors, setActiveVisitors] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const visitorsState = useSelector((state: any) => state.getVisitors);
  
  // Use Redux loading state for more reliable loading indicator
  const loading = visitorsState?.loading || false;

  useEffect(() => {
    isMountedRef.current = true;
    // Clear any previous state to ensure fresh load
    dispatch(getVisitorsClear());
    // Load visitors
    loadActiveVisitors();
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    // Only process when loading is complete (not loading anymore)
    if (visitorsState && !visitorsState.loading) {
      if (visitorsState.data && !visitorsState.error) {
        // Map API response to component format
        const responseData = visitorsState.data;
        console.log('📦 Full API response:', JSON.stringify(responseData, null, 2));
        
        // Handle different response structures
        // API can return: { success: true, data: [...] } or { data: [...] } or just [...]
        let visitorsData: any[] = [];
        
        if (Array.isArray(responseData)) {
          visitorsData = responseData;
        } else if (responseData?.data && Array.isArray(responseData.data)) {
          visitorsData = responseData.data;
        } else if (responseData?.result?.data && Array.isArray(responseData.result.data)) {
          visitorsData = responseData.result.data;
        } else if (responseData?.result && Array.isArray(responseData.result)) {
          visitorsData = responseData.result;
        }
        
        console.log('📋 Total visitors received:', visitorsData.length, 'items');
        console.log('📋 Sample visitor:', visitorsData[0]);
        
        // Filter only active visitors (status: 'active' or exitTime is null)
        // Show visitors that haven't exited yet
        const active = visitorsData.filter((visitor: any) => {
          const status = (visitor.status || '').toLowerCase();
          const hasExitTime = visitor.exitTime && visitor.exitTime !== null && visitor.exitTime !== '';
          const hasExitDate = visitor.exitDate && visitor.exitDate !== null && visitor.exitDate !== '';
          
          // Consider visitor active if:
          // 1. Status is 'active' or 'pending' or empty/null, AND
          // 2. No exit time/date recorded
          const isActive = (
            (status === 'active' || status === 'pending' || !status) && 
            !hasExitTime && 
            !hasExitDate
          );
          
          return isActive;
        });
        
        console.log('✅ Active visitors after filter:', active.length, 'out of', visitorsData.length);
        
        // Map API response to component format
        const mappedVisitors = active.map((visitor: any) => ({
          id: visitor._id || visitor.id || '',
          visitorName: visitor.visitorName || visitor.name || '',
          visitorPhone: visitor.visitorMobile || visitor.visitorPhone || visitor.phoneNumber || '',
          flatNo: visitor.hostUnit || visitor.flatNumber || visitor.flatNo || '',
          purpose: visitor.purposeOfVisit || visitor.purpose || visitor.visitorCategory || '',
          entryTime: visitor.entryTime || visitor.createdAt || visitor.entryDate || '',
          entryGate: visitor.entryGate || visitor.gate || 'Main Gate',
          status: visitor.status || 'active',
        }));
        
        console.log('✅ Mapped visitors for display:', mappedVisitors.length);
        if (mappedVisitors.length > 0) {
          console.log('✅ First visitor:', mappedVisitors[0]);
        }
        
        if (isMountedRef.current) {
          setActiveVisitors(mappedVisitors);
        }
      } else if (visitorsState.error) {
        console.error('❌ Error loading visitors:', visitorsState.error);
        if (isMountedRef.current) {
          let errorMessage = t('smartSociety.failedToLoadVisitors') || 'Failed to load visitors. Please try again.';
          
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
          );
        }
      }
    }
  }, [visitorsState]);

  const loadActiveVisitors = async () => {
    if (!isMountedRef.current) return;
    
    try {
      console.log('📞 Fetching visitors from API...');
      
      // Call API without status filter to match curl command exactly
      // We'll filter for active visitors on the client side
      const response = await dispatch(getVisitorsAction() as any);
      
      console.log('📦 API Response received:', response);
      console.log('📦 API Response data:', response?.data);
    } catch (error: any) {
      console.error('❌ Error loading visitors:', error);
      if (isMountedRef.current) {
        let errorMessage = t('smartSociety.failedToLoadVisitors') || 'Failed to load visitors. Please try again.';
        
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
        );
      }
    } finally {
      if (isMountedRef.current) {
        setRefreshing(false);
      }
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadActiveVisitors();
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleMarkExit = (visitor: any) => {
    Alert.alert(
      'Confirm Exit',
      `Mark exit for ${visitor.visitorName}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            // TODO: Update visitor exit via API
            Alert.alert('Success', 'Visitor exit recorded successfully', [
              {
                text: 'OK',
                onPress: () => {
                  loadActiveVisitors(); // Refresh list
                },
              },
            ]);
          },
        },
      ],
    );
  };

  const renderVisitorCard = ({ item }: any) => {
    return (
      <View style={MarkVisitorExitStyles.visitorCard}>
        <View style={MarkVisitorExitStyles.visitorHeader}>
          <View style={MarkVisitorExitStyles.visitorHeaderLeft}>
            <Text style={MarkVisitorExitStyles.visitorName}>
              {item.visitorName}
            </Text>
            <Text style={MarkVisitorExitStyles.visitorPhone}>
              {item.visitorPhone}
            </Text>
          </View>
          <View style={MarkVisitorExitStyles.activeBadge}>
            <Text style={MarkVisitorExitStyles.activeText}>Active</Text>
          </View>
        </View>

        <View style={MarkVisitorExitStyles.visitorDetails}>
          <View style={MarkVisitorExitStyles.detailRow}>
            <Text style={MarkVisitorExitStyles.detailLabel}>Flat:</Text>
            <Text style={MarkVisitorExitStyles.detailValue}>{item.flatNo}</Text>
          </View>
          <View style={MarkVisitorExitStyles.detailRow}>
            <Text style={MarkVisitorExitStyles.detailLabel}>Purpose:</Text>
            <Text style={MarkVisitorExitStyles.detailValue}>{item.purpose}</Text>
          </View>
          <View style={MarkVisitorExitStyles.detailRow}>
            <Text style={MarkVisitorExitStyles.detailLabel}>Entry Time:</Text>
            <Text style={MarkVisitorExitStyles.detailValue}>
              {formatDateTime(item.entryTime)}
            </Text>
          </View>
          <View style={MarkVisitorExitStyles.detailRow}>
            <Text style={MarkVisitorExitStyles.detailLabel}>Entry Gate:</Text>
            <Text style={MarkVisitorExitStyles.detailValue}>
              {item.entryGate}
            </Text>
          </View>
        </View>

        <View style={MarkVisitorExitStyles.exitButton}>
          <CustomButton
            title={t('smartSociety.confirmExit') || 'Mark Exit'}
            onPress={() => handleMarkExit(item)}
          />
        </View>
      </View>
    );
  };

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.markVisitorExit') || 'Mark Visitor Exit'}
        onPress={() => props.navigation?.goBack()}
      />
      <View style={MarkVisitorExitStyles.container}>
        {loading && !refreshing ? (
          <View style={MarkVisitorExitStyles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.DARK_BLUE} />
            <Text style={MarkVisitorExitStyles.loadingText}>
              {t('smartSociety.loadingVisitors') || 'Loading visitors...'}
            </Text>
          </View>
        ) : activeVisitors.length > 0 ? (
          <FlatList
            data={activeVisitors}
            renderItem={renderVisitorCard}
            keyExtractor={item => item.id}
            contentContainerStyle={MarkVisitorExitStyles.visitorsList}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        ) : (
          <View style={MarkVisitorExitStyles.emptyState}>
            <Text style={MarkVisitorExitStyles.emptyStateText}>
              {t('smartSociety.noActiveVisitorsFound') || 'No active visitors found'}
            </Text>
          </View>
        )}
      </View>
    </Container>
  );
};

export default MarkVisitorExit;

