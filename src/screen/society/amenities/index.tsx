import React, { useCallback, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Container, HeaderComponent, CustomButton } from '../../../components/common';
import { amenitiesStyles } from './styles';

type Amenity = {
  id: string;
  name: string;
  description: string;
};

const AmenitiesScreen = ({ navigation }: any) => {
  const amenitiesList: Amenity[] = useMemo(
    () => [
      { id: '1', name: 'Club House', description: 'Modern clubhouse with entertainment facilities' },
      { id: '2', name: 'GYM', description: 'Fully equipped fitness center with modern equipment' },
      { id: '3', name: 'Swimming Pool', description: 'Olympic-size swimming pool with separate kids area' },
      { id: '4', name: 'Community Hall', description: 'Spacious hall for events and gatherings' },
      { id: '5', name: 'Tennis Court', description: 'Professional tennis court with night lighting' },
      { id: '6', name: 'Kids Play Area', description: 'Safe and fun play area for children' },
      { id: '7', name: 'Yoga Room', description: 'Peaceful room for yoga and meditation' },
      { id: '8', name: 'Party Lawn', description: 'Beautiful outdoor space for celebrations' },
    ],
    [],
  );

  const handleAmenityPress = useCallback(
    (amenity: Amenity) => {
      navigation.navigate('AmenitiesBooking', { amenity });
    },
    [navigation],
  );

  const handleRecentBookings = useCallback(() => {
    navigation.navigate('RecentBookings');
  }, [navigation]);

  const renderAmenity = useCallback(
    ({ item }: { item: Amenity }) => (
      <TouchableOpacity
        style={amenitiesStyles.amenityCard}
        activeOpacity={0.7}
        onPress={() => handleAmenityPress(item)}
      >
        <Text style={amenitiesStyles.amenityName}>{item.name}</Text>
        <Text style={amenitiesStyles.amenityDescription}>{item.description}</Text>
      </TouchableOpacity>
    ),
    [handleAmenityPress],
  );

  const keyExtractor = useCallback((item: Amenity) => item.id, []);

  return (
    <Container>
      <View style={amenitiesStyles.container}>
        <HeaderComponent Title="Amenities" onPress={() => navigation.goBack()} />
        <View style={amenitiesStyles.contentWrapper}>
          <FlatList
            data={amenitiesList}
            keyExtractor={keyExtractor}
            renderItem={renderAmenity}
            contentContainerStyle={amenitiesStyles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={amenitiesStyles.recentBookingsButton}>
          <CustomButton title="Recent Bookings" onPress={handleRecentBookings} />
        </View>
      </View>
    </Container>
  );
};

export default AmenitiesScreen;


