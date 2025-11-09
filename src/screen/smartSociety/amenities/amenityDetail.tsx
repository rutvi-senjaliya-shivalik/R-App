import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  Container,
  HeaderComponent,
  CustomButton,
} from '../../../components/common';
import AmenityDetailStyles from './styles/amenityDetailStyles';
import { COLORS } from '../../../constants';
import { useTranslation } from '../../../context/LanguageContext';
import { SMART_SOCIETY_ROUTES } from '../../../navigation/routes/smartSocietyRoutes';
import { useDispatch } from 'react-redux';
import { getAmenityDetailAction } from '../../../store/actions/smartSociety/getAmenityDetailAction';

interface Amenity {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  capacity: number;
  hourlyRate?: number;
  advanceBookingDays: number;
  requiresApproval: boolean;
  rules?: string[];
  operatingHours?: {
    open: string;
    close: string;
  };
}

const AmenityDetail = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isMountedRef = useRef(true);
  const amenityParam = props.route?.params?.amenity as Amenity;
  const amenityIdParam = props.route?.params?.amenityId;
  const selectedRole = props.route?.params?.selectedRole;

  const [amenity, setAmenity] = useState<Amenity | null>(amenityParam || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    isMountedRef.current = true;

    // Get amenity ID from params (either from amenity object or directly)
    const amenityId = amenityIdParam || amenityParam?.id;

    if (amenityId) {
      loadAmenityDetail(amenityId);
    } else if (!amenityParam) {
      Alert.alert(
        t('common.error') || 'Error',
        t('smartSociety.amenityNotFound') || 'Amenity not found',
      );
    }

    return () => {
      isMountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadAmenityDetail = async (amenityId: string) => {
    if (!isMountedRef.current) return;

    try {
      setLoading(true);
      console.log('📞 Fetching amenity detail for ID:', amenityId);

      const response = await dispatch(getAmenityDetailAction(amenityId) as any);

      console.log('📦 API Response:', response?.data);

      if (response?.data) {
        // API response structure: { success: true, message: '...', data: {...} }
        const responseData = response.data;
        const amenityData = responseData?.data || responseData;

        console.log('📋 Amenity data:', amenityData);

        // Map API response to component format
        let imageUrl: string | undefined;
        if (amenityData.primaryImage) {
          imageUrl = amenityData.primaryImage;
        } else if (amenityData.images && amenityData.images.length > 0) {
          imageUrl = amenityData.images[0];
        }

        // Extract features/rules
        const rules: string[] = [];
        if (amenityData.features && Array.isArray(amenityData.features)) {
          amenityData.features.forEach((feature: any) => {
            if (typeof feature === 'string') {
              rules.push(feature);
            } else if (feature?.name || feature?.description) {
              rules.push(feature.name || feature.description);
            }
          });
        }

        // Extract operating hours if available
        let operatingHours: { open: string; close: string } | undefined;
        if (amenityData.openTime && amenityData.closeTime) {
          operatingHours = {
            open: amenityData.openTime,
            close: amenityData.closeTime,
          };
        }

        const mappedAmenity: Amenity = {
          id: amenityData._id || amenityData.id || amenityId,
          name: amenityData.amenityName || amenityData.name || '',
          description: amenityData.description || '',
          imageUrl,
          capacity: amenityData.maxCapacity || amenityData.capacity || 0,
          hourlyRate: amenityData.hourlyRate || amenityData.rate || undefined,
          advanceBookingDays:
            amenityData.advanceBookingDays || amenityData.bookingDays || 0,
          requiresApproval:
            amenityData.requiresApproval !== undefined
              ? amenityData.requiresApproval
              : amenityData.approvalRequired || false,
          rules: rules.length > 0 ? rules : undefined,
          operatingHours,
        };

        console.log('✅ Mapped amenity:', mappedAmenity);

        if (isMountedRef.current) {
          setAmenity(mappedAmenity);
        }
      } else {
        console.warn('⚠️ No data in API response');
        if (isMountedRef.current) {
          Alert.alert(
            t('common.error') || 'Error',
            t('smartSociety.failedToLoadAmenity') ||
              'Failed to load amenity details',
          );
        }
      }
    } catch (error: any) {
      console.error('Error loading amenity detail:', error);
      if (isMountedRef.current) {
        let errorMessage =
          t('smartSociety.failedToLoadAmenity') ||
          'Failed to load amenity details. Please try again.';

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
            t('smartSociety.amenityNotFound') || 'Amenity not found.';
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
      }
    }
  };

  const handleBookNow = () => {
    if (!amenity) return;

    props.navigation?.navigate(SMART_SOCIETY_ROUTES.BOOK_AMENITY, {
      selectedRole,
      amenity,
    });
  };

  if (loading) {
    return (
      <Container>
        <HeaderComponent
          Title={
            amenity?.name || t('smartSociety.amenityDetail') || 'Amenity Detail'
          }
          onPress={() => props.navigation?.goBack()}
        />
        <View style={AmenityDetailStyles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.DARK_BLUE} />
          <Text style={AmenityDetailStyles.loadingText}>
            {t('smartSociety.loadingAmenity') || 'Loading amenity details...'}
          </Text>
        </View>
      </Container>
    );
  }

  if (!amenity) {
    return (
      <Container>
        <HeaderComponent
          Title={t('smartSociety.amenityDetail') || 'Amenity Detail'}
          onPress={() => props.navigation?.goBack()}
        />
        <View style={AmenityDetailStyles.loadingContainer}>
          <Text style={AmenityDetailStyles.emptyText}>
            {t('smartSociety.amenityNotFound') || 'Amenity not found'}
          </Text>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <HeaderComponent
        Title={amenity.name}
        onPress={() => props.navigation?.goBack()}
      />
      <ScrollView
        style={AmenityDetailStyles.container}
        contentContainerStyle={AmenityDetailStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {amenity.imageUrl ? (
          <Image
            source={{ uri: amenity.imageUrl }}
            style={AmenityDetailStyles.amenityImage}
          />
        ) : (
          <View style={AmenityDetailStyles.amenityImagePlaceholder}>
            <Text style={AmenityDetailStyles.amenityImagePlaceholderText}>
              {amenity.name.charAt(0)}
            </Text>
          </View>
        )}

        <View style={AmenityDetailStyles.detailsCard}>
          <Text style={AmenityDetailStyles.title}>{amenity.name}</Text>
          <Text style={AmenityDetailStyles.description}>
            {amenity.description}
          </Text>

          <View style={AmenityDetailStyles.detailsRow}>
            <View style={AmenityDetailStyles.detailItem}>
              <Text style={AmenityDetailStyles.detailLabel}>
                {t('smartSociety.capacity') || 'Capacity'}
              </Text>
              <Text style={AmenityDetailStyles.detailValue}>
                {amenity.capacity}
              </Text>
            </View>
            {amenity.hourlyRate && (
              <View style={AmenityDetailStyles.detailItem}>
                <Text style={AmenityDetailStyles.detailLabel}>
                  {t('smartSociety.hourlyRate') || 'Hourly Rate'}
                </Text>
                <Text style={AmenityDetailStyles.detailValue}>
                  ₹{amenity.hourlyRate}/{t('smartSociety.perHour') || 'hr'}
                </Text>
              </View>
            )}
          </View>

          {amenity.operatingHours && (
            <View style={AmenityDetailStyles.detailsRow}>
              <View style={AmenityDetailStyles.detailItem}>
                <Text style={AmenityDetailStyles.detailLabel}>
                  {t('smartSociety.operatingHours') || 'Operating Hours'}
                </Text>
                <Text style={AmenityDetailStyles.detailValue}>
                  {amenity.operatingHours.open} - {amenity.operatingHours.close}
                </Text>
              </View>
            </View>
          )}

          <View style={AmenityDetailStyles.detailsRow}>
            <View style={AmenityDetailStyles.detailItem}>
              <Text style={AmenityDetailStyles.detailLabel}>
                {t('smartSociety.advanceBooking') || 'Advance Booking'}
              </Text>
              <Text style={AmenityDetailStyles.detailValue}>
                {amenity.advanceBookingDays} {t('smartSociety.days') || 'days'}
              </Text>
            </View>
            <View style={AmenityDetailStyles.detailItem}>
              <Text style={AmenityDetailStyles.detailLabel}>
                {t('smartSociety.approvalRequired') || 'Approval'}
              </Text>
              <Text style={AmenityDetailStyles.detailValue}>
                {amenity.requiresApproval
                  ? t('common.yes') || 'Yes'
                  : t('common.no') || 'No'}
              </Text>
            </View>
          </View>
        </View>

        {amenity.rules && amenity.rules.length > 0 && (
          <View style={AmenityDetailStyles.rulesCard}>
            <Text style={AmenityDetailStyles.sectionTitle}>
              {t('smartSociety.rules') || 'Rules'}
            </Text>
            {amenity.rules.map((rule, index) => (
              <View key={index} style={AmenityDetailStyles.ruleItem}>
                <Text style={AmenityDetailStyles.ruleBullet}>•</Text>
                <Text style={AmenityDetailStyles.ruleText}>{rule}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={AmenityDetailStyles.bookButton}>
          <CustomButton
            title={t('smartSociety.bookNow') || 'Book Now'}
            onPress={handleBookNow}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default AmenityDetail;
