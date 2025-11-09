import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/common/container';
import { RootState } from '../../store/reducers';
import { fetchBills } from '../../store/actions/maintenance/maintenanceAction';
import { selectUserDetailData } from '../../store/selectors/auth';

interface BillsListProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

const BillsList: React.FC<BillsListProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const userDetailData = useSelector(selectUserDetailData);
  const user = userDetailData?.data?.result;
  const unitId = user?.unitId || user?.unit?._id;

  const { loading, bills, error } = useSelector(
    (state: RootState) => state.maintenance,
  );

  const [refreshing, setRefreshing] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    if (unitId) {
      dispatch(fetchBills(unitId) as never);
    }
  }, [dispatch, unitId]);

  const onRefresh = () => {
    setRefreshing(true);
    if (unitId) {
      dispatch(fetchBills(unitId) as never);
    }
    setTimeout(() => setRefreshing(false), 1000);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatAmount = (amount: number): string => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'paid':
        return '#15803D'; // COLORS.GREEN_TEXT
      case 'pending':
        return '#FF5900'; // COLORS.ORANGE_TEXT
      case 'overdue':
        return '#B3261E'; // COLORS.ERROR_COLOR
      default:
        return '#757575'; // COLORS.GREY_TEXT
    }
  };

  const getStatusIcon = (status: string): string => {
    switch (status) {
      case 'paid':
        return '✓';
      case 'pending':
        return '⏰';
      case 'overdue':
        return '⚠️';
      default:
        return '📄';
    }
  };

  const isOverdue = (dueDate: string, status: string): boolean => {
    if (status === 'paid') return false;
    return new Date(dueDate) < new Date();
  };

  const filteredBills = bills?.filter((bill: any) => {
    if (filterStatus === 'all') return true;
    const billStatus = isOverdue(bill.dueDate, bill.paymentStatus)
      ? 'overdue'
      : bill.paymentStatus;
    return billStatus === filterStatus;
  });

  const renderBillItem = ({ item }: { item: any }) => {
    const status = isOverdue(item.dueDate, item.paymentStatus)
      ? 'overdue'
      : item.paymentStatus;

    return (
      <TouchableOpacity
        style={styles.billCard}
        onPress={() =>
          navigation.navigate('BillDetails', {
            billId: item._id,
          })
        }>
        <View style={styles.billHeader}>
          <View style={styles.billInfo}>
            <Text style={styles.billPeriod}>{item.billingPeriod}</Text>
            <Text style={styles.billDate}>
              Due: {formatDate(item.dueDate)}
            </Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(status) },
            ]}>
            <Text style={styles.statusIcon}>{getStatusIcon(status)}</Text>
            <Text style={styles.statusText}>{status.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.billDetails}>
          <View style={styles.amountSection}>
            <Text style={styles.amountLabel}>Total Amount</Text>
            <Text style={styles.amount}>{formatAmount(item.totalAmount)}</Text>
          </View>

          {item.paymentStatus === 'paid' && item.paidOn && (
            <View style={styles.paidInfo}>
              <Text style={styles.paidText}>
                Paid on {formatDate(item.paidOn)}
              </Text>
            </View>
          )}

          {status === 'overdue' && (
            <View style={styles.overdueWarning}>
              <Text style={styles.overdueText}>
                ⚠️ This bill is overdue. Please pay immediately.
              </Text>
            </View>
          )}
        </View>

        <View style={styles.billFooter}>
          <Text style={styles.viewDetailsText}>Tap to view details →</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFilterButton = (status: string, label: string) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        filterStatus === status && styles.filterButtonActive,
      ]}
      onPress={() => setFilterStatus(status)}>
      <Text
        style={[
          styles.filterButtonText,
          filterStatus === status && styles.filterButtonTextActive,
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  if (loading && (!bills || bills.length === 0)) {
    return (
      <Container>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#000000" />
          <Text style={styles.loadingText}>Loading bills...</Text>
        </View>
      </Container>
    );
  }

  if (error && (!bills || bills.length === 0)) {
    return (
      <Container>
        <View style={styles.centerContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              if (unitId) {
                dispatch(fetchBills(unitId) as never);
              }
            }}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <View style={styles.container}>
        {/* Filter Section */}
        <View style={styles.filterSection}>
          {renderFilterButton('all', 'All')}
          {renderFilterButton('pending', 'Pending')}
          {renderFilterButton('paid', 'Paid')}
          {renderFilterButton('overdue', 'Overdue')}
        </View>

        <FlatList
          data={filteredBills}
          renderItem={renderBillItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#000000']}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📄</Text>
              <Text style={styles.emptyText}>No Bills Found</Text>
              <Text style={styles.emptySubtext}>
                {filterStatus !== 'all'
                  ? `No ${filterStatus} bills available`
                  : 'No bills available yet'}
              </Text>
            </View>
          }
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  filterSection: {
    flexDirection: 'row',
    padding: 20,
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9E3',
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D9D9E3',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#757575',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#757575',
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#B3261E',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#000000',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
  },
  billCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#D9D9E3',
  },
  billHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  billInfo: {
    flex: 1,
  },
  billPeriod: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  billDate: {
    fontSize: 13,
    color: '#757575',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
    borderWidth: 1,
  },
  statusIcon: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  billDetails: {
    borderTopWidth: 1,
    borderTopColor: '#D9D9E3',
    paddingTop: 12,
  },
  amountSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  amountLabel: {
    fontSize: 14,
    color: '#757575',
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  paidInfo: {
    backgroundColor: '#F0FDF4CC',
    padding: 8,
    borderRadius: 8,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#BBF7D080',
  },
  paidText: {
    fontSize: 12,
    color: '#15803D',
    textAlign: 'center',
  },
  overdueWarning: {
    backgroundColor: '#FDECEA',
    padding: 8,
    borderRadius: 8,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#F1AEA9',
  },
  overdueText: {
    fontSize: 12,
    color: '#B3261E',
    textAlign: 'center',
  },
  billFooter: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#D9D9E3',
  },
  viewDetailsText: {
    fontSize: 13,
    color: '#000000',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default BillsList;
