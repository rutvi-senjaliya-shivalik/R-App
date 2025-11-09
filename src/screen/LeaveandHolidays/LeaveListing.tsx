import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager,
  Alert,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Container, HeaderComponent } from '../../components/common';
import Images from '../../constants/images';
import PrefManager from '../../utils/prefManager';
import { FS, FF } from '../../constants/fonts';
const { width } = Dimensions.get('window');
import { useDispatch } from 'react-redux';
import { myleavereqAction } from './Actions/ListofleaveAction';
const BOX_SIZE = (width - 48) / 2; // 16px padding + 16px gap + 16px padding

// Enable animation on Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type LeaveStatus = 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';

type LeaveItem = {
  id: string;
  type: string;
  reason: string;
  fromDate: string;
  toDate: string;
  status: LeaveStatus;
  rejectionReason: string;
  leaveTaken?: number | string;
};

type RootStackParamList = {
  LeaveBalance: undefined;
  ApplyLeave: undefined;
};

const LeaveListing: React.FC = props => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // 🧩 Example Data (replace with API data)
  const [leaveData, setLeaveData] = useState<LeaveItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch() as any;
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggleExpand = (id: string): void => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(prev => (prev === id ? null : id));
  };

  const handleCancelLeave = (id: string): void => {
    Alert.alert('Cancel Leave', 'Are you sure you want to cancel this leave?', [
      { text: 'No', style: 'cancel' },
      {
        text: 'Yes, Cancel',
        onPress: () => {
          setLeaveData(prev =>
            prev.map(item =>
              item.id === id ? { ...item, status: 'Cancelled' } : item,
            ),
          );
        },
      },
    ]);
  };

  const getStatusColor = (status: LeaveStatus): string => {
    switch (status) {
      case 'Approved':
        return '#1BAA6F';
      case 'Pending':
        return '#F5A623';
      case 'Rejected':
        return '#E74C3C';
      case 'Cancelled':
        return '#9E9E9E';
      default:
        return '#121212';
    }
  };

  const renderLeaveItem = ({ item }: { item: LeaveItem }) => {
    const isExpanded = expandedId === item.id;
    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.cardHeader}
          activeOpacity={0.8}
          onPress={() => handleToggleExpand(item.id)}
        >
          <View>
            <Text style={styles.cardTitle}>{item.type}</Text>
            <Text
              style={[
                styles.statusText,
                { color: getStatusColor(item.status) },
              ]}
            >
              {item.status}
            </Text>
          </View>
          <Text style={styles.arrow}>{isExpanded ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.cardContent}>
            {item.status === 'Rejected' && item.rejectionReason && (
              <Text style={[styles.detailText, styles.rejectionReason]}>
                Rejection Reason: {item.rejectionReason}
              </Text>
            )}
            <Text style={styles.cardDetail}>Reason: {item.reason}</Text>
            <Text style={styles.cardDetail}>
              From: {item.fromDate} — To: {item.toDate}
            </Text>
            {item.leaveTaken !== undefined && (
              <Text style={styles.cardDetail}>Days: {item.leaveTaken}</Text>
            )}

            {item.status === 'Pending' && (
              <TouchableOpacity
                style={styles.cancelButton}
                activeOpacity={0.8}
                onPress={() => handleCancelLeave(item.id)}
              >
                <Text style={styles.cancelButtonText}>Cancel Leave</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  };

  const fetchLeaveBalances = async () => {
    setLoading(true);
    try {
      const user = await PrefManager.getValue('userData');
      console.log('User is Employee', JSON.parse(user)._id);

      // Prepare payload for API call
      const payload = {
        id: JSON.parse(user)._id, // replace with dynamic ID if needed
      };
      const response = await dispatch(myleavereqAction(payload));
      console.log('Leave Request Response:', response?.data || response);

      const respData = response?.data || response || {};
      const messages = respData.message || [];

      if (Array.isArray(messages) && messages.length > 0) {
        const mapped: LeaveItem[] = messages.map((item: any) => ({
          id: item._id || item.id || String(Math.random()),
          type: item.leave_type_id?.name || item.leave_type || 'Leave',
          reason: item.reason || '',
          fromDate: item.from_date
            ? new Date(item.from_date).toLocaleDateString('en-GB')
            : '',
          toDate: item.to_date
            ? new Date(item.to_date).toLocaleDateString('en-GB')
            : '',
          status: (item.status as LeaveStatus) || 'Pending',
          rejectionReason:
            item.rejectionReason || item.rejection_reason || '',
          leaveTaken: item.leave_taken ?? item.leaveTaken ?? '',
        }));

        setLeaveData(mapped);
      } else {
        // If no message array, clear list
        setLeaveData([]);
      }
    } catch (error) {
      console.log('🚨 Exception occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveBalances();
  }, []);

  return (
    <Container>
      <HeaderComponent
        onPress={() => props.navigation.goBack()}
        Title="List of leave"
      />

      <View style={styles.listContainer}>
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : (
          <FlatList
            data={leaveData}
            keyExtractor={item => item.id}
            renderItem={renderLeaveItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 20,
              flexGrow: leaveData.length === 0 ? 1 : 0,
            }}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <View style={styles.iconCircle}>
                  {/* <Image
                    source={Images.docIcon}
                    style={styles.icon}
                    resizeMode="contain"
                  /> */}
                </View>

                <Text style={styles.infoText}>You haven't applied any leave</Text>
              </View>
            )}
          />
        )}
      </View>
    </Container>
  );
};

export default LeaveListing;

const styles = StyleSheet.create({
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  boxText: {
    fontSize: FS.FS16,
    color: '#1A1A1A',
    textAlign: 'center',
    fontFamily: FF[600],
  },
  listContainer: {
    flex: 1,

    paddingTop: 10,
  },
  card: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFF',
    marginBottom: 12,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  cardTitle: {
    fontSize: FS.FS16,
    color: '#121212',
    fontFamily: FF[600],
  },
  statusText: {
    fontSize: FS.FS14,
    marginTop: 4,
    fontFamily: FF[500],
  },
  arrow: {
    fontSize: FS.FS16,
    color: '#555',
  },
  cardContent: {
    paddingHorizontal: 15,
    paddingBottom: 12,
  },
  cardDetail: {
    fontSize: FS.FS14,
    color: '#444',
    marginTop: 4,
    fontFamily: FF[400],
  },
  cancelButton: {
    marginTop: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E74C3C',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  cancelButtonText: {
    color: '#E74C3C',
    fontSize: FS.FS14,
    fontFamily: FF[600],
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  iconCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#F2F3F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  icon: {
    width: 60,
    height: 60,
    tintColor: '#121212',
  },
  infoText: {
    fontSize: FS.FS16,
    color: '#121212',
    marginBottom: 30,
    fontFamily: FF[600],
  },
  checkButton: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E3E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  checkButtonText: {
    fontSize: FS.FS15,
    color: '#121212',
    fontFamily: FF[500],
  },
  applyButton: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    fontSize: FS.FS15,
    color: '#fff',
    fontFamily: FF[600],
  },
  detailText: {
    fontSize: FS.FS14,
    color: '#555',
    marginTop: 4,
    fontFamily: FF[400],
  },
  rejectionReason: {
    color: '#D32F2F',
    fontFamily: FF[500],
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
});
