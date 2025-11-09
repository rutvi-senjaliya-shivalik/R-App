import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { FS, FF } from '../../constants/fonts';
import { useNavigation } from '@react-navigation/native';
import { Container, HeaderComponent } from '../../components/common';
import { useDispatch } from 'react-redux';
import { applyleaveAction } from './Actions/ApplyleaveAction';
import { leavetypelistAction } from './Actions/LeavetypeList';
import { holidaylistAction } from './Actions/HolidaysAction';
import PrefManager from '../../utils/prefManager';

interface LeaveType {
  id: string;
  name: string;
  balance: number;
  applyBeforeDays: number; // ✅ store applyBeforeDays from API
  applyOnPastDays?: boolean; // if true, allow applying for past dates (ignore applyBeforeDays)
}

type Session = 'Full Day' | 'Half Day';

const ApplyLeave: React.FC = (props: any) => {
  const dispatch = useDispatch() as any;
  const navigation = useNavigation();

  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [selectedLeave, setSelectedLeave] = useState<LeaveType | null>(null);
  const [showLeaveList, setShowLeaveList] = useState(false);
  const [loadingLeaveTypes, setLoadingLeaveTypes] = useState(false);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [pickerMode, setPickerMode] = useState<'from' | 'to' | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [fromSession, setFromSession] = useState<Session>('Full Day');
  const [toSession, setToSession] = useState<Session>('Full Day');
  const [reason, setReason] = useState<string>('');
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const openDatePicker = (mode: 'from' | 'to') => {
    setPickerMode(mode);
    setShowPicker(true);
  };

  // Shared helper to calculate leave count given start/end dates and sessions
  const calculateLeaveCountForDates = (
    start: Date | null,
    end: Date | null,
    startSessionVal: Session,
    endSessionVal: Session,
  ): number => {
    if (!start) return 0;
    if (startSessionVal === 'Half Day') return 0.5;

    const startUtc = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
    const endDate = end || start;
    const endUtc = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
    const msPerDay = 24 * 60 * 60 * 1000;
    let diffDays = Math.floor((endUtc - startUtc) / msPerDay) + 1;
    if (diffDays < 0) diffDays = 0;
    if (endSessionVal === 'Half Day') return Math.max(0.5, diffDays - 0.5);
    return diffDays;
  };

  const handleSubmit = async () => {
    if (
      !selectedLeave ||
      !fromDate ||
      (!toDate && fromSession === 'Full Day') ||
      !reason
    ) {
      Alert.alert('Please fill all fields before submitting.');
      return;
    }

    // ✅ Validate applyBeforeDays unless applyOnPastDays is allowed
    if (!selectedLeave.applyOnPastDays) {
      const today = new Date();
      const minAllowedDate = new Date();
      minAllowedDate.setDate(
        today.getDate() + (selectedLeave?.applyBeforeDays || 0),
      );

      if (fromDate < minAllowedDate) {
        Alert.alert(
          'Invalid Date',
          `You must apply at least ${selectedLeave?.applyBeforeDays} day(s) in advance.`,
        );
        return;
      }
    }

    try {
      setLoadingSubmit(true);

      const toDateValue = fromSession === 'Half Day' ? fromDate : toDate;

      const leaveCount = calculateLeaveCountForDates(
        fromDate,
        toDateValue,
        fromSession,
        toSession,
      );

      // Prevent submitting if balance insufficient
      if (selectedLeave && typeof selectedLeave.balance === 'number') {
        if (leaveCount > selectedLeave.balance) {
          Alert.alert('Insufficient Balance', 'You do not have enough leave balance for the selected dates.');
          return;
        }
      }

      const userData = await PrefManager.getValue('userData');
      const userId = JSON.parse(userData)._id;
      const payload = {
        leave_type_id: selectedLeave.id,
        id: userId,
        // pass numeric count (e.g. 2, 1.5, 0.5)
        leave_taken: leaveCount,
        from_date: fromDate?.toISOString().split('T')[0] || '',
        to_date: toDateValue?.toISOString().split('T')[0] || '',
        reason,
      };

      const response = await dispatch(applyleaveAction(payload));

      // Normalize success check: some APIs return status on response.status (number)
      // others include response.data.status or simply response.data.message
      const ok =
        response?.status === 200 ||
        response?.status === '200' ||
        response?.data?.status === 200 ||
        response?.data?.status === '200' ||
        (!!response?.data && typeof response.data.message !== 'undefined');

      if (ok) {
        Alert.alert('Leave applied successfully!');
        await ApicallGetHolidaylist(
          (fromDate || new Date()).getFullYear().toString(),
        );
        navigation.goBack();
      } else {
        Alert.alert('Error', response?.data?.message || response?.message || 'Something went wrong!');
      }
    } catch (error) {
      console.log('🚨 Exception occurred:', error);
      Alert.alert('Error', 'Failed to apply leave. Please try again.');
    } finally {
      setLoadingSubmit(false);
    }
  };

  const formatDate = (date: Date | null): string =>
    date ? date.toLocaleDateString('en-GB') : 'Select Date';

  const dismissKeyboard = () => Keyboard.dismiss();

  useEffect(() => {
    ApicallGetLeavetypelist();
  }, []);

  const ApicallGetLeavetypelist = async (): Promise<void> => {
    try {
      setLoadingLeaveTypes(true);
      const userData = await PrefManager.getValue('userData');
      const userId = JSON.parse(userData)._id;

      const payload = { id: userId };
      const response = await dispatch(leavetypelistAction(payload));

      if (response?.status === 200) {
        const types = response.data.message.map((item: any) => ({
          id: item.leave_type_id,
          name: item.name,
          // try several possible fields for balance coming from API
          balance:
            item.remaining_leaves ??
            item.available_balance ??
            item.availableLeaves ??
            item.available_leaves ??
            item.remaining ??
            0,
          applyBeforeDays: item.rules?.applyBeforeDays || 0, // ✅ store applyBeforeDays
          applyOnPastDays: item.rules?.applyOnPastDays ?? false,
        }));
        setLeaveTypes(types);
      } else {
        console.log(
          '🚨 API Error:',
          response?.data?.message || 'Unknown error',
        );
      }
    } catch (error: any) {
      console.log('🚨 Exception occurred:', error);
    } finally {
      setLoadingLeaveTypes(false);
    }
  };

  const ApicallGetHolidaylist = async (year: string) => {
    try {
      const payload = { year };
      const response = await dispatch(holidaylistAction(payload));

      const ok =
        response?.status === 200 ||
        response?.status === '200' ||
        response?.data?.status === 200 ||
        response?.data?.status === '200' ||
        (!!response?.data && typeof response.data.message !== 'undefined');

      if (ok) {
        console.log('Holiday List:', response.data);
      } else {
        console.log('🚨 API Error:', response?.message || 'Unknown error');
      }
    } catch (error) {
      console.log('🚨 Exception occurred:', error);
    }
  };

  // Automatically clear To Date if From Session is Half Day
  useEffect(() => {
    if (fromSession === 'Half Day') setToDate(null);
  }, [fromSession]);

  return (
    <Container>
      <HeaderComponent
        onPress={() => props.navigation.goBack()}
        Title="Apply Leave"
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.formContainer}>
              {/* Leave Type */}
              <Text style={styles.label}>Select Leave Type</Text>
              <TouchableOpacity
                style={[
                  styles.dropdown,
                  {
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                  },
                ]}
                onPress={() => setShowLeaveList(prev => !prev)}
              >
                <Text style={styles.dropdownText}>
                  {selectedLeave ? selectedLeave.name : 'Select Leave Type'}
                </Text>
                <Text style={styles.dropdownText}>
                  {showLeaveList ? '▲' : '▼'}
                </Text>
              </TouchableOpacity>

              {showLeaveList && !loadingLeaveTypes && (
                <View style={[styles.dropdown, { marginTop: 4 }]}>
                  {/* Show balance header first when dropdown opens */}
                  <View style={styles.balanceHeader}>
                    <Text style={styles.balanceHeaderText}>
                      {selectedLeave
                        ? `Available: ${selectedLeave.balance}`
                        : 'Select a leave to view balance'}
                    </Text>
                  </View>

                  {leaveTypes.map(type => (
                    <TouchableOpacity
                      key={type.id}
                      style={[
                        styles.dropdownItemRow,
                        selectedLeave?.id === type.id && styles.selectedItem,
                      ]}
                      onPress={() => {
                        setSelectedLeave(type);
                        setShowLeaveList(false);
                      }}
                    >
                      <Text style={styles.dropdownText}>{type.name}</Text>
                      <Text style={styles.itemBalanceText}>{type.balance}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* From Date */}
              <Text style={styles.label}>From Date</Text>
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => openDatePicker('from')}
                >
                  <Text style={styles.dateText}>{formatDate(fromDate)}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.sessionButton}
                  onPress={() =>
                    setFromSession(prev =>
                      prev === 'Full Day' ? 'Half Day' : 'Full Day',
                    )
                  }
                >
                  <Text style={styles.sessionText}>{fromSession}</Text>
                </TouchableOpacity>
              </View>

              {/* To Date */}
              {fromSession === 'Full Day' && (
                <>
                  <Text style={styles.label}>To Date</Text>
                  <View style={styles.row}>
                    <TouchableOpacity
                      style={styles.dateButton}
                      onPress={() => openDatePicker('to')}
                    >
                      <Text style={styles.dateText}>{formatDate(toDate)}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.sessionButton}
                      onPress={() =>
                        setToSession(prev =>
                          prev === 'Full Day' ? 'Half Day' : 'Full Day',
                        )
                      }
                    >
                      <Text style={styles.sessionText}>{toSession}</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}

              {/* Reason */}
              <Text style={styles.label}>Reason</Text>
              <TextInput
                style={[styles.input, { height: 80 }]}
                multiline
                placeholder="Enter reason for leave"
                value={reason}
                onChangeText={setReason}
              />

              {/* Submit */}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
                disabled={loadingSubmit}
              >
                <Text style={styles.submitText}>
                  {loadingSubmit ? 'Applying...' : 'Apply'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <DatePicker
        modal
        open={showPicker}
        date={
            pickerMode === 'from'
              ? fromDate || new Date()
              : toDate || fromDate || new Date()
        }
        minimumDate={pickerMode === 'to' && fromDate ? fromDate : undefined}
        mode="date"
        onConfirm={date => {
            if (pickerMode === 'from') {
              const hadToDate = !!toDate;
              setFromDate(date);
              // if from session is half day, always clear To Date
              if (fromSession === 'Half Day') {
                setToDate(null);
              } else {
                // if there was no To Date set previously, initialize it to the same day
                // otherwise (user changing start after having set an end) clear To Date so user must reselect
                if (!hadToDate) setToDate(date);
                else setToDate(null);
              }
            } else {
              // selecting To Date: ensure From Date exists
              if (!fromDate) {
                Alert.alert('Please select From Date first.');
              } else {
              // ensure To Date is not before From Date
              const fromUtc = Date.UTC(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
              const selUtc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
              if (selUtc < fromUtc) {
                Alert.alert('Invalid Date', 'To date cannot be before From date.');
                setShowPicker(false);
                return;
              }
                const prospectiveCount = calculateLeaveCountForDates(
                  fromDate,
                  date,
                  fromSession,
                  toSession,
                );
                if (selectedLeave && typeof selectedLeave.balance === 'number' && prospectiveCount > selectedLeave.balance) {
                  Alert.alert('Insufficient Balance', 'You do not have enough leave balance for the selected dates.');
                } else {
                  setToDate(date);
                }
              }
            }
            setShowPicker(false);
        }}
        onCancel={() => setShowPicker(false)}
      />
    </Container>
  );
};

export default ApplyLeave;

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1 },
  formContainer: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 30 },
  label: {
    fontSize: FS.FS14,
    color: '#444',
    marginTop: 14,
    marginBottom: 6,
    fontFamily: FF[500],
  },
  dropdown: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 12,
  },
  dropdownItem: { paddingVertical: 1 },
  dropdownItemRow: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  balanceHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  balanceHeaderText: { fontSize: FS.FS13, color: '#666', fontFamily: FF[400] },
  itemBalanceText: { fontSize: FS.FS13, color: '#444', marginRight: 6, fontFamily: FF[400] },
  selectedItem: {},
  dropdownText: {
    fontSize: FS.FS15,
    color: '#222',
    marginVertical: 13,
    marginLeft: 10,
    fontFamily: FF[400],
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  dateButton: {
    flex: 0.6,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  dateText: { fontSize: 14, color: '#111' },
  sessionButton: {
    flex: 0.35,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  sessionText: { fontSize: FS.FS14, color: '#111', fontFamily: FF[400] },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFF',
    fontSize: FS.FS14,
    color: '#000',
    fontFamily: FF[400],
  },
  submitButton: {
    backgroundColor: '#000',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 30,
  },
  submitText: { color: '#FFF', fontSize: FS.FS15, fontFamily: FF[600] },
});
