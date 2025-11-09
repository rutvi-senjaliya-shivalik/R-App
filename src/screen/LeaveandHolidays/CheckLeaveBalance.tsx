// // import React, { useEffect } from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   FlatList,
// //   TouchableOpacity,
// //   Image,
// // } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import { Container, HeaderComponent } from '../../components/common';
// // import Images from '../../constants/images';
// // import { leavebalanceAction } from './Actions/LeaveBalance';
// // import { useDispatch } from 'react-redux';
// // import PrefManager from '../../utils/prefManager';

// // interface LeaveBalanceItem {
// //   id: string;
// //   type: string;
// //   total: number;
// //   used: number;
// //   color: string;
// // }

// // const CheckLeaveBalance: React.FC = (props: any) => {
// //   const navigation = useNavigation();
// //   const dispatch = useDispatch() as any;

// //   const leaveBalances: LeaveBalanceItem[] = [
// //     {
// //       id: '1',
// //       type: 'Casual Leave',
// //       total: 10,
// //       used: 4,
// //       color: '#4CAF50',
// //     },
// //     {
// //       id: '2',
// //       type: 'Sick Leave',
// //       total: 8,
// //       used: 2,
// //       color: '#2196F3',
// //     },
// //     {
// //       id: '3',
// //       type: 'Earned Leave',
// //       total: 15,
// //       used: 10,
// //       color: '#FF9800',
// //     },
// //     {
// //       id: '4',
// //       type: 'Maternity Leave',
// //       total: 6,
// //       used: 0,
// //       color: '#E91E63',
// //     },
// //   ];

// //   const ApicallGetHolidaylist = async (): Promise<void> => {
// //     try {
// //       // Get user data from PrefManager
// //       const user = await PrefManager.getValue('userData');
// //       console.log('User is Employee', JSON.parse(user)._id);

// //       // Prepare payload for API call
// //       const payload = {
// //         id: JSON.parse(user)._id, // replace with dynamic ID if needed
// //       };

// //       // Dispatch action and wait for response
// //       const response = await dispatch(leavebalanceAction(payload));
// //       console.log('Leave Balance Response:', response.data.message);

// //       if (response?.status === '200') {
// //         console.log(
// //           '✅ Leave Balance Data:',
// //           JSON.stringify(response.data.message),
// //           2,
// //           null,
// //         );
// //       } else {
// //         console.log('🚨 API Error:', response?.message || 'Unknown error');
// //       }
// //     } catch (error) {
// //       console.log('🚨 Exception occurred:', error);
// //     } finally {
// //     }
// //   };

// //   useEffect(() => {
// //     ApicallGetHolidaylist();
// //   }, []);

// //   const renderLeaveBalance = ({ item }: { item: LeaveBalanceItem }) => {
// //     const percentage = (item.used / item.total) * 100;

// //     return (
// //       <View style={styles.card}>
// //         <View style={styles.headerRow}>
// //           <Text style={styles.leaveType}>{item.type}</Text>
// //           <Text style={styles.leaveCount}>
// //             {item.used}/{item.total}
// //           </Text>
// //         </View>

// //         <View style={styles.progressBarBackground}>
// //           <View
// //             style={[
// //               styles.progressBarFill,
// //               { width: `${percentage}%`, backgroundColor: item.color },
// //             ]}
// //           />
// //         </View>

// //         <Text style={styles.remainingText}>
// //           Remaining: {item.total - item.used} days
// //         </Text>
// //       </View>
// //     );
// //   };

// //   return (
// //     <Container>
// //       <HeaderComponent
// //         onPress={() => props.navigation.goBack()}
// //         Title="leave balance"
// //       />

// //       <FlatList
// //         data={leaveBalances}
// //         renderItem={renderLeaveBalance}
// //         keyExtractor={item => item.id}
// //         contentContainerStyle={styles.listContent}
// //       />
// //     </Container>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   headerContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     paddingHorizontal: 16,
// //     paddingVertical: 20,
// //   },
// //   backIcon: {
// //     width: 24,
// //     height: 24,
// //     resizeMode: 'contain',
// //     tintColor: '#000',
// //   },
// //   headerTitle: {
// //     fontSize: 18,
// //     fontWeight: '700',
// //     color: '#000',
// //     marginLeft: 12,
// //   },
// //   listContent: {
// //     paddingHorizontal: 16,
// //     paddingBottom: 100,
// //   },
// //   card: {
// //     backgroundColor: '#FFF',
// //     borderRadius: 12,
// //     padding: 16,
// //     marginBottom: 14,
// //     elevation: 3,
// //     shadowColor: '#000',
// //     shadowOpacity: 0.08,
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowRadius: 4,
// //   },
// //   headerRow: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //   },
// //   leaveType: {
// //     fontSize: 16,
// //     fontWeight: '600',
// //     color: '#1A1A1A',
// //   },
// //   leaveCount: {
// //     fontSize: 15,
// //     fontWeight: '500',
// //     color: '#555',
// //   },
// //   progressBarBackground: {
// //     height: 8,
// //     borderRadius: 4,
// //     backgroundColor: '#EEE',
// //     marginTop: 10,
// //     overflow: 'hidden',
// //   },
// //   progressBarFill: {
// //     height: 8,
// //     borderRadius: 4,
// //   },
// //   remainingText: {
// //     fontSize: 13,
// //     color: '#777',
// //     marginTop: 8,
// //   },
// //   applyButton: {
// //     position: 'absolute',
// //     bottom: 20,
// //     left: 16,
// //     right: 16,
// //     backgroundColor: '#000',
// //     borderRadius: 10,
// //     paddingVertical: 14,
// //     alignItems: 'center',
// //   },
// //   applyText: {
// //     color: '#FFF',
// //     fontSize: 15,
// //     fontWeight: '600',
// //   },
// // });

// // export default CheckLeaveBalance;
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   ActivityIndicator,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Container, HeaderComponent } from '../../components/common';
// import { useDispatch } from 'react-redux';
// import { leavebalanceAction } from './Actions/LeaveBalance';
// import PrefManager from '../../utils/prefManager';

// interface LeaveBalanceItem {
//   id: string;
//   type: string;
//   total: number;
//   used: number;
//   color: string;
// }

// const COLORS = ['#4CAF50', '#2196F3', '#FF9800', '#E91E63', '#9C27B0'];

// const CheckLeaveBalance: React.FC = (props: any) => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch() as any;

//   const [leaveBalances, setLeaveBalances] = useState<LeaveBalanceItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   const ApicallGetHolidaylist = async (): Promise<void> => {
//     try {
//       setLoading(true);

//       // Get user data
//       const user = await PrefManager.getValue('userData');
//       const employeeId = JSON.parse(user)._id;

//       const payload = { id: employeeId };
//       const response = await dispatch(leavebalanceAction(payload));

//       if (response?.status === '200') {
//         const apiData = response.data.message;

//         // Map API data to our LeaveBalanceItem format
//         const mappedData: LeaveBalanceItem[] = apiData.map(
//           (item: any, index: number) => ({
//             id: item._id,
//             type: item.leave_type_id?.name || 'Leave',
//             total: item.total_leaves,
//             used: item.used_leaves,
//             color: COLORS[index % COLORS.length],
//           }),
//         );

//         setLeaveBalances(mappedData);
//       } else {
//         console.log('🚨 API Error:', response?.message || 'Unknown error');
//       }
//     } catch (error) {
//       console.log('🚨 Exception occurred:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     ApicallGetHolidaylist();
//   }, []);

//   const renderLeaveBalance = ({ item }: { item: LeaveBalanceItem }) => {
//     const percentage = (item.used / item.total) * 100;

//     return (
//       <View style={styles.card}>
//         <View style={styles.headerRow}>
//           <Text style={styles.leaveType}>{item.type}</Text>
//           <Text style={styles.leaveCount}>
//             {item.used}/{item.total}
//           </Text>
//         </View>

//         <View style={styles.progressBarBackground}>
//           <View
//             style={[
//               styles.progressBarFill,
//               { width: `${percentage}%`, backgroundColor: item.color },
//             ]}
//           />
//         </View>

//         <Text style={styles.remainingText}>
//           Remaining: {item.total - item.used} days
//         </Text>
//       </View>
//     );
//   };

//   if (loading) {
//     return (
//       <Container>
//         <HeaderComponent
//           onPress={() => props.navigation.goBack()}
//           Title="Leave Balance"
//         />
//         <View
//           style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
//         >
//           <ActivityIndicator size="large" color="#000" />
//         </View>
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <HeaderComponent
//         onPress={() => props.navigation.goBack()}
//         Title="Leave Balance"
//       />

//       <FlatList
//         data={leaveBalances}
//         renderItem={renderLeaveBalance}
//         keyExtractor={item => item.id}
//         contentContainerStyle={styles.listContent}
//       />
//     </Container>
//   );
// };

// const styles = StyleSheet.create({
//   listContent: {
//     paddingHorizontal: 16,
//     paddingBottom: 100,
//   },
//   card: {
//     backgroundColor: '#FFF',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 14,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOpacity: 0.08,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   leaveType: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1A1A1A',
//   },
//   leaveCount: {
//     fontSize: 15,
//     fontWeight: '500',
//     color: '#555',
//   },
//   progressBarBackground: {
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#EEE',
//     marginTop: 10,
//     overflow: 'hidden',
//   },
//   progressBarFill: {
//     height: 8,
//     borderRadius: 4,
//   },
//   remainingText: {
//     fontSize: 13,
//     color: '#777',
//     marginTop: 8,
//   },
// });

// export default CheckLeaveBalance;

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, HeaderComponent } from '../../components/common';
import { useDispatch } from 'react-redux';
import { leavebalanceAction } from './Actions/LeaveBalance';
import PrefManager from '../../utils/prefManager';

interface LeaveBalanceItem {
  id: string;
  type: string;
  total: number;
  used: number;
  color: string;
}

const COLORS = ['#4CAF50', '#2196F3', '#FF9800', '#E91E63', '#9C27B0'];

const CheckLeaveBalance: React.FC = (props: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch() as any;

  const [leaveBalances, setLeaveBalances] = useState<LeaveBalanceItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchLeaveBalances = async () => {
    try {
      setLoading(true);

      // Get employee data
      const user = await PrefManager.getValue('userData');
      const employeeId = JSON.parse(user)?._id;

      if (!employeeId) {
        console.log('🚨 Employee ID not found');
        setLoading(false);
        return;
      }

      const payload = { id: employeeId };
      const response = await dispatch(leavebalanceAction(payload));

      // Make sure we are accessing the right field
      const apiData = response?.data?.message;
      if (Array.isArray(apiData) && apiData.length > 0) {
        const mappedData: LeaveBalanceItem[] = apiData.map(
          (item: any, index: number) => ({
            id: item._id,
            type: item.leave_type_id?.name || 'Leave',
            total: item.total_leaves ?? 0,
            used: item.used_leaves ?? 0,
            color: COLORS[index % COLORS.length],
          }),
        );
        console.log('✅ Mapped Leave Balances:', mappedData);
        setLeaveBalances(mappedData);
      } else {
        console.log('🚨 No leave balance data found');
        setLeaveBalances([]);
      }
    } catch (error) {
      console.log('🚨 Error fetching leave balances:', error);
      setLeaveBalances([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveBalances();
  }, []);

  const renderLeaveBalance = ({ item }: { item: LeaveBalanceItem }) => {
    const percentage = item.total > 0 ? (item.used / item.total) * 100 : 0;

    return (
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.leaveType}>{item.type}</Text>
          <Text style={styles.leaveCount}>
            {item.used}/{item.total}
          </Text>
        </View>

        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${percentage}%`, backgroundColor: item.color },
            ]}
          />
        </View>

        <Text style={styles.remainingText}>
          Remaining: {item.total - item.used} days
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <Container>
        <HeaderComponent
          onPress={() => props.navigation.goBack()}
          Title="Leave Balance"
        />
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#000" />
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <HeaderComponent
        onPress={() => props.navigation.goBack()}
        Title="Leave Balance"
      />

      {leaveBalances.length > 0 ? (
        <FlatList
          data={leaveBalances}
          renderItem={renderLeaveBalance}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
          }}
        >
          <Text style={{ fontSize: 16, color: '#777' }}>
            No leave data available.
          </Text>
        </View>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leaveType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  leaveCount: {
    fontSize: 15,
    fontWeight: '500',
    color: '#555',
  },
  progressBarBackground: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EEE',
    marginTop: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 8,
    borderRadius: 4,
  },
  remainingText: {
    fontSize: 13,
    color: '#777',
    marginTop: 8,
  },
});

export default CheckLeaveBalance;
