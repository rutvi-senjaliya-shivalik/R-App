import React, { useState, useCallback, useMemo } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { Container, HeaderComponent, CustomButton } from '../../../components/common';
import { complaintsStyles } from './styles';
import { COLORS } from '../../../constants';

type ComplaintStatus = 'pending' | 'in-progress' | 'resolved' | 'closed';

interface Complaint {
  id: string;
  type: string;
  title: string;
  description: string;
  status: ComplaintStatus;
  date: string;
}

const ComplaintsScreen = ({ navigation }: any) => {
  const [complaints] = useState<Complaint[]>([
    {
      id: '1',
      type: 'Parking',
      title: 'Unauthorized parking in my slot',
      description: 'Someone has parked their car in my designated parking slot.',
      status: 'pending',
      date: '2024-01-15',
    },
    {
      id: '2',
      type: 'Maintenance',
      title: 'Water leakage in bathroom',
      description: 'There is continuous water leakage from the bathroom ceiling.',
      status: 'in-progress',
      date: '2024-01-14',
    },
    {
      id: '3',
      type: 'Cleanliness',
      title: 'Garbage not collected',
      description: 'Garbage has not been collected for 3 days near lift lobby.',
      status: 'resolved',
      date: '2024-01-13',
    },
    {
      id: '4',
      type: 'Electricity',
      title: 'Power outage in corridor',
      description: 'The corridor lights on 3rd floor are not working.',
      status: 'pending',
      date: '2024-01-12',
    },
  ]);

  const getStatusColor = useCallback((status: ComplaintStatus) => {
    switch (status) {
      case 'pending':
        return COLORS.ORANGE || '#FF9800';
      case 'in-progress':
        return COLORS.BLUE_TEXT || '#2196F3';
      case 'resolved':
        return COLORS.GREEN || '#4CAF50';
      case 'closed':
        return COLORS.GREY_TEXT || '#9E9E9E';
      default:
        return COLORS.GREY_TEXT || '#9E9E9E';
    }
  }, []);

  const getStatusText = useCallback((status: ComplaintStatus) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
  }, []);

  const handleAddComplaint = useCallback(() => {
    navigation.navigate('AddComplaint');
  }, [navigation]);

  const renderItem = useCallback(
    ({ item }: { item: Complaint }) => {
      return (
        <TouchableOpacity style={complaintsStyles.card} activeOpacity={0.7}>
          <View style={complaintsStyles.cardHeader}>
            <View style={complaintsStyles.typeContainer}>
              <Text style={complaintsStyles.typeText}>{item.type}</Text>
            </View>
            <View
              style={[
                complaintsStyles.statusBadge,
                { backgroundColor: getStatusColor(item.status) },
              ]}
            >
              <Text style={complaintsStyles.statusText}>
                {getStatusText(item.status)}
              </Text>
            </View>
          </View>
          <Text style={complaintsStyles.title}>{item.title}</Text>
          <Text style={complaintsStyles.description} numberOfLines={2}>
            {item.description}
          </Text>
          <Text style={complaintsStyles.date}>{item.date}</Text>
        </TouchableOpacity>
      );
    },
    [getStatusColor, getStatusText],
  );

  const renderEmptyComponent = useMemo(
    () => (
      <View style={complaintsStyles.emptyContainer}>
        <Text style={complaintsStyles.emptyText}>No complaints found</Text>
        <Text style={complaintsStyles.emptySubText}>
          Tap the button below to create a new complaint
        </Text>
      </View>
    ),
    [],
  );

  return (
    <Container>
      <View style={complaintsStyles.container}>
        <HeaderComponent
          Title="Complaints"
          onPress={() => navigation.goBack()}
        />
        <View style={complaintsStyles.contentWrapper}>
          <FlatList
            data={complaints}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListEmptyComponent={renderEmptyComponent}
            contentContainerStyle={complaintsStyles.listContent}
            showsVerticalScrollIndicator={false}
          />
          <View style={complaintsStyles.buttonWrapper}>
            <CustomButton
              title="Add New Complaint"
              onPress={handleAddComplaint}
            />
          </View>
        </View>
      </View>
    </Container>
  );
};

export default ComplaintsScreen;

