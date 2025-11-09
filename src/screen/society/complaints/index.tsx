import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  HeaderComponent,
  CustomButton,
} from '../../../components/common';
import { complaintsStyles } from './styles';
import { COLORS } from '../../../constants';
import { getComplaintsListAction } from '../../../store/actions/society/complaintsListAction';
import { ComplainDataModel } from '../../../types/models';

const ComplaintsScreen = ({ navigation }: any) => {
  const dispatch = useDispatch() as any;
  const { loading, complaintsData, error } = useSelector(
    (state: any) => state.complaints,
  );
  console.log('complaintsData::::--->', complaintsData);

  useEffect(() => {
    fetchComplaints();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchComplaints = useCallback(async () => {
    try {
      await dispatch(getComplaintsListAction());
    } catch (err: any) {
      console.log('Error fetching complaints:', err);
    }
  }, [dispatch]);

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'pending':
        return COLORS?.ORANGE || '#FF9800';
      case 'in-progress':
        return COLORS?.BLUE_TEXT || '#2196F3';
      case 'resolved':
        return COLORS?.GREEN || '#4CAF50';
      case 'closed':
        return COLORS?.GREY_TEXT || '#9E9E9E';
      default:
        return COLORS?.GREY_TEXT || '#9E9E9E';
    }
  }, []);

  const getStatusText = useCallback((status: string) => {
    return status?.charAt(0).toUpperCase() + status?.slice(1).replace('-', ' ');
  }, []);

  const handleAddComplaint = useCallback(() => {
    navigation.navigate('AddComplaint', {
      onCallback: () => {
        fetchComplaints();
      },
    });
  }, [fetchComplaints, navigation]);

  const renderItem = useCallback(
    ({ item }: { item: ComplainDataModel }) => {
      return (
        <TouchableOpacity style={complaintsStyles.card} activeOpacity={0.7}>
          <View style={complaintsStyles.cardHeader}>
            <View style={complaintsStyles.typeContainer}>
              <Text style={complaintsStyles.typeText}>{item?.type}</Text>
            </View>
            <View
              style={[
                complaintsStyles.statusBadge,
                { backgroundColor: getStatusColor(item?.status) },
              ]}
            >
              <Text style={complaintsStyles.statusText}>
                {getStatusText(item?.status)}
              </Text>
            </View>
          </View>
          <Text style={complaintsStyles.title}>{item?.title}</Text>
          <Text style={complaintsStyles.description} numberOfLines={2}>
            {item?.description}
          </Text>
          <Text style={complaintsStyles.date}>{item?.createdAt}</Text>
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
          {loading ? (
            <View style={complaintsStyles.loadingContainer}>
              <ActivityIndicator size="large" color={COLORS.BLUE_TEXT} />
              <Text style={complaintsStyles.loadingText}>
                Loading complaints...
              </Text>
            </View>
          ) : (
            <FlatList
              data={complaintsData}
              keyExtractor={item => item?.id}
              renderItem={renderItem}
              ListEmptyComponent={renderEmptyComponent}
              contentContainerStyle={complaintsStyles.listContent}
              showsVerticalScrollIndicator={false}
            />
          )}
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
