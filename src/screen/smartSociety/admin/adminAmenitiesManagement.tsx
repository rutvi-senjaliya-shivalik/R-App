import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {
  Container,
  HeaderComponent,
  SearchInput,
} from '../../../components/common';
import AdminAmenitiesManagementStyles from './styles/adminAmenitiesManagementStyles';
import { FS, COLORS } from '../../../constants';
import { useTranslation } from '../../../context/LanguageContext';
import { SMART_SOCIETY_ROUTES } from '../../../navigation/routes/smartSocietyRoutes';
import { MakeApiRequest } from '../../../services/apiService';
import { GET, DELETE, PUT } from '../../../constants/api';

interface Amenity {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  capacity: number;
  hourlyRate?: number;
  advanceBookingDays: number;
  requiresApproval: boolean;
  isActive: boolean;
  rules?: string[];
  operatingHours?: {
    open: string;
    close: string;
  };
}

const AdminAmenitiesManagement = (props: any) => {
  const { t } = useTranslation();
  const isMountedRef = useRef(true);
  const selectedRole = props.route?.params?.selectedRole;
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const hasLoadedRef = useRef(false);
  const isRefreshingRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    // Check if user is admin
    if (selectedRole?.id !== 'admin') {
      Alert.alert(
        t('common.accessDenied') || 'Access Denied',
        t('errors.adminOnlyFeature') ||
          'This feature is only available for administrators.',
        [
          {
            text: t('common.ok') || 'OK',
            onPress: () => props.navigation?.goBack(),
          },
        ],
      );
      return;
    }

    // Load amenities only once on mount
    if (!hasLoadedRef.current) {
      hasLoadedRef.current = true;
      loadAmenities();
    }

    // Add navigation listener to refresh when returning from add/edit screen
    // Only refresh if we've already loaded data (not on initial mount)
    const unsubscribe = props.navigation?.addListener('focus', () => {
      if (
        isMountedRef.current &&
        hasLoadedRef.current &&
        !isRefreshingRef.current
      ) {
        // Only refresh if not already refreshing and data was previously loaded
        onRefresh();
      }
    });

    return () => {
      isMountedRef.current = false;
      unsubscribe?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadAmenities = useCallback(
    async (pageNum: number = 1, isRefresh: boolean = false) => {
      // Prevent multiple simultaneous requests
      if (loading && !isRefresh) {
        return;
      }

      // Prevent refresh loop
      if (isRefresh && isRefreshingRef.current) {
        return;
      }

      if (isRefresh) {
        isRefreshingRef.current = true;
      }

      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        // Build API URL with pagination parameters
        const apiUrl = `amenity/amenities?page=${pageNum}&perPage=${perPage}`;

        console.log('📤 Fetching amenities from API...');
        console.log('API URL:', apiUrl);
        console.log('Page:', pageNum, 'Per Page:', perPage);

        const response = await MakeApiRequest({
          apiUrl,
          apiMethod: GET,
          apiParams: {
            page: pageNum,
            perPage: perPage,
          },
        });

        console.log('✅ Amenities API response:', response);

        if (response.status === 200 && response.data) {
          // Handle different response structures
          let amenitiesData: any[] = [];

          if (Array.isArray(response.data)) {
            amenitiesData = response.data;
          } else if (response.data.data && Array.isArray(response.data.data)) {
            amenitiesData = response.data.data;
          } else if (
            response.data.result &&
            Array.isArray(response.data.result)
          ) {
            amenitiesData = response.data.result;
          } else if (
            response.data.amenities &&
            Array.isArray(response.data.amenities)
          ) {
            amenitiesData = response.data.amenities;
          }

          // Map API response to Amenity interface
          const mappedAmenities: Amenity[] = amenitiesData.map((item: any) => ({
            id: item._id || item.id || String(Date.now() + Math.random()),
            name: item.amenityName || item.name || '',
            description: item.description || '',
            imageUrl: item.primaryImage || item.imageUrl || item.image,
            capacity: item.maxCapacity || item.capacity || 0,
            hourlyRate: item.hourlyRate || undefined,
            advanceBookingDays: item.advanceBookingDays || 0,
            requiresApproval: item.requiresApproval || false,
            isActive: item.isActive !== undefined ? item.isActive : true,
            rules:
              item.rules?.map((rule: any) =>
                typeof rule === 'string'
                  ? rule
                  : rule.ruleTitle || rule.title || '',
              ) || [],
            operatingHours: item.operatingHours
              ? {
                  open:
                    item.operatingHours.openTime ||
                    item.operatingHours.open ||
                    '08:00',
                  close:
                    item.operatingHours.closeTime ||
                    item.operatingHours.close ||
                    '22:00',
                }
              : undefined,
          }));

          // Check if there's more data
          const total =
            response.data.total ||
            response.data.totalCount ||
            amenitiesData.length;

          // Use functional update to set amenities and calculate hasMore
          setAmenities(prev => {
            const newAmenities =
              isRefresh || pageNum === 1
                ? mappedAmenities
                : [...prev, ...mappedAmenities];

            const currentTotal = newAmenities.length;
            setHasMore(
              currentTotal < total && mappedAmenities.length === perPage,
            );

            return newAmenities;
          });
          setPage(pageNum);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error: any) {
        console.error('❌ Error fetching amenities:', error);
        console.error('❌ Error response:', error?.response?.data);

        // Show error alert only if not refreshing (to avoid interrupting user)
        if (!isRefresh) {
          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            t('smartSociety.failedToLoadAmenities') ||
            'Failed to load amenities. Please try again.';

          Alert.alert(t('common.error') || 'Error', errorMessage, [
            { text: t('common.ok') || 'OK' },
          ]);
        }

        // On error, keep existing data or set empty array if first load
        setAmenities(prev => (prev.length === 0 ? [] : prev));
      } finally {
        setLoading(false);
        setRefreshing(false);
        if (isRefresh) {
          isRefreshingRef.current = false;
        }
      }
    },
    [loading, perPage, t],
  );

  const onRefresh = useCallback(() => {
    if (isRefreshingRef.current) {
      return; // Prevent multiple refreshes
    }
    setPage(1);
    setHasMore(true);
    loadAmenities(1, true);
  }, [loadAmenities]);

  const filteredAmenities = amenities.filter(amenity => {
    const matchesSearch =
      amenity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      amenity.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && amenity.isActive) ||
      (filter === 'inactive' && !amenity.isActive);
    return matchesSearch && matchesFilter;
  });

  const handleAddAmenity = () => {
    props.navigation?.navigate(SMART_SOCIETY_ROUTES.ADD_AMENITY, {
      selectedRole,
    });
  };

  const handleEditAmenity = (amenity: Amenity) => {
    props.navigation?.navigate(SMART_SOCIETY_ROUTES.ADD_AMENITY, {
      selectedRole,
      amenity,
      isEdit: true,
    });
  };

  const handleDeleteAmenity = (amenity: Amenity) => {
    Alert.alert(
      t('smartSociety.deleteAmenity') || 'Delete Amenity',
      t('smartSociety.confirmDeleteAmenity', { name: amenity.name }) ||
        `Are you sure you want to delete ${amenity.name}?`,
      [
        { text: t('common.cancel') || 'Cancel', style: 'cancel' },
        {
          text: t('common.delete') || 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              console.log('📤 Deleting amenity...');
              console.log('Amenity ID:', amenity.id);

              const response = await MakeApiRequest({
                apiUrl: `amenity/amenities/${amenity.id}`,
                apiMethod: DELETE,
              });

              console.log('✅ Delete amenity response:', response);

              if (response.status === 200 || response.status === 204) {
                setAmenities(prev => prev.filter(a => a.id !== amenity.id));
                Alert.alert(
                  t('common.success') || 'Success',
                  t('smartSociety.amenityDeletedSuccessfully') ||
                    'Amenity deleted successfully',
                );
              } else {
                throw new Error(
                  response.data?.message || 'Failed to delete amenity',
                );
              }
            } catch (error: any) {
              console.error('❌ Error deleting amenity:', error);
              console.error('❌ Error response:', error?.response?.data);

              const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                t('smartSociety.failedToDeleteAmenity') ||
                'Failed to delete amenity. Please try again.';

              Alert.alert(t('common.error') || 'Error', errorMessage, [
                { text: t('common.ok') || 'OK' },
              ]);
            }
          },
        },
      ],
    );
  };

  const handleViewBookings = (amenity: Amenity) => {
    props.navigation?.navigate(SMART_SOCIETY_ROUTES.ADMIN_AMENITY_BOOKINGS, {
      selectedRole,
      amenity,
    });
  };

  const toggleAmenityStatus = async (amenity: Amenity) => {
    const newStatus = !amenity.isActive;

    try {
      console.log('📤 Updating amenity status...');
      console.log('Amenity ID:', amenity.id);
      console.log('New Status:', newStatus);

      // Optimistically update UI
      setAmenities(prev =>
        prev.map(a =>
          a.id === amenity.id ? { ...a, isActive: newStatus } : a,
        ),
      );

      const response = await MakeApiRequest({
        apiUrl: `amenity/amenities/${amenity.id}`,
        apiMethod: PUT,
        apiData: {
          isActive: newStatus,
        },
      });

      console.log('✅ Update amenity status response:', response);

      if (response.status === 200 || response.status === 201) {
        // Status already updated optimistically
        // Optionally show success message
      } else {
        throw new Error(
          response.data?.message || 'Failed to update amenity status',
        );
      }
    } catch (error: any) {
      console.error('❌ Error updating amenity status:', error);
      console.error('❌ Error response:', error?.response?.data);

      // Revert optimistic update on error
      setAmenities(prev =>
        prev.map(a =>
          a.id === amenity.id ? { ...a, isActive: amenity.isActive } : a,
        ),
      );

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        t('smartSociety.failedToUpdateAmenityStatus') ||
        'Failed to update amenity status. Please try again.';

      Alert.alert(t('common.error') || 'Error', errorMessage, [
        { text: t('common.ok') || 'OK' },
      ]);
    }
  };

  const renderAmenityItem = ({ item }: { item: Amenity }) => (
    <View style={AdminAmenitiesManagementStyles.amenityCard}>
      {item.imageUrl && (
        <Image
          source={{ uri: item.imageUrl }}
          style={AdminAmenitiesManagementStyles.amenityImage}
        />
      )}
      <View style={AdminAmenitiesManagementStyles.amenityCardContent}>
        <View style={AdminAmenitiesManagementStyles.amenityCardHeader}>
          <View style={AdminAmenitiesManagementStyles.amenityTitleContainer}>
            <Text style={AdminAmenitiesManagementStyles.amenityName}>
              {item.name}
            </Text>
            <View
              style={[
                AdminAmenitiesManagementStyles.statusBadge,
                item.isActive
                  ? AdminAmenitiesManagementStyles.statusActive
                  : AdminAmenitiesManagementStyles.statusInactive,
              ]}
            >
              <Text
                style={[
                  AdminAmenitiesManagementStyles.statusText,
                  item.isActive
                    ? AdminAmenitiesManagementStyles.statusTextActive
                    : AdminAmenitiesManagementStyles.statusTextInactive,
                ]}
              >
                {item.isActive
                  ? t('common.active') || 'Active'
                  : t('common.inactive') || 'Inactive'}
              </Text>
            </View>
          </View>
        </View>
        <Text style={AdminAmenitiesManagementStyles.amenityDescription}>
          {item.description}
        </Text>
        <View style={AdminAmenitiesManagementStyles.amenityDetails}>
          <Text style={AdminAmenitiesManagementStyles.detailText}>
            {t('smartSociety.capacity') || 'Capacity'}: {item.capacity}
          </Text>
          {item.hourlyRate && (
            <Text style={AdminAmenitiesManagementStyles.detailText}>
              {t('smartSociety.hourlyRate') || 'Rate'}: ₹{item.hourlyRate}/hr
            </Text>
          )}
        </View>
        <View style={AdminAmenitiesManagementStyles.amenityActions}>
          <TouchableOpacity
            style={AdminAmenitiesManagementStyles.actionButton}
            onPress={() => handleViewBookings(item)}
            activeOpacity={0.7}
          >
            <Text style={AdminAmenitiesManagementStyles.actionButtonText}>
              {t('smartSociety.viewBookings') || 'View Bookings'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              AdminAmenitiesManagementStyles.actionButton,
              AdminAmenitiesManagementStyles.editButton,
            ]}
            onPress={() => handleEditAmenity(item)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                AdminAmenitiesManagementStyles.actionButtonText,
                AdminAmenitiesManagementStyles.editButtonText,
              ]}
            >
              {t('common.edit') || 'Edit'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              AdminAmenitiesManagementStyles.actionButton,
              AdminAmenitiesManagementStyles.toggleButton,
            ]}
            onPress={() => toggleAmenityStatus(item)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                AdminAmenitiesManagementStyles.actionButtonText,
                AdminAmenitiesManagementStyles.toggleButtonText,
              ]}
            >
              {item.isActive
                ? t('common.deactivate') || 'Deactivate'
                : t('common.activate') || 'Activate'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              AdminAmenitiesManagementStyles.actionButton,
              AdminAmenitiesManagementStyles.deleteButton,
            ]}
            onPress={() => handleDeleteAmenity(item)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                AdminAmenitiesManagementStyles.actionButtonText,
                AdminAmenitiesManagementStyles.deleteButtonText,
              ]}
            >
              {t('common.delete') || 'Delete'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (selectedRole?.id !== 'admin') {
    return null; // Will redirect via useEffect
  }

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.amenitiesManagement') || 'Amenities Management'}
        onPress={() => props.navigation?.goBack()}
        titleStyle={{ fontSize: FS.FS18 }}
      />
      <View style={AdminAmenitiesManagementStyles.container}>
        <View style={AdminAmenitiesManagementStyles.searchContainer}>
          <SearchInput
            placeholder={
              t('smartSociety.searchAmenities') || 'Search amenities...'
            }
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={AdminAmenitiesManagementStyles.filterContainer}>
          {(['all', 'active', 'inactive'] as const).map(filterType => (
            <TouchableOpacity
              key={filterType}
              style={[
                AdminAmenitiesManagementStyles.filterTab,
                filter === filterType &&
                  AdminAmenitiesManagementStyles.filterTabActive,
              ]}
              onPress={() => setFilter(filterType)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  AdminAmenitiesManagementStyles.filterTabText,
                  filter === filterType &&
                    AdminAmenitiesManagementStyles.filterTabTextActive,
                ]}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.8}
              >
                {filterType === 'all'
                  ? t('common.all') || 'All'
                  : filterType === 'active'
                  ? t('common.active') || 'Active'
                  : t('common.inactive') || 'Inactive'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={AdminAmenitiesManagementStyles.addButton}
          onPress={handleAddAmenity}
          activeOpacity={0.7}
        >
          <Text style={AdminAmenitiesManagementStyles.addButtonText}>
            + {t('smartSociety.addNewAmenity') || 'Add New Amenity'}
          </Text>
        </TouchableOpacity>

        {loading && amenities.length === 0 ? (
          <View style={AdminAmenitiesManagementStyles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.BLACK} />
            <Text style={AdminAmenitiesManagementStyles.loadingText}>
              {t('smartSociety.loadingAmenities') || 'Loading amenities...'}
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredAmenities}
            renderItem={renderAmenityItem}
            keyExtractor={item => item.id}
            contentContainerStyle={AdminAmenitiesManagementStyles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[COLORS.BLACK]}
                tintColor={COLORS.BLACK}
              />
            }
            onEndReached={() => {
              if (!loading && hasMore && !refreshing) {
                loadAmenities(page + 1, false);
              }
            }}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={
              <View style={AdminAmenitiesManagementStyles.emptyContainer}>
                <Text style={AdminAmenitiesManagementStyles.emptyText}>
                  {t('smartSociety.noAmenitiesFound') || 'No amenities found'}
                </Text>
              </View>
            }
            ListFooterComponent={
              loading && amenities.length > 0 ? (
                <View style={AdminAmenitiesManagementStyles.footerLoader}>
                  <ActivityIndicator size="small" color={COLORS.BLACK} />
                </View>
              ) : null
            }
          />
        )}
      </View>
    </Container>
  );
};

export default AdminAmenitiesManagement;
