import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Svg, { Path } from 'react-native-svg';
import { COLORS, FF, FS } from '../../constants';

interface PaymentStage {
  stageName: string;
  amount: number;
  dueDate: string;
  status: string;
  paidDate?: string;
  remark?: string;
}

interface BookingDataModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (bookingData: {
    totalSaleValue: number;
    commissionPercentage: number;
    commissionAmount: number;
    paymentStages: PaymentStage[];
  }) => Promise<void>;
  loading?: boolean;
}

// Delete Icon
const DeleteIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Path
      d="M2.5 5H4.16667H17.5"
      stroke="#EF4444"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.66667 5V3.33333C6.66667 2.89131 6.84226 2.46738 7.15482 2.15482C7.46738 1.84226 7.89131 1.66667 8.33333 1.66667H11.6667C12.1087 1.66667 12.5326 1.84226 12.8452 2.15482C13.1577 2.46738 13.3333 2.89131 13.3333 3.33333V5M15.8333 5V16.6667C15.8333 17.1087 15.6577 17.5326 15.3452 17.8452C15.0326 18.1577 14.6087 18.3333 14.1667 18.3333H5.83333C5.39131 18.3333 4.96738 18.1577 4.65482 17.8452C4.34226 17.5326 4.16667 17.1087 4.16667 16.6667V5H15.8333Z"
      stroke="#EF4444"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BookingDataModal: React.FC<BookingDataModalProps> = ({
  visible,
  onClose,
  onSubmit,
  loading = false,
}) => {
  const COMMISSION_PERCENTAGE = 2.5;

  const [totalSaleValue, setTotalSaleValue] = useState('');
  const [commissionAmount, setCommissionAmount] = useState('0.00');
  const [paymentStages, setPaymentStages] = useState<Array<{
    id: string;
    stageName: string;
    amount: string;
    dueDate: Date | null;
    status: string;
    paidDate: Date | null;
    remark: string;
  }>>([]);
  const [showDatePicker, setShowDatePicker] = useState<{
    stageId: string;
    type: 'due' | 'paid';
  } | null>(null);

  const handleTotalSaleValueChange = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    setTotalSaleValue(numericValue);

    if (numericValue) {
      const saleValue = parseFloat(numericValue);
      const commission = (saleValue * COMMISSION_PERCENTAGE) / 100;
      setCommissionAmount(commission.toFixed(2));
    } else {
      setCommissionAmount('0.00');
    }
  };

  const handleAddPaymentStage = () => {
    const newStage = {
      id: Date.now().toString(),
      stageName: '',
      amount: '',
      dueDate: null,
      status: 'unpaid',
      paidDate: null,
      remark: '',
    };
    setPaymentStages([...paymentStages, newStage]);
  };

  const handleDeletePaymentStage = (id: string) => {
    setPaymentStages(paymentStages.filter((stage) => stage.id !== id));
  };

  const handleStageFieldChange = (id: string, field: string, value: any) => {
    setPaymentStages(
      paymentStages.map((stage) =>
        stage.id === id ? { ...stage, [field]: value } : stage
      )
    );
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(null);
    if (selectedDate && showDatePicker) {
      handleStageFieldChange(
        showDatePicker.stageId,
        showDatePicker.type === 'due' ? 'dueDate' : 'paidDate',
        selectedDate
      );
    }
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatDateToYYYYMMDD = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async () => {
    // Validation
    if (!totalSaleValue) {
      Alert.alert('Error', 'Please enter total sale value');
      return;
    }

    if (paymentStages.length === 0) {
      Alert.alert('Error', 'Please add at least one payment stage');
      return;
    }

    // Validate payment stages
    for (const stage of paymentStages) {
      if (!stage.stageName || !stage.amount || !stage.dueDate || !stage.status) {
        Alert.alert('Error', 'Please fill all required fields in payment stages');
        return;
      }
    }

    // Prepare data
    const bookingData = {
      totalSaleValue: parseFloat(totalSaleValue),
      commissionPercentage: COMMISSION_PERCENTAGE,
      commissionAmount: parseFloat(commissionAmount),
      paymentStages: paymentStages.map((stage) => ({
        stageName: stage.stageName,
        amount: parseFloat(stage.amount),
        dueDate: formatDateToYYYYMMDD(stage.dueDate!),
        status: stage.status,
        paidDate: stage.paidDate ? formatDateToYYYYMMDD(stage.paidDate) : undefined,
        remark: stage.remark || undefined,
      })),
    };

    await onSubmit(bookingData);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Booking Details Required</Text>
                <TouchableOpacity onPress={onClose}>
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Content */}
              <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Total Sale Value */}
                <Text style={styles.label}>Total Sale Value *</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.currencySymbol}>₹</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="0.00"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="decimal-pad"
                    value={totalSaleValue}
                    onChangeText={handleTotalSaleValueChange}
                  />
                </View>

                {/* Commission */}
                <Text style={styles.label}>Commission ({COMMISSION_PERCENTAGE}%)</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.currencySymbol}>₹</Text>
                  <TextInput style={styles.input} value={commissionAmount} editable={false} />
                </View>

                {/* Add Payment Stage Button */}
                <TouchableOpacity style={styles.addButton} onPress={handleAddPaymentStage}>
                  <Text style={styles.addButtonText}>+ Add Payment Stage</Text>
                </TouchableOpacity>

                {/* Payment Stages */}
                {paymentStages.map((stage, index) => (
                  <View key={stage.id} style={styles.stageCard}>
                    <View style={styles.stageHeader}>
                      <Text style={styles.stageTitle}>Stage {index + 1}</Text>
                      <TouchableOpacity onPress={() => handleDeletePaymentStage(stage.id)}>
                        <DeleteIcon />
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.fieldLabel}>Stage Name *</Text>
                    <TextInput
                      style={styles.stageInput}
                      placeholder="e.g., Token Amount"
                      placeholderTextColor="#9CA3AF"
                      value={stage.stageName}
                      onChangeText={(value) => handleStageFieldChange(stage.id, 'stageName', value)}
                    />

                    <Text style={styles.fieldLabel}>Amount *</Text>
                    <View style={styles.inputContainer}>
                      <Text style={styles.currencySymbol}>₹</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="0.00"
                        placeholderTextColor="#9CA3AF"
                        keyboardType="decimal-pad"
                        value={stage.amount}
                        onChangeText={(value) => handleStageFieldChange(stage.id, 'amount', value)}
                      />
                    </View>

                    <Text style={styles.fieldLabel}>Due Date *</Text>
                    <TouchableOpacity
                      style={styles.stageInput}
                      onPress={() => setShowDatePicker({ stageId: stage.id, type: 'due' })}
                    >
                      <Text style={[styles.dateText, !stage.dueDate && styles.placeholderText]}>
                        {stage.dueDate ? formatDate(stage.dueDate) : 'Select Date'}
                      </Text>
                    </TouchableOpacity>

                    <Text style={styles.fieldLabel}>Status *</Text>
                    <View style={styles.statusButtons}>
                      {['unpaid', 'paid', 'overdue'].map((statusOption) => (
                        <TouchableOpacity
                          key={statusOption}
                          style={[
                            styles.statusButton,
                            stage.status === statusOption && styles.statusButtonActive,
                          ]}
                          onPress={() => handleStageFieldChange(stage.id, 'status', statusOption)}
                        >
                          <Text
                            style={[
                              styles.statusButtonText,
                              stage.status === statusOption && styles.statusButtonTextActive,
                            ]}
                          >
                            {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>

                    <Text style={styles.fieldLabel}>Remark (Optional)</Text>
                    <TextInput
                      style={styles.textArea}
                      placeholder="Add remarks..."
                      placeholderTextColor="#9CA3AF"
                      multiline
                      numberOfLines={2}
                      textAlignVertical="top"
                      value={stage.remark}
                      onChangeText={(value) => handleStageFieldChange(stage.id, 'remark', value)}
                    />
                  </View>
                ))}
              </ScrollView>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.cancelButton} onPress={onClose} disabled={loading}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.submitButton, loading && styles.submitButtonDisabled]}
                  onPress={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color={COLORS.WHITE} />
                  ) : (
                    <Text style={styles.submitButtonText}>Submit</Text>
                  )}
                </TouchableOpacity>
              </View>

              {/* Date Picker */}
              {showDatePicker && (
                <DateTimePicker
                  value={new Date()}
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
  headerTitle: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    fontWeight: '600',
  },
  closeButton: {
    fontSize: 24,
    color: '#6B7280',
  },
  content: {
    padding: 16,
    maxHeight: '70%',
  },
  label: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: '#6B7280',
    marginBottom: 8,
    marginTop: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  currencySymbol: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: COLORS.BLACK,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK,
  },
  addButton: {
    height: 50,
    backgroundColor: COLORS.BLACK,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  addButtonText: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.WHITE,
    fontWeight: '600',
  },
  stageCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  stageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  stageTitle: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    fontWeight: '600',
  },
  fieldLabel: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: '#6B7280',
    marginBottom: 8,
    marginTop: 8,
  },
  stageInput: {
    height: 50,
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK,
    justifyContent: 'center',
  },
  dateText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK,
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  textArea: {
    height: 60,
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK,
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
  submitButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#000000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.WHITE,
    fontWeight: '600',
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  statusButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  statusButton: {
    flex: 1,
    height: 40,
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusButtonActive: {
    backgroundColor: COLORS.BLACK,
    borderColor: COLORS.BLACK,
  },
  statusButtonText: {
    fontSize: FS.FS12,
    fontFamily: FF[500],
    color: '#6B7280',
    fontWeight: '500',
  },
  statusButtonTextActive: {
    color: COLORS.WHITE,
  },
});

export default BookingDataModal;
