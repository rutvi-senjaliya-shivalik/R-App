import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  Container,
  HeaderComponent,
  CustomButton,
} from '../../../components/common';
import MyBillsStyles from './styles/myBillsStyles';
import { COLORS } from '../../../constants';
import { useTranslation } from '../../../context/LanguageContext';

const MyBills = (props: any) => {
  const { t, language } = useTranslation();
  const isMountedRef = useRef(true);
  const [bills, setBills] = useState<any[]>([]);
  const [filter, setFilter] = useState<'all' | 'paid' | 'unpaid' | 'overdue'>(
    'all',
  );

  // Map language codes to locale codes for date formatting
  const locale = useMemo(() => {
    const localeMap: Record<string, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      gu: 'gu-IN',
    };
    return localeMap[language] || 'en-IN';
  }, [language]);

  // Format date based on current language
  const formatDate = useCallback(
    (dateString: string) => {
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString(locale, {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
      } catch (error) {
        return dateString;
      }
    },
    [locale],
  );

  // Format period (month and year) based on current language
  const formatPeriod = useCallback(
    (periodString: string) => {
      try {
        // Try to parse period string like "October 2025" or "2025-10"
        // If it's already in a readable format, return as is
        // Otherwise, try to parse and format it
        if (periodString.includes('-')) {
          // Format: "2025-10" or "2025-10-01"
          const parts = periodString.split('-');
          const year = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
          const date = new Date(year, month, 1);
          return date.toLocaleDateString(locale, {
            month: 'long',
            year: 'numeric',
          });
        }
        // If it's already formatted like "October 2025", return as is
        // The API should ideally return locale-aware strings, but for now we return as is
        return periodString;
      } catch (error) {
        return periodString;
      }
    },
    [locale],
  );

  useEffect(() => {
    isMountedRef.current = true;
    // TODO: Fetch bills from API
    // Mock data for now
    const mockBills = [
      {
        id: 'bill001',
        flatNo: 'A-101',
        period: 'October 2025',
        total: 2800,
        dueDate: '2025-10-10',
        status: 'unpaid',
        charges: {
          maintenance: 2000,
          water: 300,
          parking: 500,
        },
      },
      {
        id: 'bill002',
        flatNo: 'A-101',
        period: 'September 2025',
        total: 2800,
        dueDate: '2025-09-10',
        status: 'paid',
        paymentDate: '2025-09-08',
        charges: {
          maintenance: 2000,
          water: 300,
          parking: 500,
        },
      },
    ];
    setBills(mockBills);
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const filteredBills = bills.filter(bill => {
    if (filter === 'all') return true;
    if (filter === 'paid') return bill.status === 'paid';
    if (filter === 'unpaid') return bill.status === 'unpaid';
    if (filter === 'overdue') {
      const today = new Date();
      const dueDate = new Date(bill.dueDate);
      return bill.status === 'unpaid' && dueDate < today;
    }
    return true;
  });

  const handlePayBill = (bill: any) => {
    if (!isMountedRef.current) return;
    props.navigation?.navigate('PaymentScreen', { bill });
  };

  const handleViewReceipt = (bill: any) => {
    if (!isMountedRef.current) return;
    props.navigation?.navigate('ReceiptScreen', { bill });
  };

  const getStatusColor = (status: string, dueDate: string) => {
    if (status === 'paid') return COLORS.GREEN_TEXT;
    const today = new Date();
    const due = new Date(dueDate);
    if (due < today) return COLORS.ERROR_COLOR;
    return COLORS.ORANGE_TEXT;
  };

  const getStatusText = (status: string, dueDate: string) => {
    if (status === 'paid') return t('smartSociety.paid');
    const today = new Date();
    const due = new Date(dueDate);
    if (due < today) return t('smartSociety.overdue');
    return t('smartSociety.unpaid');
  };

  const renderBillItem = ({ item }: any) => {
    const statusColor = getStatusColor(item.status, item.dueDate);
    const statusText = getStatusText(item.status, item.dueDate);

    return (
      <TouchableOpacity
        style={[
          MyBillsStyles.billCard,
          item.status === 'unpaid' &&
            new Date(item.dueDate) < new Date() &&
            MyBillsStyles.overdueCard,
        ]}
        activeOpacity={0.7}
      >
        <View style={MyBillsStyles.billHeader}>
          <View>
            <Text style={MyBillsStyles.billPeriodLabel}>
              {t('smartSociety.billPeriod')}
            </Text>
            <Text style={MyBillsStyles.billPeriod}>
              {formatPeriod(item.period)}
            </Text>
            <Text style={MyBillsStyles.billFlatNo}>
              {t('smartSociety.flat')}: {item.flatNo}
            </Text>
          </View>
          <View
            style={[
              MyBillsStyles.statusBadge,
              { backgroundColor: statusColor + '20' },
            ]}
          >
            <Text style={[MyBillsStyles.statusText, { color: statusColor }]}>
              {statusText}
            </Text>
          </View>
        </View>

        <View style={MyBillsStyles.chargesContainer}>
          <View style={MyBillsStyles.chargeRow}>
            <Text style={MyBillsStyles.chargeLabel}>
              {t('smartSociety.maintenance')}:
            </Text>
            <Text style={MyBillsStyles.chargeValue}>
              ₹{item.charges.maintenance}
            </Text>
          </View>
          <View style={MyBillsStyles.chargeRow}>
            <Text style={MyBillsStyles.chargeLabel}>
              {t('smartSociety.water')}:
            </Text>
            <Text style={MyBillsStyles.chargeValue}>₹{item.charges.water}</Text>
          </View>
          <View style={MyBillsStyles.chargeRow}>
            <Text style={MyBillsStyles.chargeLabel}>
              {t('smartSociety.parking')}:
            </Text>
            <Text style={MyBillsStyles.chargeValue}>
              ₹{item.charges.parking}
            </Text>
          </View>
        </View>

        <View style={MyBillsStyles.billFooter}>
          <View>
            <Text style={MyBillsStyles.totalLabel}>
              {t('smartSociety.totalAmount')}
            </Text>
            <Text style={MyBillsStyles.totalAmount}>₹{item.total}</Text>
            <Text style={MyBillsStyles.dueDate}>
              {t('smartSociety.due')}: {formatDate(item.dueDate)}
            </Text>
          </View>
          {item.status === 'paid' ? (
            <TouchableOpacity
              style={MyBillsStyles.receiptButton}
              onPress={() => handleViewReceipt(item)}
              activeOpacity={0.7}
            >
              <Text style={MyBillsStyles.receiptButtonText}>
                {t('smartSociety.viewReceipt')}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={MyBillsStyles.payButton}
              onPress={() => handlePayBill(item)}
              activeOpacity={0.7}
            >
              <Text style={MyBillsStyles.payButtonText}>
                {t('smartSociety.payNow')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.myBills')}
        onPress={() => props.navigation?.goBack()}
      />
      <ScrollView
        style={MyBillsStyles.container}
        contentContainerStyle={MyBillsStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Filter Tabs */}
        <View style={MyBillsStyles.filterContainer}>
          {(['all', 'unpaid', 'paid', 'overdue'] as const).map(filterType => (
            <TouchableOpacity
              key={filterType}
              style={[
                MyBillsStyles.filterTab,
                filter === filterType && MyBillsStyles.filterTabActive,
              ]}
              onPress={() => setFilter(filterType)}
            >
              <Text
                style={[
                  MyBillsStyles.filterTabText,
                  filter === filterType && MyBillsStyles.filterTabTextActive,
                ]}
              >
                {filterType === 'all'
                  ? t('common.all')
                  : t(`smartSociety.${filterType}`)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bills List */}
        {filteredBills.length > 0 ? (
          <FlatList
            data={filteredBills}
            renderItem={renderBillItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            contentContainerStyle={MyBillsStyles.billsList}
          />
        ) : (
          <View style={MyBillsStyles.emptyState}>
            <Text style={MyBillsStyles.emptyStateText}>
              {t('smartSociety.noBillsFoundForFilter')}
            </Text>
          </View>
        )}
      </ScrollView>
    </Container>
  );
};

export default MyBills;
