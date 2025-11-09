import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  Container,
  HeaderComponent,
  SearchInput,
} from '../../../components/common';
import AmenitiesListStyles from './styles/amenitiesListStyles';
import { COLORS } from '../../../constants';
import { useTranslation } from '../../../context/LanguageContext';
import { SMART_SOCIETY_ROUTES } from '../../../navigation/routes/smartSocietyRoutes';
import { useDispatch } from 'react-redux';
import { getAmenitiesListAction } from '../../../store/actions/smartSociety/getAmenitiesListAction';

interface Amenity {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  capacity: number;
  hourlyRate?: number;
  isActive: boolean;
}

const AmenitiesList = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isMountedRef = useRef(true);
  const selectedRole = props.route?.params?.selectedRole;
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    isMountedRef.current = true;
    loadAmenities();
    return () => {
      isMountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadAmenities = async () => {
    if (!isMountedRef.current) return;

    try {
      setLoading(true);
      const response = await dispatch(getAmenitiesListAction() as any);

      console.log('📦 API Response:', response?.data);

      if (response?.data) {
        // API response structure: { success: true, message: '...', data: [...], meta: {...} }
        const responseData = response.data;
        const amenitiesData = responseData?.data || [];

        console.log('📋 Amenities data array:', amenitiesData.length, 'items');

        // Map API response to component format
        const mappedAmenities: Amenity[] = amenitiesData.map((item: any) => {
          // Get image from primaryImage or first image in images array
          let imageUrl: string | undefined;
          if (item.primaryImage) {
            imageUrl = item.primaryImage;
          } else if (item.images && item.images.length > 0) {
            imageUrl = item.images[0];
          }

          return {
            id: item._id || item.id || '',
            name: item.amenityName || item.name || '',
            description: item.description || '',
            imageUrl,
            capacity: item.maxCapacity || item.capacity || 0,
            hourlyRate: item.hourlyRate || item.rate || undefined,
            isActive:
              item.status === 'ACTIVE' ||
              item.availabilityStatus === 'Available' ||
              item.isActive === true,
          };
        });

        console.log('✅ Mapped amenities:', mappedAmenities.length, 'items');

        if (isMountedRef.current) {
          // Filter only active amenities
          const activeAmenities = mappedAmenities.filter(a => a.isActive);
          setAmenities(activeAmenities);
          console.log('✅ Active amenities set:', activeAmenities.length);
        }
      } else {
        console.warn('⚠️ No data in API response');
        if (isMountedRef.current) {
          setAmenities([]);
        }
      }
    } catch (error: any) {
      console.error('Error loading amenities:', error);
      if (isMountedRef.current) {
        let errorMessage =
          t('smartSociety.failedToLoadAmenities') ||
          'Failed to load amenities. Please try again.';

        // Provide more specific error messages
        if (error?.isNetworkError) {
          errorMessage =
            t('smartSociety.networkError') ||
            'Network error. Please check your internet connection and try again.';
        } else if (error?.response?.status === 401) {
          errorMessage =
            t('smartSociety.unauthorizedError') ||
            'Unauthorized. Please login again.';
        } else if (error?.response?.status === 404) {
          errorMessage =
            t('smartSociety.notFoundError') || 'Amenities not found.';
        } else if (error?.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error?.message) {
          errorMessage = error.message;
        }

        Alert.alert(t('common.error') || 'Error', errorMessage);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadAmenities();
  };

  const filteredAmenities = amenities.filter(
    amenity =>
      amenity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      amenity.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAmenityPress = (amenity: Amenity) => {
    props.navigation?.navigate(SMART_SOCIETY_ROUTES.AMENITY_DETAIL, {
      selectedRole,
      amenityId: amenity.id, // Pass amenity ID for API call
      amenity, // Also pass amenity object as fallback
    });
  };

  const renderAmenityItem = ({ item }: { item: Amenity }) => (
    <TouchableOpacity
      style={AmenitiesListStyles.amenityCard}
      onPress={() => handleAmenityPress(item)}
      activeOpacity={0.7}
    >
      {item.imageUrl ? (
        <Image
          source={{ uri: item.imageUrl }}
          style={AmenitiesListStyles.amenityImage}
        />
      ) : (
        <View style={AmenitiesListStyles.amenityImagePlaceholder}>
          <Text style={AmenitiesListStyles.amenityImagePlaceholderText}>
            {item.name.charAt(0)}
          </Text>
        </View>
      )}
      <View style={AmenitiesListStyles.amenityCardContent}>
        <Text style={AmenitiesListStyles.amenityName}>{item.name}</Text>
        <Text style={AmenitiesListStyles.amenityDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={AmenitiesListStyles.amenityDetails}>
          <Text style={AmenitiesListStyles.detailText}>
            {t('smartSociety.capacity') || 'Capacity'}: {item.capacity}
          </Text>
          {item.hourlyRate && (
            <Text style={AmenitiesListStyles.detailText}>
              ₹{item.hourlyRate}/{t('smartSociety.perHour') || 'hr'}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.amenities') || 'Amenities'}
        onPress={() => props.navigation?.goBack()}
      />
      <View style={AmenitiesListStyles.container}>
        <View style={AmenitiesListStyles.searchContainer}>
          <SearchInput
            placeholder={
              t('smartSociety.searchAmenities') || 'Search amenities...'
            }
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {loading && !refreshing ? (
          <View style={AmenitiesListStyles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.DARK_BLUE} />
            <Text style={AmenitiesListStyles.loadingText}>
              {t('smartSociety.loadingAmenities') || 'Loading amenities...'}
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredAmenities}
            renderItem={renderAmenityItem}
            keyExtractor={item => item.id}
            contentContainerStyle={AmenitiesListStyles.listContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
              <View style={AmenitiesListStyles.emptyContainer}>
                <Text style={AmenitiesListStyles.emptyText}>
                  {loading
                    ? t('smartSociety.loadingAmenities') ||
                      'Loading amenities...'
                    : t('smartSociety.noAmenitiesFound') ||
                      'No amenities found'}
                </Text>
              </View>
            }
          />
        )}
      </View>
    </Container>
  );
};

export default AmenitiesList;
