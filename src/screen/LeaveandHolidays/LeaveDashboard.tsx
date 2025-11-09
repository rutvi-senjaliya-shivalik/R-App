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
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Container, HeaderComponent } from '../../components/common';
import Images from '../../constants/images';
import PrefManager from '../../utils/prefManager';
const { width } = Dimensions.get('window');
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
};

type RootStackParamList = {
  LeaveBalance: undefined;
  ApplyLeave: undefined;
};

const LeaveDashboard: React.FC = props => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleCheckBalance = (): void => {
    navigation.navigate('CheckLeaveBalance');
  };

  const handleApplyLeave = (): void => {
    navigation.navigate('ApplyLeave');
  };

  const data = [
    {
      id: '1',
      title: 'List of Leave',
      color: '#E8F3FF',
      navigate: 'LeaveListing',
    },
    {
      id: '2',
      title: 'Leave Balance',
      color: '#FFF5E5',
      navigate: 'CheckLeaveBalance',
    },
    {
      id: '3',
      title: 'Holidays',
      color: '#E8FFEF',
      navigate: 'HolidayListScreen',
    },
  ];

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.box, { backgroundColor: item.color }]}
      activeOpacity={0.8}
      onPress={() => {
        props.navigation.navigate(item.navigate);
      }}
    >
      <Text style={styles.boxText}>{item.title}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    const userData = PrefManager.getValue('userData');
    console.log(
      'User Data on Leave Dashboard:',
      PrefManager.getValue('userData'),
    );
  }, []);

  return (
    <Container>
      <HeaderComponent
        onPress={() => props.navigation.goBack()}
        Title="Leave Dashboard"
      />

      <View style={styles.listContainer}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          numColumns={2}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
        />

        <TouchableOpacity
          style={styles.applyButton}
          activeOpacity={0.8}
          onPress={handleApplyLeave}
        >
          <Text style={styles.applyButtonText}>Apply leave</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default LeaveDashboard;

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
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
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
    fontSize: 16,
    fontWeight: '600',
    color: '#121212',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
  arrow: {
    fontSize: 16,
    color: '#555',
  },
  cardContent: {
    paddingHorizontal: 15,
    paddingBottom: 12,
  },
  cardDetail: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
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
    fontSize: 14,
    fontWeight: '600',
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
    fontSize: 16,
    fontWeight: '600',
    color: '#121212',
    marginBottom: 30,
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
    fontSize: 15,
    fontWeight: '500',
    color: '#121212',
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
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  rejectionReason: {
    color: '#D32F2F',
    fontWeight: '500',
  },
});
