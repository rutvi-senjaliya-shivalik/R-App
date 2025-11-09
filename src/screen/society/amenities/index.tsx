import React, { useCallback, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  Container,
  HeaderComponent,
  CustomButton,
  Icon,
} from '../../../components/common';
import { amenitiesStyles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getAmenitiesList } from '../../../store/actions/society/amenitiesListAction';
import { AmenitiesDataModel } from '../../../types/models';
import { selectAmenitiesData } from '../../../store/selectors/amenities';
import { COLORS } from '../../../constants';

const AmenitiesScreen = ({ navigation }: any) => {
  const dispatch = useDispatch() as any;

  const { loading, amenitiesData, error } = useSelector(selectAmenitiesData);

  const fetchAmenities = useCallback(async () => {
    try {
      await dispatch(getAmenitiesList());
    } catch (err: any) {
      console.log('Error fetching amenities:', err);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchAmenities();
  }, [fetchAmenities]);

  const handleAmenityPress = useCallback(
    (amenity: AmenitiesDataModel) => {
      navigation.navigate('AmenitiesBooking', { amenity });
    },
    [navigation],
  );

  const handleRecentBookings = useCallback(() => {
    navigation.navigate('RecentBookings');
  }, [navigation]);

  const renderAmenity = useCallback(
    ({ item }: { item: AmenitiesDataModel }) => (
      <TouchableOpacity
        style={amenitiesStyles.amenityCard}
        activeOpacity={0.7}
        onPress={() => handleAmenityPress(item)}
      >
        <View style={amenitiesStyles.amenityInfo}>
          <Text style={amenitiesStyles.amenityName}>{item?.name}</Text>
          {item?.description && (
            <Text style={amenitiesStyles.amenityDescription}>
              {item?.description}
            </Text>
          )}
        </View>
        <Icon name={'arrow-right-ic'} styles={amenitiesStyles.arrowIcon} />
      </TouchableOpacity>
    ),
    [handleAmenityPress],
  );

  const keyExtractor = useCallback((item: AmenitiesDataModel) => item?._id, []);

  return (
    <Container>
      <View style={amenitiesStyles.container}>
        <HeaderComponent
          Title="Amenities"
          onPress={() => navigation.goBack()}
        />
        {loading ? (
          <View style={amenitiesStyles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.BLUE_TEXT} />
            <Text style={amenitiesStyles.loadingText}>
              Loading amenities...
            </Text>
          </View>
        ) : (
          <>
            <View style={amenitiesStyles.contentWrapper}>
              <FlatList
                data={amenitiesData}
                keyExtractor={keyExtractor}
                renderItem={renderAmenity}
                contentContainerStyle={amenitiesStyles.listContent}
                showsVerticalScrollIndicator={false}
              />
            </View>
            <View style={amenitiesStyles.recentBookingsButton}>
              <CustomButton
                title="Recent Bookings"
                onPress={handleRecentBookings}
              />
            </View>
          </>
        )}
      </View>
    </Container>
  );
};

export default AmenitiesScreen;
