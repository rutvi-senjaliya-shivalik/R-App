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
  Switch,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Svg, { Path } from 'react-native-svg';
import { COLORS, FF, FS } from '../../constants';

interface ScheduleFollowupModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (date: string, remark: string) => Promise<void>;
  loading?: boolean;
}

// Calendar Icon
const CalendarIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Path
      d="M16 2H4C2.89543 2 2 2.89543 2 4V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V4C18 2.89543 17.1046 2 16 2Z"
      stroke="#3B82F6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M2 8H18" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M6 2V6" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M14 2V6" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ScheduleFollowupModal: React.FC<ScheduleFollowupModalProps> = ({
  visible,
  onClose,
  onSave,
  loading = false,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [remark, setRemark] = useState('');
  const [enableNotification, setEnableNotification] = useState(false);

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleSave = async () => {
    // Format date as YYYY-MM-DD
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    
    await onSave(formattedDate, remark);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
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
                  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M15 18L9 12L15 6"
                      stroke="#000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Schedule Followup</Text>
                <View style={styles.iconPlaceholder}>
                  <CalendarIcon />
                </View>
              </View>

              {/* Content */}
              <View style={styles.content}>
                {/* Info Text */}
                <View style={styles.infoBox}>
                  <Text style={styles.infoText}>
                    Set a reminder to contact this client again
                  </Text>
                </View>

                {/* Select Date */}
                <TouchableOpacity
                  style={styles.inputButton}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={[styles.inputButtonText, !selectedDate && styles.placeholderText]}>
                    {selectedDate ? formatDate(selectedDate) : 'Select Date'}
                  </Text>
                </TouchableOpacity>

                {/* Add Additional Remarks */}
                <TextInput
                  style={styles.textArea}
                  placeholder="Add Additional Remarks"
                  placeholderTextColor="#9CA3AF"
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                  value={remark}
                  onChangeText={setRemark}
                />

                {/* Enable Notification */}
                <View style={styles.notificationRow}>
                  <Switch
                    value={enableNotification}
                    onValueChange={setEnableNotification}
                    trackColor={{ false: '#D1D5DB', true: '#000000' }}
                    thumbColor={COLORS.WHITE}
                  />
                  <Text style={styles.notificationText}>Enable Notification</Text>
                </View>
              </View>

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
                  style={[styles.saveButton, loading && styles.saveButtonDisabled]}
                  onPress={handleSave}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color={COLORS.WHITE} />
                  ) : (
                    <Text style={styles.saveButtonText}>Save</Text>
                  )}
                </TouchableOpacity>
              </View>

              {/* Date Picker */}
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
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
  iconPlaceholder: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
    gap: 12,
  },
  infoBox: {
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  infoText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: '#1E40AF',
  },
  inputButton: {
    height: 50,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  inputButtonText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK,
  },
  placeholderText: {
    color: '#9CA3AF',
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
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: '#6B7280',
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
  saveButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#000000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.WHITE,
    fontWeight: '600',
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
});

export default ScheduleFollowupModal;
