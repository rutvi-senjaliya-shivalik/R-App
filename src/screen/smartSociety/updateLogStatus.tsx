import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { Container, HeaderComponent, SearchInput, CustomButton } from '../../components/common';
import { UpdateLogStatusStyles } from './styles';
import { COLORS, FF, FS, LH } from '../../constants';
import { useTranslation } from '../../context/LanguageContext';

const UpdateLogStatus = (props: any) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'visitor' | 'delivery'>('visitor');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLog, setSelectedLog] = useState<any>(null);

  // Mock data - In real app, this would come from API
  const [visitorLogs, setVisitorLogs] = useState([
    {
      id: 'v1',
      type: 'visitor',
      visitorName: 'John Doe',
      phoneNumber: '9876543210',
      flatNumber: 'A-101',
      entryTime: '10:00 AM',
      exitTime: null,
      purpose: 'Delivery',
      status: 'active', // active, completed, cancelled
      vehicleNumber: 'MH-12-AB-1234',
      date: '2024-01-15',
    },
    {
      id: 'v2',
      type: 'visitor',
      visitorName: 'Jane Smith',
      phoneNumber: '9876543211',
      flatNumber: 'B-205',
      entryTime: '11:30 AM',
      exitTime: '2:00 PM',
      purpose: 'Meeting',
      status: 'completed',
      vehicleNumber: '',
      date: '2024-01-15',
    },
    {
      id: 'v3',
      type: 'visitor',
      visitorName: 'Robert Johnson',
      phoneNumber: '9876543212',
      flatNumber: 'C-301',
      entryTime: '9:15 AM',
      exitTime: null,
      purpose: 'Service',
      status: 'active',
      vehicleNumber: 'MH-12-CD-5678',
      date: '2024-01-15',
    },
  ]);

  const [deliveryLogs, setDeliveryLogs] = useState([
    {
      id: 'd1',
      type: 'delivery',
      recipientName: 'Emily Davis',
      phoneNumber: '9876543213',
      flatNumber: 'A-102',
      deliveryTime: '2:00 PM',
      courierName: 'Amazon',
      trackingNumber: 'AMZ123456789',
      status: 'pending', // pending, delivered, collected, cancelled
      date: '2024-01-15',
      notes: 'Fragile - Handle with care',
    },
    {
      id: 'd2',
      type: 'delivery',
      recipientName: 'Michael Brown',
      phoneNumber: '9876543214',
      flatNumber: 'B-206',
      deliveryTime: '10:30 AM',
      courierName: 'Flipkart',
      trackingNumber: 'FLP987654321',
      status: 'delivered',
      date: '2024-01-15',
      notes: '',
    },
    {
      id: 'd3',
      type: 'delivery',
      recipientName: 'Sarah Wilson',
      phoneNumber: '9876543215',
      flatNumber: 'C-302',
      deliveryTime: '3:45 PM',
      courierName: 'FedEx',
      trackingNumber: 'FED456789012',
      status: 'pending',
      date: '2024-01-15',
      notes: 'Requires signature',
    },
  ]);

  const [filteredLogs, setFilteredLogs] = useState(
    activeTab === 'visitor' ? visitorLogs : deliveryLogs
  );

  useEffect(() => {
    const logs = activeTab === 'visitor' ? visitorLogs : deliveryLogs;
    if (searchQuery.trim() === '') {
      setFilteredLogs(logs);
    } else {
      const filtered = logs.filter((log) => {
        const query = searchQuery.toLowerCase();
        if (activeTab === 'visitor') {
          return (
            log.visitorName.toLowerCase().includes(query) ||
            log.phoneNumber.includes(query) ||
            log.flatNumber.toLowerCase().includes(query) ||
            log.purpose.toLowerCase().includes(query)
          );
        } else {
          return (
            log.recipientName.toLowerCase().includes(query) ||
            log.phoneNumber.includes(query) ||
            log.flatNumber.toLowerCase().includes(query) ||
            log.courierName.toLowerCase().includes(query) ||
            log.trackingNumber.toLowerCase().includes(query)
          );
        }
      });
      setFilteredLogs(filtered);
    }
  }, [searchQuery, activeTab, visitorLogs, deliveryLogs]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'pending':
        return COLORS.ORANGE_TEXT;
      case 'completed':
      case 'delivered':
        return COLORS.GREEN_TEXT;
      case 'cancelled':
        return COLORS.ERROR_COLOR;
      default:
        return COLORS.GREY_TEXT;
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'active':
      case 'pending':
        return COLORS.ORANGE_BG;
      case 'completed':
      case 'delivered':
        return COLORS.LIGHT_GREEN;
      case 'cancelled':
        return '#B3261E1A'; // Light red with opacity
      default:
        return COLORS.LIGHT_GRAY;
    }
  };

  const handleStatusUpdate = (log: any, newStatus: string) => {
    Alert.alert(
      t('smartSociety.updateStatus'),
      t('smartSociety.confirmUpdateStatus', { status: newStatus }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.update'),
          onPress: () => {
            if (activeTab === 'visitor') {
              setVisitorLogs((prev) =>
                prev.map((item) =>
                  item.id === log.id ? { ...item, status: newStatus } : item
                )
              );
            } else {
              setDeliveryLogs((prev) =>
                prev.map((item) =>
                  item.id === log.id ? { ...item, status: newStatus } : item
                )
              );
            }
            setSelectedLog(null);
            Alert.alert(t('common.success'), t('smartSociety.logStatusUpdatedSuccessfully'));
          },
        },
      ]
    );
  };

  const getAvailableStatuses = (currentStatus: string, type: string) => {
    if (type === 'visitor') {
      switch (currentStatus) {
        case 'active':
          return ['completed', 'cancelled'];
        case 'completed':
        case 'cancelled':
          return [];
        default:
          return [];
      }
    } else {
      switch (currentStatus) {
        case 'pending':
          return ['delivered', 'collected', 'cancelled'];
        case 'delivered':
          return ['collected', 'cancelled'];
        case 'collected':
        case 'cancelled':
          return [];
        default:
          return [];
      }
    }
  };

  const renderVisitorLogItem = ({ item }: any) => {
    const statusColor = getStatusColor(item.status);
    const statusBg = getStatusBg(item.status);
    const availableStatuses = getAvailableStatuses(item.status, 'visitor');

    return (
      <TouchableOpacity
        style={UpdateLogStatusStyles.logCard}
        onPress={() => setSelectedLog(item)}
        activeOpacity={0.7}
      >
        <View style={UpdateLogStatusStyles.logCardHeader}>
          <View style={UpdateLogStatusStyles.logCardHeaderLeft}>
            <Text style={UpdateLogStatusStyles.logTitle}>{item.visitorName}</Text>
            <View style={[UpdateLogStatusStyles.statusBadge, { backgroundColor: statusBg }]}>
              <Text style={[UpdateLogStatusStyles.statusText, { color: statusColor }]}>
                {item.status.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
        <View style={UpdateLogStatusStyles.logCardContent}>
          <View style={UpdateLogStatusStyles.logDetailRow}>
            <Text style={UpdateLogStatusStyles.logDetailLabel}>{t('smartSociety.flat')}:</Text>
            <Text style={UpdateLogStatusStyles.logDetailValue}>{item.flatNumber}</Text>
          </View>
          <View style={UpdateLogStatusStyles.logDetailRow}>
            <Text style={UpdateLogStatusStyles.logDetailLabel}>{t('smartSociety.phone')}:</Text>
            <Text style={UpdateLogStatusStyles.logDetailValue}>{item.phoneNumber}</Text>
          </View>
          <View style={UpdateLogStatusStyles.logDetailRow}>
            <Text style={UpdateLogStatusStyles.logDetailLabel}>{t('smartSociety.purpose')}:</Text>
            <Text style={UpdateLogStatusStyles.logDetailValue}>{item.purpose}</Text>
          </View>
          <View style={UpdateLogStatusStyles.logDetailRow}>
            <Text style={UpdateLogStatusStyles.logDetailLabel}>{t('smartSociety.entryTime')}:</Text>
            <Text style={UpdateLogStatusStyles.logDetailValue}>{item.entryTime}</Text>
          </View>
          {item.exitTime && (
            <View style={UpdateLogStatusStyles.logDetailRow}>
              <Text style={UpdateLogStatusStyles.logDetailLabel}>{t('smartSociety.exitTime')}:</Text>
              <Text style={UpdateLogStatusStyles.logDetailValue}>{item.exitTime}</Text>
            </View>
          )}
          {item.vehicleNumber && (
            <View style={UpdateLogStatusStyles.logDetailRow}>
              <Text style={UpdateLogStatusStyles.logDetailLabel}>{t('smartSociety.vehicle')}:</Text>
              <Text style={UpdateLogStatusStyles.logDetailValue}>{item.vehicleNumber}</Text>
            </View>
          )}
        </View>
        {availableStatuses.length > 0 && (
          <View style={UpdateLogStatusStyles.statusButtonsContainer}>
            {availableStatuses.map((status, index) => (
              <TouchableOpacity
                key={status}
                style={[
                  UpdateLogStatusStyles.statusButton,
                  { borderColor: statusColor },
                  index > 0 && { marginLeft: 8 },
                ]}
                onPress={() => handleStatusUpdate(item, status)}
              >
                <Text style={[UpdateLogStatusStyles.statusButtonText, { color: statusColor }]}>
                  {t('smartSociety.markAs')} {status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderDeliveryLogItem = ({ item }: any) => {
    const statusColor = getStatusColor(item.status);
    const statusBg = getStatusBg(item.status);
    const availableStatuses = getAvailableStatuses(item.status, 'delivery');

    return (
      <TouchableOpacity
        style={UpdateLogStatusStyles.logCard}
        onPress={() => setSelectedLog(item)}
        activeOpacity={0.7}
      >
        <View style={UpdateLogStatusStyles.logCardHeader}>
          <View style={UpdateLogStatusStyles.logCardHeaderLeft}>
            <Text style={UpdateLogStatusStyles.logTitle}>{item.recipientName}</Text>
            <View style={[UpdateLogStatusStyles.statusBadge, { backgroundColor: statusBg }]}>
              <Text style={[UpdateLogStatusStyles.statusText, { color: statusColor }]}>
                {item.status.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
        <View style={UpdateLogStatusStyles.logCardContent}>
          <View style={UpdateLogStatusStyles.logDetailRow}>
            <Text style={UpdateLogStatusStyles.logDetailLabel}>{t('smartSociety.flat')}:</Text>
            <Text style={UpdateLogStatusStyles.logDetailValue}>{item.flatNumber}</Text>
          </View>
          <View style={UpdateLogStatusStyles.logDetailRow}>
            <Text style={UpdateLogStatusStyles.logDetailLabel}>{t('smartSociety.phone')}:</Text>
            <Text style={UpdateLogStatusStyles.logDetailValue}>{item.phoneNumber}</Text>
          </View>
          <View style={UpdateLogStatusStyles.logDetailRow}>
            <Text style={UpdateLogStatusStyles.logDetailLabel}>{t('smartSociety.courier')}:</Text>
            <Text style={UpdateLogStatusStyles.logDetailValue}>{item.courierName}</Text>
          </View>
          <View style={UpdateLogStatusStyles.logDetailRow}>
            <Text style={UpdateLogStatusStyles.logDetailLabel}>{t('smartSociety.tracking')}:</Text>
            <Text style={UpdateLogStatusStyles.logDetailValue}>{item.trackingNumber}</Text>
          </View>
          <View style={UpdateLogStatusStyles.logDetailRow}>
            <Text style={UpdateLogStatusStyles.logDetailLabel}>{t('smartSociety.deliveryTime')}:</Text>
            <Text style={UpdateLogStatusStyles.logDetailValue}>{item.deliveryTime}</Text>
          </View>
          {item.notes && (
            <View style={UpdateLogStatusStyles.logDetailRow}>
              <Text style={UpdateLogStatusStyles.logDetailLabel}>{t('smartSociety.notes')}:</Text>
              <Text style={UpdateLogStatusStyles.logDetailValue}>{item.notes}</Text>
            </View>
          )}
        </View>
        {availableStatuses.length > 0 && (
          <View style={UpdateLogStatusStyles.statusButtonsContainer}>
            {availableStatuses.map((status, index) => (
              <TouchableOpacity
                key={status}
                style={[
                  UpdateLogStatusStyles.statusButton,
                  { borderColor: statusColor },
                  index > 0 && { marginLeft: 8 },
                ]}
                onPress={() => handleStatusUpdate(item, status)}
              >
                <Text style={[UpdateLogStatusStyles.statusButtonText, { color: statusColor }]}>
                  {t('smartSociety.markAs')} {status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.updateLogStatus')}
        onPress={() => props.navigation?.goBack()}
      />
      <View style={UpdateLogStatusStyles.container}>
        {/* Tab Selector */}
        <View style={UpdateLogStatusStyles.tabContainer}>
          <TouchableOpacity
            style={[
              UpdateLogStatusStyles.tab,
              activeTab === 'visitor' && UpdateLogStatusStyles.tabActive,
            ]}
            onPress={() => {
              setActiveTab('visitor');
              setSearchQuery('');
              setSelectedLog(null);
            }}
            activeOpacity={0.7}
          >
            <Text
              style={[
                UpdateLogStatusStyles.tabText,
                activeTab === 'visitor' && UpdateLogStatusStyles.tabTextActive,
              ]}
            >
              {t('smartSociety.visitorLogs')} ({visitorLogs.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              UpdateLogStatusStyles.tab,
              activeTab === 'delivery' && UpdateLogStatusStyles.tabActive,
            ]}
            onPress={() => {
              setActiveTab('delivery');
              setSearchQuery('');
              setSelectedLog(null);
            }}
            activeOpacity={0.7}
          >
            <Text
              style={[
                UpdateLogStatusStyles.tabText,
                activeTab === 'delivery' && UpdateLogStatusStyles.tabTextActive,
              ]}
            >
              {t('smartSociety.deliveryLogs')} ({deliveryLogs.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Section */}
        <View style={UpdateLogStatusStyles.searchSection}>
          <SearchInput
            placeholder={activeTab === 'visitor' ? t('smartSociety.searchVisitorLogs') : t('smartSociety.searchDeliveryLogs')}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Logs List */}
        <View style={UpdateLogStatusStyles.listSection}>
          <Text style={UpdateLogStatusStyles.sectionTitle}>
            {activeTab === 'visitor' ? t('smartSociety.visitor') : t('smartSociety.delivery')} {t('smartSociety.logs')} ({filteredLogs.length})
          </Text>
          {filteredLogs.length > 0 ? (
            <FlatList
              data={filteredLogs}
              renderItem={
                activeTab === 'visitor' ? renderVisitorLogItem : renderDeliveryLogItem
              }
              keyExtractor={(item) => item.id}
              contentContainerStyle={UpdateLogStatusStyles.listContent}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={UpdateLogStatusStyles.emptyState}>
              <Text style={UpdateLogStatusStyles.emptyStateText}>
                {searchQuery ? t('smartSociety.noLogsFound') : t('smartSociety.noLogsAvailable', { type: activeTab })}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Container>
  );
};

export default UpdateLogStatus;

