import React, { useRef, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import {
  Container,
  HeaderComponent,
  CustomButton,
  InputField,
  CalendarPicker,
} from '../../../../components/common';
import AddNoticeStyles from './styles/addNoticeStyles';
import { COLORS } from '../../../../constants';
import { useTranslation } from '../../../../context/LanguageContext';
import { useDispatch, useSelector } from 'react-redux';
import { createNoticeAction } from '../../../../store/actions/smartSociety/createNoticeAction';
import { MakeApiRequest } from '../../../../services/apiService';
import { GET_ALL_UNITS } from '../../../../services/httpService';
import { GET } from '../../../../constants/api';
import moment from 'moment';

interface Unit {
  id: string;
  unitNumber: string;
  blockId?: string;
  unitType?: string;
  area?: number;
  floor?: number;
  unitStatus?: string;
  amenities?: string[];
  memberId?: string;
}

const AddNotice = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch() as any;
  const isMountedRef = useRef(true);
  const selectedRole = props.route?.params?.selectedRole;

  const createNoticeLoading = useSelector(
    (state: any) => state.createNotice?.loading,
  );
  const createNoticeData = useSelector(
    (state: any) => state.createNotice?.data,
  );
  const createNoticeError = useSelector(
    (state: any) => state.createNotice?.error,
  );

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [priority, setPriority] = useState<string>('Medium');
  const [visibleTo, setVisibleTo] = useState<string>('All');
  const [targetAudience, setTargetAudience] = useState<string>('All');
  const [targetUnits, setTargetUnits] = useState<string>('');
  const [validFrom, setValidFrom] = useState<Date | null>(new Date());
  const [validUntil, setValidUntil] = useState<Date | null>(null);
  const [showStartDatePicker, setShowStartDatePicker] =
    useState<boolean>(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);

  const [titleError, setTitleError] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<string>('');
  const [categoryError, setCategoryError] = useState<string>('');
  const [targetUnitsError, setTargetUnitsError] = useState<string>('');
  const [units, setUnits] = useState<Unit[]>([]);
  const [loadingUnits, setLoadingUnits] = useState<boolean>(false);

  const categories = [
    { key: 'General', label: t('smartSociety.general') },
    { key: 'Maintenance', label: t('smartSociety.maintenance') },
    { key: 'Security', label: t('smartSociety.security') },
    { key: 'Event', label: t('smartSociety.event') },
  ];
  const priorities = [
    { key: 'Low', label: t('smartSociety.low') || 'Low' },
    { key: 'Medium', label: t('smartSociety.medium') || 'Medium' },
    { key: 'High', label: t('smartSociety.high') || 'High' },
    { key: 'Urgent', label: t('smartSociety.urgent') || 'Urgent' },
  ];
  const visibilityOptions = [
    { key: 'All', label: t('smartSociety.all') },
    { key: 'Wing A', label: t('smartSociety.wingA') },
    { key: 'Wing B', label: t('smartSociety.wingB') },
    { key: 'Wing C', label: t('smartSociety.wingC') },
  ];

  useEffect(() => {
    isMountedRef.current = true;
    loadUnits();
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const loadUnits = async () => {
    try {
      setLoadingUnits(true);
      const response = await MakeApiRequest({
        apiUrl: GET_ALL_UNITS({ page: 1, limit: 1000 }),
        apiMethod: GET,
      });
      if (response?.data?.data) {
        const unitsData = Array.isArray(response.data.data)
          ? response.data.data
          : response.data.data.units || response.data.data.data || [];
        setUnits(unitsData);
      }
    } catch (error: any) {
      console.error('Error loading units:', error);
      // Continue without units - user can still enter unit numbers manually
      setUnits([]);
    } finally {
      setLoadingUnits(false);
    }
  };

  // Convert unit numbers to unit IDs
  const convertUnitNumbersToIds = (
    unitNumbers: string[],
  ): { ids: string[]; invalidUnits: string[] } => {
    const ids: string[] = [];
    const invalidUnits: string[] = [];

    unitNumbers.forEach(unitNumber => {
      const trimmedUnit = unitNumber.trim();
      if (!trimmedUnit) return;

      // Try to find unit by unitNumber
      const unit = units.find(
        u =>
          u.unitNumber?.toLowerCase() === trimmedUnit.toLowerCase() ||
          u.unitNumber === trimmedUnit,
      );

      if (unit && unit.id) {
        ids.push(unit.id);
      } else {
        // If unit number not found, check if it's already a MongoDB ID format
        // MongoDB IDs are 24 character hex strings
        if (/^[0-9a-fA-F]{24}$/.test(trimmedUnit)) {
          ids.push(trimmedUnit);
        } else {
          invalidUnits.push(trimmedUnit);
        }
      }
    });

    return { ids, invalidUnits };
  };

  // Handle successful notice creation
  useEffect(() => {
    if (createNoticeData && isMountedRef.current) {
      // Handle multiple response formats
      const response = createNoticeData?.data || createNoticeData;
      const responseData = response?.result || response?.data || response;

      if (responseData) {
        Alert.alert(
          t('common.success'),
          t('smartSociety.noticeCreatedSuccessfully'),
          [
            {
              text: t('common.ok'),
              onPress: () => {
                props.navigation?.goBack();
              },
            },
          ],
        );
        // Clear the reducer state
        dispatch({ type: 'CREATE_NOTICE_CLEAR' });
      }
    }
  }, [createNoticeData]);

  // Handle notice creation errors
  useEffect(() => {
    if (createNoticeError && isMountedRef.current) {
      const errorMessage =
        createNoticeError?.response?.data?.message ||
        createNoticeError?.response?.data?.error ||
        createNoticeError?.message ||
        t('smartSociety.failedToCreateNotice');
      Alert.alert(t('common.error'), errorMessage);
      // Clear the reducer state after showing error
      dispatch({ type: 'CREATE_NOTICE_CLEAR' });
    }
  }, [createNoticeError]);

  const handleStartDateSelect = (dateString: string) => {
    if (dateString) {
      const selectedDate = new Date(dateString);
      setValidFrom(selectedDate);
    }
    setShowStartDatePicker(false);
  };

  const handleEndDateSelect = (dateString: string) => {
    if (dateString) {
      const selectedDate = new Date(dateString);
      setValidUntil(selectedDate);
    }
    setShowEndDatePicker(false);
  };

  const validateForm = (): boolean => {
    let isValid = true;
    setTitleError('');
    setDescriptionError('');
    setCategoryError('');
    setTargetUnitsError('');

    if (!title.trim()) {
      setTitleError(t('smartSociety.pleaseEnterTitle'));
      isValid = false;
    }
    if (!description.trim()) {
      setDescriptionError(t('smartSociety.pleaseEnterDescription'));
      isValid = false;
    }
    if (!category) {
      setCategoryError(t('smartSociety.pleaseSelectCategory'));
      isValid = false;
    }

    // Validate target units if provided and target audience is "Specific Units"
    if (targetAudience === 'Specific Units' && targetUnits.trim()) {
      const unitNumbers = targetUnits
        .split(',')
        .map(unit => unit.trim())
        .filter(unit => unit);
      const { invalidUnits } = convertUnitNumbersToIds(unitNumbers);

      if (invalidUnits.length > 0) {
        setTargetUnitsError(
          t('smartSociety.invalidUnitNumbers') ||
            `Invalid unit numbers: ${invalidUnits.join(', ')}`,
        );
        isValid = false;
      }
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    if (createNoticeLoading) {
      return; // Prevent multiple submissions
    }

    try {
      // Start date is required - default to today if not set
      const startDateValue = validFrom || new Date();
      // Set start date to beginning of day (00:00:00.000Z)
      const startDate = moment(startDateValue).startOf('day').toISOString();

      // End date is optional - if provided, set to end of day (23:59:59.999Z)
      let endDate: string | undefined;
      if (validUntil) {
        endDate = moment(validUntil).endOf('day').toISOString();
      }

      const noticeData: any = {
        title: title.trim(),
        description: description.trim(),
        category: category,
        priority: priority,
        targetAudience: targetAudience, // String, not array
        startDate: startDate, // ISO string format
        requiresAcknowledgment: false, // Default to false
      };

      // Add end date if provided
      if (endDate) {
        noticeData.endDate = endDate; // ISO string format
      }

      console.log('📝 Prepared notice data:', {
        title: noticeData.title,
        category: noticeData.category,
        priority: noticeData.priority,
        targetAudience: noticeData.targetAudience,
        startDate: noticeData.startDate,
        endDate: noticeData.endDate,
        hasDescription: !!noticeData.description,
      });

      await dispatch(createNoticeAction(noticeData));
    } catch (error: any) {
      console.error('Error creating notice:', error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        t('smartSociety.failedToCreateNotice');
      Alert.alert(t('common.error'), errorMessage);
    }
  };

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.createNotice')}
        onPress={() => props.navigation?.goBack()}
      />
      <ScrollView
        style={AddNoticeStyles.container}
        contentContainerStyle={AddNoticeStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={AddNoticeStyles.section}>
          <InputField
            placeholder={`${t('smartSociety.title')}*`}
            value={title}
            onChangeText={text => {
              setTitle(text);
              if (titleError) setTitleError('');
            }}
            error={titleError}
          />
        </View>

        <View style={AddNoticeStyles.section}>
          <Text style={AddNoticeStyles.label}>
            {t('smartSociety.category')}
          </Text>
          <View style={AddNoticeStyles.chipsContainer}>
            {categories.map(cat => (
              <TouchableOpacity
                key={cat.key}
                style={[
                  AddNoticeStyles.chip,
                  category === cat.key && AddNoticeStyles.chipActive,
                ]}
                onPress={() => setCategory(cat.key)}
              >
                <Text
                  style={[
                    AddNoticeStyles.chipText,
                    category === cat.key && AddNoticeStyles.chipTextActive,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={AddNoticeStyles.section}>
          <Text style={AddNoticeStyles.label}>Priority</Text>
          <View style={AddNoticeStyles.chipsContainer}>
            {priorities.map(pri => (
              <TouchableOpacity
                key={pri.key}
                style={[
                  AddNoticeStyles.chip,
                  priority === pri.key && AddNoticeStyles.chipActive,
                ]}
                onPress={() => setPriority(pri.key)}
              >
                <Text
                  style={[
                    AddNoticeStyles.chipText,
                    priority === pri.key && AddNoticeStyles.chipTextActive,
                  ]}
                >
                  {pri.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={AddNoticeStyles.section}>
          <Text style={AddNoticeStyles.label}>
            {t('smartSociety.visibleTo')}
          </Text>
          <View style={AddNoticeStyles.chipsContainer}>
            {visibilityOptions.map(vis => (
              <TouchableOpacity
                key={vis.key}
                style={[
                  AddNoticeStyles.chip,
                  visibleTo === vis.key && AddNoticeStyles.chipActive,
                ]}
                onPress={() => setVisibleTo(vis.key)}
              >
                <Text
                  style={[
                    AddNoticeStyles.chipText,
                    visibleTo === vis.key && AddNoticeStyles.chipTextActive,
                  ]}
                >
                  {vis.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={AddNoticeStyles.section}>
          <InputField
            placeholder={`${t('smartSociety.description')}*`}
            value={description}
            onChangeText={text => {
              setDescription(text);
              if (descriptionError) setDescriptionError('');
            }}
            error={descriptionError}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            style={AddNoticeStyles.textArea}
          />
        </View>

        <View style={AddNoticeStyles.section}>
          <Text style={AddNoticeStyles.label}>
            {t('smartSociety.targetAudience')}
          </Text>
          <View style={AddNoticeStyles.chipsContainer}>
            {[
              { value: 'All', label: t('smartSociety.all') || 'All' },
              {
                value: 'Members',
                label: t('smartSociety.members') || 'Members',
              },
              {
                value: 'Committee',
                label: t('smartSociety.committee') || 'Committee',
              },
              { value: 'Staff', label: t('smartSociety.staff') || 'Staff' },
              {
                value: 'Specific Units',
                label: t('smartSociety.specificUnits') || 'Specific Units',
              },
              {
                value: 'Specific Blocks',
                label: t('smartSociety.specificBlocks') || 'Specific Blocks',
              },
            ].map(audience => (
              <TouchableOpacity
                key={audience.value}
                style={[
                  AddNoticeStyles.chip,
                  targetAudience === audience.value &&
                    AddNoticeStyles.chipActive,
                ]}
                onPress={() => setTargetAudience(audience.value)}
              >
                <Text
                  style={[
                    AddNoticeStyles.chipText,
                    targetAudience === audience.value &&
                      AddNoticeStyles.chipTextActive,
                  ]}
                >
                  {audience.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {(targetAudience === 'Specific Units' ||
          targetAudience === 'Specific Blocks') && (
          <View style={AddNoticeStyles.section}>
            <InputField
              placeholder={
                t('smartSociety.targetUnits') + ' (e.g., A-101, B-202)'
              }
              value={targetUnits}
              onChangeText={text => {
                setTargetUnits(text);
                if (targetUnitsError) setTargetUnitsError('');
              }}
              helperText={
                targetUnitsError
                  ? targetUnitsError
                  : t('smartSociety.targetUnitsHelper') ||
                    'Enter unit numbers separated by commas'
              }
              error={targetUnitsError}
            />
            {loadingUnits && (
              <Text style={{ fontSize: 12, color: COLORS.GRAY, marginTop: 4 }}>
                {t('smartSociety.loadingUnits') || 'Loading units...'}
              </Text>
            )}
          </View>
        )}

        {/* Start Date - Required */}
        <View style={AddNoticeStyles.section}>
          <TouchableOpacity
            onPress={() => setShowStartDatePicker(true)}
            activeOpacity={0.7}
          >
            <InputField
              placeholder={`${t('smartSociety.startDate') || 'Start Date'}*`}
              value={validFrom ? moment(validFrom).format('DD/MM/YYYY') : ''}
              editable={false}
              pointerEvents="none"
            />
          </TouchableOpacity>
        </View>

        {/* End Date - Optional */}
        <View style={AddNoticeStyles.section}>
          <TouchableOpacity
            onPress={() => setShowEndDatePicker(true)}
            activeOpacity={0.7}
          >
            <InputField
              placeholder={t('smartSociety.endDate') || 'End Date (Optional)'}
              value={validUntil ? moment(validUntil).format('DD/MM/YYYY') : ''}
              editable={false}
              pointerEvents="none"
            />
          </TouchableOpacity>
        </View>

        <CustomButton
          title={
            createNoticeLoading
              ? t('common.pleaseWait')
              : t('smartSociety.createNotice')
          }
          onPress={handleSubmit}
          style={AddNoticeStyles.submitButton}
          disabled={createNoticeLoading}
          loading={createNoticeLoading}
        />
      </ScrollView>

      {/* Start Date Picker */}
      <CalendarPicker
        visible={showStartDatePicker}
        onClose={() => setShowStartDatePicker(false)}
        onSelect={handleStartDateSelect}
        initialDate={
          validFrom
            ? moment(validFrom).format('YYYY-MM-DD')
            : moment().format('YYYY-MM-DD')
        }
        minDate={moment().format('YYYY-MM-DD')}
      />

      {/* End Date Picker */}
      <CalendarPicker
        visible={showEndDatePicker}
        onClose={() => setShowEndDatePicker(false)}
        onSelect={handleEndDateSelect}
        initialDate={
          validUntil ? moment(validUntil).format('YYYY-MM-DD') : undefined
        }
        minDate={
          validFrom
            ? moment(validFrom).format('YYYY-MM-DD')
            : moment().format('YYYY-MM-DD')
        }
      />
    </Container>
  );
};

export default AddNotice;
