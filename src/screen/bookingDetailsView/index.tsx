import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS, FF, FS } from '../../constants';

// Back Arrow Icon
const BackArrowIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18L9 12L15 6"
      stroke="#000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Profile Icon
const ProfileIcon = () => (
  <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <Path
      d="M20 20C24.4183 20 28 16.4183 28 12C28 7.58172 24.4183 4 20 4C15.5817 4 12 7.58172 12 12C12 16.4183 15.5817 20 20 20Z"
      fill="#6B7280"
    />
    <Path
      d="M20 22C11.1634 22 4 29.1634 4 38H36C36 29.1634 28.8366 22 20 22Z"
      fill="#6B7280"
    />
  </Svg>
);

interface PaymentStage {
  stageName: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: string;
  remark?: string;
}

interface BookingData {
  bookingDate: string;
  status: string;
  clientName: string;
  clientContact: string;
  projectName: string;
  unitNumber: string;
  configuration: string;
  floor: string;
  facing: string;
  carpetArea: number;
  builtupArea: number;
  totalSaleValue: number;
  commissionPercentage: number;
  commissionAmount: number;
  paymentStages: PaymentStage[];
}

const BookingDetailsView = ({ navigation, route }: any) => {
  const { bookingId } = route.params || {};
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'document' | 'payment'>('document');

  useEffect(() => {
    fetchBookingDetails();
  }, [bookingId]);

  const fetchBookingDetails = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await bookingsService.getBookingById(bookingId);
      // setBookingData(response.data);

      // Mock data
      const mockData: BookingData = {
        bookingDate: '2025-11-12',
        status: 'Booked',
        clientName: 'Rajesh Kumar',
        clientContact: '+91 98765 43210',
        projectName: 'Shivalik Heights',
        unitNumber: 'A-204',
        configuration: '3BHK',
        floor: '2nd Floor',
        facing: 'South',
        carpetArea: 950.5,
        builtupArea: 1350.75,
        totalSaleValue: 12500000,
        commissionPercentage: 2.5,
        commissionAmount: 312500,
        paymentStages: [
          {
            stageName: 'Booking Amount',
            amount: 78125,
            dueDate: '2025-11-15',
            paidDate: '2025-11-12',
            status: 'paid',
          },
          {
            stageName: 'Booking Amount',
            amount: 78125,
            dueDate: '2025-12-15',
            status: 'unpaid',
          },
          {
            stageName: 'Booking Amount',
            amount: 78125,
            dueDate: '2026-01-15',
            status: 'unpaid',
            remark: 'Final Payment on possession',
          },
        ],
      };
      setBookingData(mockData);
    } catch (error: any) {
      console.error('Error fetching booking details:', error);
      Alert.alert('Error', 'Failed to load booking details');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount: number): string => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return { bg: '#D1FAE5', text: '#059669' };
      case 'unpaid':
        return { bg: '#FEE2E2', text: '#DC2626' };
      default:
        return { bg: '#E0E7FF', text: '#4F46E5' };
    }
  };

  if (loading || !bookingData) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <BackArrowIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Booking Details</Text>
          <TouchableOpacity onPress={handleProfilePress} style={styles.profileIcon}>
            <ProfileIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <BackArrowIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Details</Text>
        <TouchableOpacity onPress={handleProfilePress} style={styles.profileIcon}>
          <ProfileIcon />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Booking Date & Status */}
        <View style={styles.bookingHeader}>
          <View>
            <Text style={styles.label}>Booking Date</Text>
            <Text style={styles.bookingDate}>{formatDate(bookingData.bookingDate)}</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{bookingData.status}</Text>
          </View>
        </View>

        {/* Client Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Client Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Client Name</Text>
            <Text style={styles.infoValue}>{bookingData.clientName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Client Contact</Text>
            <Text style={styles.infoValue}>{bookingData.clientContact}</Text>
          </View>
        </View>

        {/* Property Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property Details</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Project Name</Text>
            <Text style={styles.infoValue}>{bookingData.projectName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Unit Number</Text>
            <Text style={styles.infoValue}>{bookingData.unitNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Configuration</Text>
            <Text style={styles.infoValue}>{bookingData.configuration}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Floor</Text>
            <Text style={styles.infoValue}>{bookingData.floor}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Facing</Text>
            <Text style={styles.infoValue}>{bookingData.facing}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Carpet Area</Text>
            <Text style={styles.infoValue}>{bookingData.carpetArea} sq.ft</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Built-up Area</Text>
            <Text style={styles.infoValue}>{bookingData.builtupArea} sq.ft</Text>
          </View>
        </View>

        {/* Financial Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Financial Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Total Sale Value</Text>
            <Text style={styles.infoValue}>
              {formatCurrency(bookingData.totalSaleValue)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Commission Percentage</Text>
            <Text style={styles.infoValue}>{bookingData.commissionPercentage}%</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Commission Amount</Text>
            <Text style={styles.infoValue}>
              {formatCurrency(bookingData.commissionAmount)}
            </Text>
          </View>
        </View>

        {/* Payment Stages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Total: {bookingData.paymentStages.length} Stages
          </Text>
          {bookingData.paymentStages.map((stage, index) => {
            const statusColors = getStatusColor(stage.status);
            return (
              <View key={index} style={styles.stageCard}>
                <View style={styles.stageHeader}>
                  <Text style={styles.stageName}>{stage.stageName}</Text>
                  <View
                    style={[styles.stageStatusBadge, { backgroundColor: statusColors.bg }]}
                  >
                    <Text style={[styles.stageStatusText, { color: statusColors.text }]}>
                      {stage.status.charAt(0).toUpperCase() + stage.status.slice(1)}
                    </Text>
                  </View>
                </View>
                <View style={styles.stageInfo}>
                  <Text style={styles.stageLabel}>Amount</Text>
                  <Text style={styles.stageValue}>{formatCurrency(stage.amount)}</Text>
                </View>
                <View style={styles.stageInfo}>
                  <Text style={styles.stageLabel}>Due Date</Text>
                  <Text style={styles.stageValue}>{formatDate(stage.dueDate)}</Text>
                </View>
                {stage.paidDate && (
                  <View style={styles.stageInfo}>
                    <Text style={styles.stageLabel}>Paid Date</Text>
                    <Text style={styles.stageValue}>{formatDate(stage.paidDate)}</Text>
                  </View>
                )}
                {stage.remark && (
                  <View style={styles.stageInfo}>
                    <Text style={styles.stageLabel}>Remark</Text>
                    <Text style={styles.stageValue}>{stage.remark}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom Tabs */}
      <View style={styles.bottomTabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'document' && styles.activeTab]}
          onPress={() => setActiveTab('document')}
        >
          <Text style={[styles.tabText, activeTab === 'document' && styles.activeTabText]}>
            Document
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'payment' && styles.activeTab]}
          onPress={() => setActiveTab('payment')}
        >
          <Text style={[styles.tabText, activeTab === 'payment' && styles.activeTabText]}>
            Payment History
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: COLORS.WHITE,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    fontWeight: '600',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.WHITE,
    marginBottom: 8,
  },
  label: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: '#9CA3AF',
    marginBottom: 4,
  },
  bookingDate: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    fontWeight: '600',
  },
  statusBadge: {
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: FS.FS12,
    fontFamily: FF[600],
    color: COLORS.WHITE,
    fontWeight: '600',
  },
  section: {
    backgroundColor: COLORS.WHITE,
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: '#6B7280',
    marginBottom: 12,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: '#9CA3AF',
  },
  infoValue: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: COLORS.BLACK,
    fontWeight: '500',
    textAlign: 'right',
  },
  stageCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  stageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stageName: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    fontWeight: '600',
  },
  stageStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  stageStatusText: {
    fontSize: FS.FS10,
    fontFamily: FF[600],
    fontWeight: '600',
  },
  stageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  stageLabel: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: '#9CA3AF',
  },
  stageValue: {
    fontSize: FS.FS12,
    fontFamily: FF[500],
    color: COLORS.BLACK,
    fontWeight: '500',
  },
  bottomTabs: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6B7280',
  },
  activeTab: {
    backgroundColor: COLORS.BLACK,
  },
  tabText: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.WHITE,
    fontWeight: '600',
  },
  activeTabText: {
    color: COLORS.WHITE,
  },
});

export default BookingDetailsView;
