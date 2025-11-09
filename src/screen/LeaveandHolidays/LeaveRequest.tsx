import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Container, HeaderComponent } from '../../components/common';
import PrefManager from '../../utils/prefManager';
import { useDispatch } from 'react-redux';
import { managerleavereqAction } from './Actions/ManagerLeaveRequests';
import { approveLeaveAction, rejectLeaveAction } from './Actions/ApproveRejectLeave';
import { FS, FF } from '../../constants/fonts';

// --- Static Leave Request Data ---
const initialLeaveRequests: any[] = [];

const LeaveRequest = (props: any) => {
  const [requests, setRequests] = useState(initialLeaveRequests);
  const dispatch = useDispatch() as any;
  const [rejectModal, setRejectModal] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const inputRef = useRef<TextInput>(null);

  // ✅ Approve Leave - call API then remove from list
  const handleApprove = async (id: string) => {
    try { 
      const user = await PrefManager.getValue('userData');
      const userId = JSON.parse(user)?._id;
      const payload = { request_id: id, id: userId };
      const response = await dispatch(approveLeaveAction(payload));

      const ok = response?.status === 200 || response?.status === '200' || response?.data?.status === 200 || response?.data?.status === '200';
      if (ok) {
        Alert.alert('Leave Approved', `Request ID: ${id}`);
        setRequests(prev => prev.filter(req => req.id !== id));
      } else {
        const msg = response?.data?.message || response?.message || 'Failed to approve leave';
        Alert.alert('Error', msg);
      }
    } catch (error: any) {
      console.log('Approve API error', error);
      Alert.alert('Error', error?.message || 'Failed to approve leave');
    }
  };

  // ✅ Reject Leave - open modal & auto focus input
  const handleReject = (id: string) => {
    setSelectedId(id);
    setRejectModal(true);
    setTimeout(() => inputRef.current?.focus(), 300);
  };

  // ✅ Confirm Rejection
  const confirmReject = async () => {
    if (!rejectReason.trim()) {
      Alert.alert('Please enter a reason for rejection.');
      return;
    }

    try {
      const user = await PrefManager.getValue('userData');
      const userId = JSON.parse(user)?._id;
      const payload = {id: userId, request_id: selectedId, rejection_reason: rejectReason };
      const response = await dispatch(rejectLeaveAction(payload));

      const ok = response?.status === 200 || response?.status === '200' || response?.data?.status === 200 || response?.data?.status === '200';
      if (ok) {
        Alert.alert('Leave Rejected', `Reason: ${rejectReason}`);
        setRequests(prev => prev.filter(req => req.id !== selectedId));
        setRejectModal(false);
        setRejectReason('');
      } else {
        const msg = response?.data?.message || response?.message || 'Failed to reject leave';
        Alert.alert('Error', msg);
      }
    } catch (error: any) {
      console.log('Reject API error', error);
      Alert.alert('Error', error?.message || 'Failed to reject leave');
    }
  };

  // ✅ Helper: format date properly
  const renderDateRange = (item: any) => {
    const { fromDate, toDate, halfDay } = item;

    // same date case
    if (fromDate === toDate) {
      const dateLabel = halfDay === fromDate ? `${fromDate} (Half)` : fromDate;
      return dateLabel;
    }

    // range case
    const fromLabel = halfDay === fromDate ? `${fromDate} (Half)` : fromDate;
    const toLabel = halfDay === toDate ? `${toDate} (Half)` : toDate;
    return `${fromLabel} → ${toLabel}`;
  };

  // ✅ Fetch manager leave requests from API and map to local shape
  const fetchManagerRequests = async (status?: 'Pending' | 'Approved' | 'Rejected') => {
    try {
      const user = await PrefManager.getValue('userData');
      const userId = JSON.parse(user)?._id;
      if (!userId) return;

      const payload: any = { id: userId };
      if (status) payload.status = status;

      const response = await dispatch(managerleavereqAction(payload));
      const respData = response?.data || response || {};
      const messages = respData.message || [];

      if (Array.isArray(messages) && messages.length > 0) {
        const mapped = messages.map((item: any) => ({
          id: item._id || item.id || String(Math.random()),
          type: item.leave_type_id?.name || item.leave_type || 'Leave',
          fromDate: item.from_date
            ? new Date(item.from_date).toLocaleDateString('en-GB')
            : item.fromDate || '',
          toDate: item.to_date
            ? new Date(item.to_date).toLocaleDateString('en-GB')
            : item.toDate || '',
          applier: item.employee_id?.name || item.employee_name || '',
          // prefer phone/mobile, fall back to email
          contact:
            item.employee_id?.phone || item.employee_id?.mobile || item.employee_id?.email || item.contact || '',
          reason: item.reason || '',
          attachment: !!item.attachment || false,
          // preserve numeric leave_taken and derive halfDay flag
          leaveTaken: item.leave_taken ?? item.leaveTaken ?? undefined,
          halfDay:
            (item.leave_taken === 0.5 || item.leaveTaken === 0.5)
              ? (item.from_date ? new Date(item.from_date).toLocaleDateString('en-GB') : item.halfDay || undefined)
              : item.halfDay || undefined,
        }));

        setRequests(mapped);
      } else {
        setRequests([]);
      }
    } catch (error) {
      console.log('🚨 Exception occurred while fetching manager requests:', error);
    }
  };

  useEffect(() => {
    // fetch all pending by default
    fetchManagerRequests('Pending');
  }, []);

  return (
    <Container>
      <HeaderComponent
        onPress={() => props.navigation.goBack()}
        Title="Leave Requests"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
      >
        {requests.length === 0 ? (
          <Text style={styles.emptyText}>No pending leave requests 🎉</Text>
        ) : (
          requests.map(item => (
            <View key={item.id} style={styles.card}>
              <View style={styles.rowBetween}>
                <Text style={styles.leaveType}>{item.type}</Text>
                <Text style={styles.dates}>{renderDateRange(item)}</Text>
              </View>

              <View style={styles.separator} />

              <View style={styles.detailRow}>
                <Text style={styles.label}>Applier:</Text>
                <Text style={styles.value}>{item.applier}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.label}>Contact:</Text>
                <Text style={styles.value}>{item.contact}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.label}>Reason:</Text>
                <Text style={styles.value}>{item.reason}</Text>
              </View>

              {item.leaveTaken !== undefined && (
                <View style={styles.detailRow}>
                  <Text style={styles.label}>Days:</Text>
                  <Text style={styles.value}>{item.leaveTaken}</Text>
                </View>
              )}

              {item.attachment && (
                <TouchableOpacity style={styles.attachmentButton}>
                  <Text style={styles.attachmentText}>📎 View Attachment</Text>
                </TouchableOpacity>
              )}

              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={[styles.btn, styles.approveBtn]}
                  onPress={() => handleApprove(item.id)}
                >
                  <Text style={styles.btnText}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btn, styles.rejectBtn]}
                  onPress={() => handleReject(item.id)}
                >
                  <Text style={styles.btnText}>Reject</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Reject Modal */}
      <Modal
        visible={rejectModal}
        transparent
        animationType="fade"
        onRequestClose={() => setRejectModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reject Leave</Text>
            <TextInput
              ref={inputRef}
              placeholder="Enter reason for rejection"
              placeholderTextColor="#999"
              value={rejectReason}
              onChangeText={setRejectReason}
              multiline
              style={styles.input}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#E0E0E0' }]}
                onPress={() => setRejectModal(false)}
              >
                <Text style={[styles.modalBtnText, { color: '#333' }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#E53935' }]}
                onPress={confirmReject}
              >
                <Text style={styles.modalBtnText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#F8F8F8',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leaveType: {
    fontSize: FS.FS16,
    color: '#1A1A1A',
    fontFamily: FF[600],
  },
  dates: {
    fontSize: FS.FS13,
    color: '#555',
    fontFamily: FF[400],
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  detailRow: {
    flexDirection: 'row',
    marginVertical: 3,
  },
  label: {
    fontSize: FS.FS14,
    color: '#555',
    width: 90,
    fontFamily: FF[500],
  },
  value: {
    flex: 1,
    fontSize: FS.FS14,
    color: '#000',
    fontFamily: FF[400],
  },
  attachmentButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#EAEAEA',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  attachmentText: {
    fontSize: FS.FS13,
    color: '#000',
    fontFamily: FF[400],
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 10,
  },
  approveBtn: {
    backgroundColor: '#4CAF50',
  },
  rejectBtn: {
    backgroundColor: '#E53935',
  },
  btnText: {
    color: '#FFF',
    fontSize: FS.FS14,
    fontFamily: FF[600],
  },
  emptyText: {
    textAlign: 'center',
    color: '#555',
    marginTop: 40,
    fontSize: FS.FS15,
    fontFamily: FF[400],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 24,
    bottom: 80,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 18,
  },
  modalTitle: {
    fontSize: FS.FS18,
    color: '#000',
    marginBottom: 10,
    fontFamily: FF[700],
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    minHeight: 80,
    color: '#000',
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  modalBtn: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginLeft: 10,
  },
  modalBtnText: {
    color: '#FFF',
    fontFamily: FF[600],
  },
});

export default LeaveRequest;
