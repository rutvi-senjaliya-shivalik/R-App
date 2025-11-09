import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Container, HeaderComponent } from '../../../components/common';
import ParcelLogsStyles from './styles/parcelLogsStyles';
import { COLORS } from '../../../constants';
import { useTranslation } from '../../../context/LanguageContext';

const ParcelLogs = (props: any) => {
  const { t } = useTranslation();
  const isMountedRef = useRef(true);
  const selectedRole = props.route?.params?.selectedRole;
  const [parcelLogs, setParcelLogs] = useState<any[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'collected'>('all');

  useEffect(() => {
    isMountedRef.current = true;
    loadParcelLogs();
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const loadParcelLogs = () => {
    // TODO: Fetch parcel logs from API
    const mockLogs = [
      {
        id: 'par001',
        trackingNumber: 'PKG123456789',
        courierName: 'Amazon',
        description: 'Electronics - Mobile Phone',
        flatNo: 'B-204',
        receivedAt: '2025-11-07T10:30:00',
        collectedAt: '2025-11-07T14:20:00',
        status: 'collected',
        receivedBy: 'Security Guard',
        collectedBy: 'Resident',
      },
      {
        id: 'par002',
        trackingNumber: 'PKG987654321',
        courierName: 'Flipkart',
        description: 'Clothing - T-Shirts',
        flatNo: 'B-204',
        receivedAt: '2025-11-07T15:45:00',
        collectedAt: null,
        status: 'pending',
        receivedBy: 'Security Guard',
        collectedBy: null,
      },
      {
        id: 'par003',
        trackingNumber: 'PKG456789123',
        courierName: 'Swiggy',
        description: 'Food Delivery',
        flatNo: 'B-204',
        receivedAt: '2025-11-06T18:30:00',
        collectedAt: '2025-11-06T19:00:00',
        status: 'collected',
        receivedBy: 'Security Guard',
        collectedBy: 'Resident',
      },
      {
        id: 'par004',
        trackingNumber: 'PKG789123456',
        courierName: 'Zomato',
        description: 'Food Delivery',
        flatNo: 'B-204',
        receivedAt: '2025-11-06T20:15:00',
        collectedAt: '2025-11-06T20:30:00',
        status: 'collected',
        receivedBy: 'Security Guard',
        collectedBy: 'Resident',
      },
      {
        id: 'par005',
        trackingNumber: 'PKG321654987',
        courierName: 'Myntra',
        description: 'Fashion - Shoes',
        flatNo: 'B-204',
        receivedAt: '2025-11-05T11:00:00',
        collectedAt: null,
        status: 'pending',
        receivedBy: 'Security Guard',
        collectedBy: null,
      },
    ];
    setParcelLogs(mockLogs);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return { bg: COLORS.ORANGE_BG, text: COLORS.ORANGE_TEXT, border: COLORS.ORANGE_BORDER };
      case 'collected':
        return { bg: COLORS.LIGHT_GREEN, text: COLORS.GREEN_TEXT, border: COLORS.LIGHT_BORDER_GREEN };
      default:
        return { bg: COLORS.LIGHT_GRAY, text: COLORS.GREY_TEXT, border: COLORS.BORDER_GREY };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '📦';
      case 'collected':
        return '✅';
      default:
        return '⚪';
    }
  };

  const filteredLogs = parcelLogs.filter(log => {
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
      <View style={[ParcelLogsStyles.logCard, { borderColor: statusColor.border }]}>
        <View style={ParcelLogsStyles.logHeader}>
          <View style={ParcelLogsStyles.logHeaderLeft}>
            <Text style={ParcelLogsStyles.courierName}>{item.courierName}</Text>
            <Text style={ParcelLogsStyles.trackingNumber}>
              {t('smartSociety.tracking')}: {item.trackingNumber}
            </Text>
          </View>
          <View
            style={[
              ParcelLogsStyles.statusBadge,
              {
                backgroundColor: statusColor.bg,
                borderColor: statusColor.border,
              },
            ]}
          >
            <Text style={ParcelLogsStyles.statusIcon}>{statusIcon}</Text>
            <Text style={[ParcelLogsStyles.statusText, { color: statusColor.text }]}>
              {item.status === 'pending' 
                ? t('smartSociety.pending')
                : item.status === 'collected'
                ? t('smartSociety.collected')
                : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>

        <View style={ParcelLogsStyles.logDetails}>
          <View style={ParcelLogsStyles.descriptionContainer}>
            <Text style={ParcelLogsStyles.descriptionLabel}>{t('smartSociety.description')}:</Text>
            <Text style={ParcelLogsStyles.descriptionValue}>{item.description}</Text>
          </View>

          <View style={ParcelLogsStyles.detailRow}>
            <Text style={ParcelLogsStyles.detailLabel}>{t('smartSociety.receivedAt')}:</Text>
            <Text style={ParcelLogsStyles.detailValue}>
              {formatDateTime(item.receivedAt)}
            </Text>
          </View>
          <View style={ParcelLogsStyles.detailRow}>
            <Text style={ParcelLogsStyles.detailLabel}>{t('smartSociety.receivedBy')}:</Text>
            <Text style={ParcelLogsStyles.detailValue}>{item.receivedBy}</Text>
          </View>
          {item.collectedAt && (
            <>
              <View style={ParcelLogsStyles.detailRow}>
                <Text style={ParcelLogsStyles.detailLabel}>{t('smartSociety.collectedAt')}:</Text>
                <Text style={ParcelLogsStyles.detailValue}>
                  {formatDateTime(item.collectedAt)}
                </Text>
              </View>
              <View style={ParcelLogsStyles.detailRow}>
                <Text style={ParcelLogsStyles.detailLabel}>{t('smartSociety.collectedBy')}:</Text>
                <Text style={ParcelLogsStyles.detailValue}>{item.collectedBy}</Text>
              </View>
            </>
          )}
          {item.status === 'pending' && (
            <View style={ParcelLogsStyles.pendingIndicator}>
              <Text style={ParcelLogsStyles.pendingText}>
                {t('smartSociety.awaitingCollectionAtSecurityDesk')}
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
        Title={t('smartSociety.parcelLogs')}
        onPress={() => props.navigation?.goBack()}
      />
      <View style={ParcelLogsStyles.container}>
        <View style={ParcelLogsStyles.filterContainer}>
          {(['all', 'pending', 'collected'] as const).map((filterType) => (
            <TouchableOpacity
              key={filterType}
              style={[
                ParcelLogsStyles.filterTab,
                filter === filterType && ParcelLogsStyles.filterTabActive,
              ]}
              onPress={() => setFilter(filterType)}
            >
              <Text
                style={[
                  ParcelLogsStyles.filterTabText,
                  filter === filterType && ParcelLogsStyles.filterTabTextActive,
                ]}
              >
                {filterType === 'all' 
                  ? t('common.all')
                  : filterType === 'pending'
                  ? t('smartSociety.pending')
                  : t('smartSociety.collected')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filteredLogs}
          renderItem={renderLogCard}
          keyExtractor={item => item.id}
          contentContainerStyle={ParcelLogsStyles.logsList}
          ListEmptyComponent={
            <View style={ParcelLogsStyles.emptyState}>
              <Text style={ParcelLogsStyles.emptyStateText}>
                {t('smartSociety.noParcelLogsFound')}
              </Text>
            </View>
          }
        />
      </View>
    </Container>
  );
};

export default ParcelLogs;

