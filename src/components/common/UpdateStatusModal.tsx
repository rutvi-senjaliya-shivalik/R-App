import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Platform,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Svg, { Path } from 'react-native-svg';
import { COLORS, FF, FS } from '../../constants';

interface UpdateStatusModalProps {
  visible: boolean;
  currentStatus: string;
  onClose: () => void;
  onUpdate: (newStage: string, data: any) => Promise<void>;
  onBookingDataRequired: (callback: (bookingData: any) => void) => void;
  loading?: boolean;
}

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

const UpdateStatusModal: React.FC<UpdateStatusModalProps> = ({
  visible,
  currentStatus,
  onClose,
  onUpdate,
  onBookingDataRequired,
  loading = false,
}) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [showDropdown, setShowDropdown] = useState(false);
  const [remark, setRemark] = useState('');
  const [lostReason, setLostReason] = useState('');
  const [siteVisitDate, setSiteVisitDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const statusOptions = [
    { label: 'New Lead', value: 'New Lead', color: '#3B82F6' },
    { label: 'Contacted', value: 'Contacted', color: '#10B981' },
    { label: 'Site Visit Scheduled', value: 'Site Visit Scheduled', color: '#F59E0B' },
    { label: 'Site Visit Completed', value: 'Site Visit Completed', color: '#8B5CF6' },
    { label: 'Negotiation', value: 'Negotiation', color: '#EC4899' },
    { label: 'Booking in Progress', value: 'Booking in Progress', color: '#6366F1' },
    { label: 'Booked', value: 'Booked', color: '#059669' },
    { label: 'Lost/Dead', value: 'Lost/Dead', color: '#EF4444' },
  ];

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      setSiteVisitDate(date);
    }
  };

  const handleUpdate = async () => {
    // If status is "Booked", request booking data first
    if (selectedStatus === 'Booked') {
      onBookingDataRequired(async (bookingData: any) => {
        const data: any = {
          newStage: selectedStatus,
          remark: remark || undefined,
          ...bookingData,
        };
        await onUpdate(selectedStatus, data);
      });
      return;
    }

    const data: any = {
      newStage: selectedStatus,
      remark: remark || undefined,
    };

    // Add conditional fields based on status
    if (selectedStatus === 'Lost/Dead' && lostReason) {
      data.lostReason = lostReason;
    }

    if (selectedStatus === 'Site Visit Scheduled') {
      const year = siteVisitDate.getFullYear();
      const month = String(siteVisitDate.getMonth() + 1).padStart(2, '0');
      const day = String(siteVisitDate.getDate()).padStart(2, '0');
      data.siteVisitDate = `${year}-${month}-${day}`;
    }

    await onUpdate(selectedStatus, data);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusColor = (value: string): string => {
    return statusOptions.find(s => s.value === value)?.color || '#6B7280';
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              {/* Header */}
              <View style={styles.header}>
                <TouchableOpacity onPress={onClose} style={styles.backButton}>
                  <BackArrowIcon />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Update Status</Text>
                <View style={styles.profileIcon}>
                  <ProfileIcon />
                </View>
              </View>

              {/* Content */}
              <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Info Text */}
                <Text style={styles.infoText}>
                  Set a reminder to contact this client again
                </Text>

                {/* Status Dropdown */}
                <TouchableOpacity
                  style={styles.dropdownButton}
                  onPress={() => setShowDropdown(!showDropdown)}
                >
                  <Text style={styles.dropdownButtonText}>{selectedStatus}</Text>
                  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <Path
                      d="M4 6L8 10L12 6"
                      stroke="#000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </TouchableOpacity>

                {/* Dropdown Options */}
                {showDropdown && (
                  <ScrollView style={styles.dropdownList} nestedScrollEnabled>
                    {statusOptions.map((option) => (
                      <TouchableOpacity
                        key={option.value}
                        style={styles.dropdownItem}
                        onPress={() => {
                          setSelectedStatus(option.value);
                          setShowDropdown(false);
                        }}
                      >
                        <View
                          style={[styles.statusDot, { backgroundColor: option.color }]}
                        />
                        <Text style={styles.dropdownItemText}>{option.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )}

                {/* Conditional Fields */}
                {selectedStatus === 'Lost/Dead' && (
                  <TextInput
                    style={styles.input}
                    placeholder="Lost Reason (required)"
                    placeholderTextColor="#9CA3AF"
                    value={lostReason}
                    onChangeText={setLostReason}
                  />
                )}

                {selectedStatus === 'Site Visit Scheduled' && (
                  <TouchableOpacity
                    style={styles.input}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text style={styles.inputText}>
                      {formatDate(siteVisitDate)}
                    </Text>
                  </TouchableOpacity>
                )}

                {/* Add Additional Remarks */}
                <TextInput
                  style={styles.textArea}
                  placeholder="Add Additional Remarks (optional)"
                  placeholderTextColor="#9CA3AF"
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                  value={remark}
                  onChangeText={setRemark}
                />
              </ScrollView>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={onClose}
                  disabled={loading}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.updateButton, loading && styles.updateButtonDisabled]}
                  onPress={handleUpdate}
                  disabled={loading || (selectedStatus === 'Lost/Dead' && !lostReason)}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color={COLORS.WHITE} />
                  ) : (
                    <Text style={styles.updateButtonText}>Update</Text>
                  )}
                </TouchableOpacity>
              </View>

              {/* Date Picker */}
              {showDatePicker && (
                <DateTimePicker
                  value={siteVisitDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleDateChange}
                  minimumDate={new Date()}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
    maxHeight: '70%',
  },
  infoText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: '#9CA3AF',
    marginBottom: 16,
  },
  dropdownButton: {
    height: 50,
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dropdownButtonText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK,
  },
  dropdownList: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginBottom: 12,
    maxHeight: 250,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dropdownItemText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK,
  },
  input: {
    height: 50,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
    justifyContent: 'center',
  },
  inputText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK,
  },
  textArea: {
    height: 120,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK,
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  cancelButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#6B7280',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.WHITE,
    fontWeight: '600',
  },
  updateButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#000000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateButtonText: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.WHITE,
    fontWeight: '600',
  },
  updateButtonDisabled: {
    opacity: 0.6,
  },
});

export default UpdateStatusModal;
