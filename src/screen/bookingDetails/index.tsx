import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
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

interface PaymentStage {
  id: string;
  stageName: string;
  amount: string;
  dueDate: Date | null;
  status: string;
  paidDate: Date | null;
  remark: string;
}

const BookingDetails = ({ navigation, route }: any) => {
  const { bookingId } = route.params || {};
  const COMMISSION_PERCENTAGE = 2.5;

  const [totalSaleValue, setTotalSaleValue] = useState('');
  const [commissionAmount, setCommissionAmount] = useState('0.00');
  const [paymentStages, setPaymentStages] = useState<PaymentStage[]>([]);
  const [showDatePicker, setShowDatePicker] = useState<{
    stageId: string;
    type: 'due' | 'paid';
  } | null>(null);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleTotalSaleValueChange = (value: string) => {
    // Remove non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');
    setTotalSaleValue(numericValue);

    // Calculate commission
    if (numericValue) {
      const saleValue = parseFloat(numericValue);
      const commission = (saleValue * COMMISSION_PERCENTAGE) / 100;
      setCommissionAmount(commission.toFixed(2));
    } else {
      setCommissionAmount('0.00');
    }
  };

  const handleAddPaymentStage = () => {
    const newStage: PaymentStage = {
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
    Alert.alert(
      'Delete Payment Stage',
      'Are you sure you want to delete this payment stage?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setPaymentStages(paymentStages.filter((stage) => stage.id !== id));
          },
        },
      ]
    );
  };

  const handleStageFieldChange = (
    id: string,
    field: keyof PaymentStage,
    value: any
  ) => {
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

  const handleUpdate = () => {
    // Validate
    if (!totalSaleValue) {
      Alert.alert('Error', 'Please enter total sale value');
      return;
    }

    // TODO: Submit to API
    Alert.alert('Success', 'Booking details updated successfully!');
  };

  const handleCancel = () => {
    navigation.goBack();
  };

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

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Total Sale Value */}
        <Text style={styles.label}>Total Sale Value</Text>
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

        {/* Commission Percentage */}
        <Text style={styles.label}>Commission Percentage</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={COMMISSION_PERCENTAGE.toString()}
            editable={false}
          />
          <Text style={styles.percentSymbol}>%</Text>
        </View>

        {/* Commission Amount */}
        <Text style={styles.label}>Commission Amount</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.currencySymbol}>₹</Text>
          <TextInput
            style={styles.input}
            value={commissionAmount}
            editable={false}
          />
        </View>

        {/* Add Payment Stage Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddPaymentStage}
          activeOpacity={0.7}
        >
          <Text style={styles.addButtonText}>+ Add Payment Stage</Text>
        </TouchableOpacity>

        {/* Payment Stages */}
        {paymentStages.length > 0 && (
          <View style={styles.paymentStagesSection}>
            <Text style={styles.sectionTitle}>Payment Stages</Text>
            <Text style={styles.sectionSubtitle}>
              Add payment milestones for this booking
            </Text>

            {paymentStages.map((stage, index) => (
              <View key={stage.id} style={styles.stageCard}>
                {/* Stage Header */}
                <View style={styles.stageHeader}>
                  <Text style={styles.stageTitle}>Stage {index + 1}</Text>
                  <TouchableOpacity
                    onPress={() => handleDeletePaymentStage(stage.id)}
                  >
                    <DeleteIcon />
                  </TouchableOpacity>
                </View>

                {/* Stage Name */}
                <Text style={styles.fieldLabel}>Stage Name</Text>
                <TextInput
                  style={styles.stageInput}
                  placeholder="e.g., Token Amount"
                  placeholderTextColor="#9CA3AF"
                  value={stage.stageName}
                  onChangeText={(value) =>
                    handleStageFieldChange(stage.id, 'stageName', value)
                  }
                />

                {/* Amount */}
                <Text style={styles.fieldLabel}>Amount</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.currencySymbol}>₹</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="0.00"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="decimal-pad"
                    value={stage.amount}
                    onChangeText={(value) =>
                      handleStageFieldChange(stage.id, 'amount', value)
                    }
                  />
                </View>

                {/* Due Date */}
                <Text style={styles.fieldLabel}>Due Date</Text>
                <TouchableOpacity
                  style={styles.stageInput}
                  onPress={() =>
                    setShowDatePicker({ stageId: stage.id, type: 'due' })
                  }
                >
                  <Text
                    style={[
                      styles.dateText,
                      !stage.dueDate && styles.placeholderText,
                    ]}
                  >
                    {stage.dueDate ? formatDate(stage.dueDate) : 'Select Date'}
                  </Text>
                </TouchableOpacity>

                {/* Status */}
                <Text style={styles.fieldLabel}>Status</Text>
                <View style={styles.statusButtons}>
                  {['unpaid', 'paid', 'overdue'].map((statusOption) => (
                    <TouchableOpacity
                      key={statusOption}
                      style={[
                        styles.statusButton,
                        stage.status === statusOption && styles.statusButtonActive,
                      ]}
                      onPress={() =>
                        handleStageFieldChange(stage.id, 'status', statusOption)
                      }
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

                {/* Paid Date */}
                <Text style={styles.fieldLabel}>Paid Date</Text>
                <TouchableOpacity
                  style={styles.stageInput}
                  onPress={() =>
                    setShowDatePicker({ stageId: stage.id, type: 'paid' })
                  }
                >
                  <Text
                    style={[
                      styles.dateText,
                      !stage.paidDate && styles.placeholderText,
                    ]}
                  >
                    {stage.paidDate ? formatDate(stage.paidDate) : 'Select Date'}
                  </Text>
                </TouchableOpacity>

                {/* Remark */}
                <Text style={styles.fieldLabel}>Remark (Optional)</Text>
                <TextInput
                  style={styles.textArea}
                  placeholder="Add remarks..."
                  placeholderTextColor="#9CA3AF"
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                  value={stage.remark}
                  onChangeText={(value) =>
                    handleStageFieldChange(stage.id, 'remark', value)
                  }
                />
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancel}
          activeOpacity={0.7}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdate}
          activeOpacity={0.7}
        >
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
      </View>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: COLORS.WHITE,
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
    borderRadius: 20,
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
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
  percentSymbol: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: COLORS.BLACK,
    marginLeft: 8,
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
    marginTop: 24,
  },
  addButtonText: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.WHITE,
    fontWeight: '600',
  },
  paymentStagesSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    fontWeight: '600',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: '#6B7280',
    marginBottom: 16,
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
    marginBottom: 16,
  },
  stageTitle: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    fontWeight: '600',
  },
  fieldLabel: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: '#6B7280',
    marginBottom: 8,
    marginTop: 12,
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
    height: 80,
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
    backgroundColor: COLORS.WHITE,
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

export default BookingDetails;
