import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS, FF, FS } from '../../constants';
import LeadDetailsHeader from '../../components/common/LeadDetailsHeader';
import ClientInformation from '../../components/common/ClientInformation';
import CommunicationHistory from '../../components/common/CommunicationHistory';
import Documents from '../../components/common/Documents';
import ScheduleFollowupModal from '../../components/common/ScheduleFollowupModal';
import UpdateStatusModal from '../../components/common/UpdateStatusModal';
import BookingDataModal from '../../components/common/BookingDataModal';
import { useLeads } from '../../hooks/useLeads';
import type { Lead } from '../../services/api';

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

const LeadDetails = ({ navigation, route }: any) => {
  const { leadId } = route.params || {};
  const { getLeadById, rescheduleSiteVisit, updateLeadStage, loading } = useLeads();
  const [leadData, setLeadData] = useState<Lead | null>(null);
  const [isOnHold, setIsOnHold] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false);
  const [showBookingDataModal, setShowBookingDataModal] = useState(false);
  const [bookingDataCallback, setBookingDataCallback] = useState<((data: any) => void) | null>(null);

  useEffect(() => {
    if (leadId) {
      fetchLeadDetails();
    }
  }, [leadId]);

  const fetchLeadDetails = async () => {
    try {
      console.log('Fetching lead details for ID:', leadId);
      const response = await getLeadById(leadId);
      console.log('Lead API Response:', JSON.stringify(response, null, 2));
      
      // The API returns the lead object directly, not wrapped in a data property
      const lead = (response as any).data || response;
      console.log('Lead Data:', JSON.stringify(lead, null, 2));
      console.log('Lead Stage:', lead?.stage);
      
      setLeadData(lead);
      // Check if lead is on hold based on stage
      setIsOnHold(lead?.stage === 'On Hold');
    } catch (error: any) {
      console.error('Error fetching lead details:', error);
      Alert.alert('Error', error.message || 'Failed to load lead details');
      navigation.goBack();
    }
  };

  const formatBudgetRange = (min: number, max: number): string => {
    const formatValue = (value: number): string => {
      const lakhs = value / 100000;
      if (lakhs >= 100) {
        return `₹${(lakhs / 100).toFixed(1)}Cr`;
      }
      return `₹${lakhs.toFixed(1)}L`;
    };
    return `${formatValue(min)} - ${formatValue(max)}`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleScheduleFollowup = () => {
    // Only allow scheduling if status is "Site Visit Scheduled"
    if (leadData?.stage !== 'Site Visit Scheduled') {
      Alert.alert(
        'Cannot Schedule Followup',
        'Followup can only be scheduled when the lead status is "Site Visit Scheduled".'
      );
      return;
    }
    setShowScheduleModal(true);
  };

  const handleSaveFollowup = async (date: string, remark: string) => {
    try {
      await rescheduleSiteVisit(leadId, {
        newSiteVisitDate: date,
        remark: remark || undefined,
      });
      setShowScheduleModal(false);
      Alert.alert('Success', 'Site visit scheduled successfully!');
      // Refresh lead data
      fetchLeadDetails();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to schedule followup');
    }
  };

  const handleUpdateStatus = () => {
    setShowUpdateStatusModal(true);
  };

  const handleBookingDataRequired = (callback: (data: any) => void) => {
    setBookingDataCallback(() => callback);
    setShowUpdateStatusModal(false);
    setShowBookingDataModal(true);
  };

  const handleBookingDataSubmit = async (bookingData: any) => {
    if (bookingDataCallback) {
      await bookingDataCallback(bookingData);
      setShowBookingDataModal(false);
      setBookingDataCallback(null);
    }
  };

  const handleSaveStatus = async (newStage: string, data: any) => {
    try {
      const response = await updateLeadStage(leadId, data);
      setShowUpdateStatusModal(false);
      
      // If status is "Booked", navigate to booking details
      if (newStage === 'Booked' && response.data?.bookingId) {
        Alert.alert('Success', 'Lead status updated to Booked!', [
          {
            text: 'View Booking',
            onPress: () => {
              navigation.navigate('BookingDetails', { bookingId: response.data.bookingId });
            },
          },
          {
            text: 'OK',
            onPress: () => fetchLeadDetails(),
          },
        ]);
      } else {
        Alert.alert('Success', 'Lead status updated successfully!');
        fetchLeadDetails();
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update status');
    }
  };

  const handleUploadDocument = () => {
    Alert.alert('Upload Document', 'Upload document functionality');
  };

  const handleDocumentPress = (documentId: string) => {
    Alert.alert('Document', `Opening document: ${documentId}`);
  };

  // Transform lead timeline to communication history
  const communicationHistory = leadData?.leadTimeline?.map((item, index) => ({
    id: index.toString(),
    title: item.newStage,
    description: item.remark,
    date: formatDate(item.date),
    isActive: index < 2, // Mark first 2 as active
  })) || [];

  // Transform documents data
  const documentsData = leadData?.documents?.map((doc, index) => {
    const fileName = doc.split('/').pop() || `document_${index + 1}`;
    return {
      id: index.toString(),
      name: fileName,
      size: 'N/A', // Size not provided by API
      url: doc,
    };
  }) || [];

  // Get all remarks as a single string
  const remarksText = leadData?.remarks?.map(r => r.description).join('\n\n') || '';

  if (loading || !leadData) {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <BackArrowIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Lead Details</Text>
          <TouchableOpacity onPress={handleProfilePress} style={styles.profileIcon}>
            <ProfileIcon />
          </TouchableOpacity>
        </View>
        
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000000" />
          <Text style={styles.loadingText}>Loading lead details...</Text>
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
        <Text style={styles.headerTitle}>Lead Details</Text>
        <TouchableOpacity onPress={handleProfilePress} style={styles.profileIcon}>
          <ProfileIcon />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Lead Details Header */}
        <LeadDetailsHeader
          name={leadData.clientName || 'N/A'}
          projectName={leadData.projectName || 'N/A'}
          status={leadData.stage || 'New Lead'}
          isOnHold={isOnHold}
          onHoldToggle={setIsOnHold}
          lastUpdated={leadData.updatedAt ? formatDate(leadData.updatedAt) : 'N/A'}
        />

        {/* Client Information */}
        <ClientInformation
          contactNumber={leadData.clientContactNumber || 'N/A'}
          email={leadData.clientEmail || 'N/A'}
          budgetRange={leadData.budgetRange ? formatBudgetRange(leadData.budgetRange.min, leadData.budgetRange.max) : 'N/A'}
          sourceOfLead={leadData.leadSource || 'N/A'}
          followUpDate={leadData.nextFollowupDate ? formatDate(leadData.nextFollowupDate) : 'N/A'}
          remarks={remarksText || 'No remarks'}
        />

        {/* Communication History */}
        <CommunicationHistory items={communicationHistory} />

        {/* Documents */}
        <Documents
          documents={documentsData}
          onUploadPress={handleUploadDocument}
          onDocumentPress={handleDocumentPress}
        />
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[
            styles.scheduleButton,
            leadData?.stage !== 'Site Visit Scheduled' && styles.disabledButton,
          ]}
          onPress={handleScheduleFollowup}
          activeOpacity={0.7}
          disabled={leadData?.stage !== 'Site Visit Scheduled'}
        >
          <Text style={styles.scheduleButtonText}>Schedule Followup</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdateStatus}
          activeOpacity={0.7}
        >
          <Text style={styles.updateButtonText}>Update Status</Text>
        </TouchableOpacity>
      </View>

      {/* Schedule Followup Modal */}
      <ScheduleFollowupModal
        visible={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        onSave={handleSaveFollowup}
        loading={loading}
      />

      {/* Update Status Modal */}
      <UpdateStatusModal
        visible={showUpdateStatusModal}
        currentStatus={leadData?.stage || 'New Lead'}
        onClose={() => setShowUpdateStatusModal(false)}
        onUpdate={handleSaveStatus}
        onBookingDataRequired={handleBookingDataRequired}
        loading={loading}
      />

      {/* Booking Data Modal */}
      <BookingDataModal
        visible={showBookingDataModal}
        onClose={() => {
          setShowBookingDataModal(false);
          setShowUpdateStatusModal(true);
        }}
        onSubmit={handleBookingDataSubmit}
        loading={loading}
      />
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.WHITE,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  scheduleButton: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: '#6B7280',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scheduleButtonText: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.WHITE,
    fontWeight: '600',
  },
  updateButton: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: '#000000',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateButtonText: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.WHITE,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: '#6B7280',
  },
  disabledButton: {
    opacity: 0.5,
    backgroundColor: '#9CA3AF',
  },
});

export default LeadDetails;
