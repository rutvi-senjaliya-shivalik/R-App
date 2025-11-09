import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {
  Container,
  HeaderComponent,
  CustomButton,
  ImagePickerModal,
  CustomSwitch,
  InputField,
  CalendarPicker,
  TimePickerModal,
  Dropdowns,
} from '../../../../components/common';
import ImagePicker from 'react-native-image-crop-picker';
import AddEventStyles from './styles/addEventStyles';
import { COLORS } from '../../../../constants';
import { useTranslation } from '../../../../context/LanguageContext';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { createEventAction } from '../../../../store/actions/smartSociety/createEventAction';

const AddEvent = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch() as any;
  const isMountedRef = useRef(true);
  const createEventLoading = useSelector((state: any) => state.createEvent?.loading);
  const createEventData = useSelector((state: any) => state.createEvent?.data);
  const createEventError = useSelector((state: any) => state.createEvent?.error);
  
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [location, setLocation] = useState<string>('');
  const [venue, setVenue] = useState<string>('');
  const [eventImage, setEventImage] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState<boolean>(false);
  const [isImagePickerVisible, setIsImagePickerVisible] = useState<boolean>(false);
  const [isBannerImagePickerVisible, setIsBannerImagePickerVisible] = useState<boolean>(false);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>('');
  const [eventType, setEventType] = useState<string>('');
  const [status, setStatus] = useState<string>('Draft');
  const [priority, setPriority] = useState<string>('Medium');
  const [visibility, setVisibility] = useState<string>('Public');
  const [maxCapacity, setMaxCapacity] = useState<string>('');
  const [requiresRegistration, setRequiresRegistration] = useState<boolean>(false);
  const [registrationDeadline, setRegistrationDeadline] = useState<Date | null>(null);
  const [estimatedBudget, setEstimatedBudget] = useState<string>('');
  const [agenda, setAgenda] = useState<string>('');
  const [contactName, setContactName] = useState<string>('');
  const [contactMobile, setContactMobile] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [showRegistrationDeadlinePicker, setShowRegistrationDeadlinePicker] = useState<boolean>(false);
  
  // Error states for validation
  const [nameError, setNameError] = useState<string>('');
  const [locationError, setLocationError] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<string>('');
  const [amountError, setAmountError] = useState<string>('');

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Handle successful event creation
  useEffect(() => {
    if (createEventData && isMountedRef.current) {
      // Handle multiple response formats
      const response = createEventData?.data || createEventData;
      const responseData = response?.result || response?.data || response;
      
      if (responseData) {
        Alert.alert(
          t('common.success'),
          t('smartSociety.eventCreatedSuccessfully'),
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
        dispatch({ type: 'CREATE_EVENT_CLEAR' });
      }
    }
  }, [createEventData]);

  // Handle event creation errors
  useEffect(() => {
    if (createEventError && isMountedRef.current) {
      const errorMessage =
        createEventError?.response?.data?.message ||
        createEventError?.message ||
        t('smartSociety.failedToCreateEvent');
      Alert.alert(t('common.error'), errorMessage);
    }
  }, [createEventError]);

  const handleDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleDateSelect = (dateString: string) => {
    if (dateString) {
      const selectedDate = new Date(dateString);
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const handleTimePicker = () => {
    setShowTimePicker(true);
  };

  const handleTimeConfirm = (selectedTime: Date) => {
    setTime(selectedTime);
    setShowTimePicker(false);
  };

  const handleTimeChange = (selectedTime: Date) => {
    setTime(selectedTime);
  };

  const handleEndTimePicker = () => {
    setShowEndTimePicker(true);
  };

  const handleEndTimeConfirm = (selectedTime: Date) => {
    setEndTime(selectedTime);
    setShowEndTimePicker(false);
  };

  const handleEndTimeChange = (selectedTime: Date) => {
    setEndTime(selectedTime);
  };

  const handleEndDatePicker = () => {
    setShowEndDatePicker(true);
  };

  const handleEndDateSelect = (dateString: string) => {
    if (dateString) {
      const selectedDate = new Date(dateString);
      setEndDate(selectedDate);
    }
    setShowEndDatePicker(false);
  };

  const handleRegistrationDeadlinePicker = () => {
    setShowRegistrationDeadlinePicker(true);
  };

  const handleBannerImagePicker = () => {
    setIsBannerImagePickerVisible(true);
  };

  const handleBannerCameraPress = async () => {
    try {
      setIsBannerImagePickerVisible(false);
      const image = await ImagePicker.openCamera({
        width: 1200,
        height: 400,
        cropping: true,
        compressImageQuality: 0.8,
      });
      setBannerImage(image.path);
    } catch (error: any) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        Alert.alert(t('common.error'), t('smartSociety.failedToCaptureImage'));
      }
    }
  };

  const handleBannerGalleryPress = async () => {
    try {
      setIsBannerImagePickerVisible(false);
      const hasPermission = await checkStoragePermission();

      if (!hasPermission) {
        Alert.alert(
          t('common.storagePermissionRequired'),
          t('smartSociety.storagePermissionRequiredForEventImages'),
          [{ text: t('common.ok') }],
        );
        return;
      }

      const image = await ImagePicker.openPicker({
        width: 1200,
        height: 400,
        cropping: true,
        compressImageQuality: 0.8,
      });
      setBannerImage(image.path);
    } catch (error: any) {
      if (
        error.code !== 'E_PICKER_CANCELLED' &&
        error.code !== 'picker_canceled'
      ) {
        Alert.alert(t('common.error'), t('smartSociety.failedToSelectImage'));
      }
    }
  };

  const handleRemoveBannerImage = () => {
    setBannerImage(null);
  };

  const handleRegistrationDeadlineSelect = (dateString: string) => {
    if (dateString) {
      // Parse the date string and set time to end of day (23:59:59) in local timezone
      const selectedDate = moment(dateString).endOf('day').toDate();
      setRegistrationDeadline(selectedDate);
    } else {
      setRegistrationDeadline(null);
    }
    setShowRegistrationDeadlinePicker(false);
  };

  // Check storage permission for Android
  const checkStoragePermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to your storage to select images',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS handles permissions automatically
  };

  const handleImagePicker = () => {
    setIsImagePickerVisible(true);
  };

  const handleCameraPress = async () => {
    try {
      setIsImagePickerVisible(false);
      const image = await ImagePicker.openCamera({
        width: 800,
        height: 600,
        cropping: true,
        compressImageQuality: 0.8,
      });
      setEventImage(image.path);
    } catch (error: any) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        Alert.alert(t('common.error'), t('smartSociety.failedToCaptureImage'));
      }
    }
  };

  const handleGalleryPress = async () => {
    try {
      setIsImagePickerVisible(false);
      const hasPermission = await checkStoragePermission();

      if (!hasPermission) {
        Alert.alert(
          t('common.storagePermissionRequired'),
          t('smartSociety.storagePermissionRequiredForEventImages'),
          [{ text: t('common.ok') }],
        );
        return;
      }

      const image = await ImagePicker.openPicker({
        width: 800,
        height: 600,
        cropping: true,
        compressImageQuality: 0.8,
      });
      setEventImage(image.path);
    } catch (error: any) {
      if (
        error.code !== 'E_PICKER_CANCELLED' &&
        error.code !== 'picker_canceled'
      ) {
        Alert.alert(t('common.error'), t('smartSociety.failedToSelectImage'));
      }
    }
  };

  const handleRemoveImage = () => {
    setEventImage(null);
  };

  const validateForm = (): boolean => {
    let isValid = true;
    setNameError('');
    setDescriptionError('');
    setLocationError('');
    setAmountError('');

    if (!name.trim()) {
      setNameError(t('smartSociety.pleaseEnterTitle'));
      isValid = false;
    }
    if (!description.trim()) {
      setDescriptionError(t('smartSociety.pleaseEnterDescription'));
      isValid = false;
    }
    if (!date) {
      Alert.alert(t('common.error'), t('smartSociety.pleaseSelectDate'));
      isValid = false;
    }
    if (!time) {
      Alert.alert(t('common.error'), t('smartSociety.pleaseSelectTime'));
      isValid = false;
    }
    if (!location.trim()) {
      setLocationError(t('smartSociety.pleaseEnterVenue'));
      isValid = false;
    }
    if (isPaid && (!amount.trim() || parseFloat(amount) <= 0)) {
      setAmountError(t('smartSociety.pleaseEnterValidAmount'));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    if (createEventLoading) {
      return; // Prevent multiple submissions
    }

    try {
      const eventData: any = {
        title: name.trim(), // API expects 'title' not 'name'
        name: name.trim(), // Keep for backward compatibility
        description: description.trim(),
        eventType: eventType || 'General', // Must be one of: General, Meeting, Festival, Sports, Cultural, Religious, Social, Educational, Health, Community, Other
        visibility: visibility || 'Public', // Must be one of: Public, Private, Members Only, Committee Only
        startDate: date ? moment(date).toISOString() : null,
        endDate: endDate ? moment(endDate).toISOString() : null,
        startTime: time ? moment(time).format('HH:mm') : null,
        endTime: endTime ? moment(endTime).format('HH:mm') : null,
        // Legacy fields for backward compatibility
        date: date ? moment(date).format('YYYY-MM-DD') : null,
        time: time ? moment(time).format('HH:mm') : null,
        location: location.trim(),
        venue: venue.trim() || undefined,
        maxParticipants: maxCapacity ? parseInt(maxCapacity, 10) : undefined,
        maxCapacity: maxCapacity ? parseInt(maxCapacity, 10) : null, // Keep for backward compatibility
        requiresRegistration: requiresRegistration,
        registrationDeadline: registrationDeadline
          ? moment(registrationDeadline).endOf('day').toISOString()
          : undefined,
        estimatedBudget: estimatedBudget ? parseFloat(estimatedBudget) : undefined,
        agenda: agenda.trim() || undefined,
        contactPerson: (contactName.trim() || contactMobile.trim() || contactEmail.trim()) ? {
          name: contactName.trim() || undefined,
          mobileNumber: contactMobile.trim() || undefined,
          email: contactEmail.trim() || undefined,
        } : undefined,
        images: images.length > 0 ? images : undefined,
        bannerImage: bannerImage || undefined,
        imageUrl: eventImage || bannerImage || undefined, // Keep for backward compatibility
        isPaid: isPaid,
        amount: isPaid ? parseFloat(amount) : undefined,
        status: status || 'Draft',
        priority: priority || 'Medium',
      };

      await dispatch(createEventAction(eventData));
    } catch (error: any) {
      console.error('Error creating event:', error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        t('smartSociety.failedToCreateEvent');
      Alert.alert(t('common.error'), errorMessage);
    }
  };

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.createEvent')}
        onPress={() => props.navigation?.goBack()}
      />
      <ScrollView
        style={AddEventStyles.container}
        contentContainerStyle={AddEventStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={AddEventStyles.section}>
          <InputField
            placeholder={`${t('smartSociety.title')}*`}
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (nameError) setNameError('');
            }}
            error={nameError}
          />
        </View>

        <View style={AddEventStyles.section}>
          <TouchableOpacity onPress={handleDatePicker} activeOpacity={0.7}>
            <InputField
              placeholder={`${t('smartSociety.date')}*`}
              value={date ? moment(date).format('DD/MM/YYYY') : ''}
              editable={false}
              pointerEvents="none"
            />
          </TouchableOpacity>
        </View>

        <View style={AddEventStyles.section}>
          <TouchableOpacity onPress={handleTimePicker} activeOpacity={0.7}>
            <InputField
              placeholder={`${t('smartSociety.startTime') || 'Start Time'}*`}
              value={time ? moment(time).format('HH:mm') : ''}
              editable={false}
              pointerEvents="none"
            />
          </TouchableOpacity>
        </View>

        {/* End Date */}
        <View style={AddEventStyles.section}>
          <TouchableOpacity onPress={handleEndDatePicker} activeOpacity={0.7}>
            <InputField
              placeholder={t('smartSociety.endDate') || 'End Date (Optional)'}
              value={endDate ? moment(endDate).format('DD/MM/YYYY') : ''}
              editable={false}
              pointerEvents="none"
            />
          </TouchableOpacity>
        </View>

        {/* End Time */}
        <View style={AddEventStyles.section}>
          <TouchableOpacity onPress={handleEndTimePicker} activeOpacity={0.7}>
            <InputField
              placeholder={t('smartSociety.endTime') || 'End Time (Optional)'}
              value={endTime ? moment(endTime).format('HH:mm') : ''}
              editable={false}
              pointerEvents="none"
            />
          </TouchableOpacity>
        </View>

        <View style={AddEventStyles.section}>
          <InputField
            placeholder={`${t('smartSociety.location') || 'Location'}*`}
            value={location}
            onChangeText={(text) => {
              setLocation(text);
              if (locationError) setLocationError('');
            }}
            error={locationError}
          />
        </View>

        {/* Venue */}
        <View style={AddEventStyles.section}>
          <InputField
            placeholder={t('smartSociety.venue') || 'Venue (Optional)'}
            value={venue}
            onChangeText={setVenue}
          />
        </View>

        {/* Event Type */}
        <View style={AddEventStyles.section}>
          <Text style={AddEventStyles.label}>
            {t('smartSociety.eventCategory')}
          </Text>
          <View style={AddEventStyles.dropdownWrapper}>
            <Dropdowns
              data={[
                { label: t('smartSociety.general') || 'General', value: 'General' },
                { label: t('smartSociety.meeting') || 'Meeting', value: 'Meeting' },
                { label: t('smartSociety.festival') || 'Festival', value: 'Festival' },
                { label: t('smartSociety.sports') || 'Sports', value: 'Sports' },
                { label: t('smartSociety.cultural') || 'Cultural', value: 'Cultural' },
                { label: t('smartSociety.religious') || 'Religious', value: 'Religious' },
                { label: t('smartSociety.social') || 'Social', value: 'Social' },
                { label: t('smartSociety.educational') || 'Educational', value: 'Educational' },
                { label: t('smartSociety.health') || 'Health', value: 'Health' },
                { label: t('smartSociety.community') || 'Community', value: 'Community' },
                { label: t('smartSociety.other') || 'Other', value: 'Other' },
              ]}
              value={eventType}
              placeholder={t('smartSociety.selectEventCategory')}
              onChange={setEventType}
            />
          </View>
        </View>

        {/* Visibility */}
        <View style={AddEventStyles.section}>
          <Text style={AddEventStyles.label}>
            {t('smartSociety.visibility') || 'Visibility'}
          </Text>
          <View style={AddEventStyles.dropdownWrapper}>
            <Dropdowns
              data={[
                { label: t('smartSociety.public') || 'Public', value: 'Public' },
                { label: t('smartSociety.private') || 'Private', value: 'Private' },
                { label: t('smartSociety.membersOnly') || 'Members Only', value: 'Members Only' },
                { label: t('smartSociety.committeeOnly') || 'Committee Only', value: 'Committee Only' },
              ]}
              value={visibility}
              placeholder={t('smartSociety.selectVisibility') || 'Select Visibility'}
              onChange={setVisibility}
            />
          </View>
        </View>

        {/* Event Status */}
        <View style={AddEventStyles.section}>
          <Text style={AddEventStyles.label}>
            {t('smartSociety.status')}
          </Text>
          <View style={AddEventStyles.dropdownWrapper}>
            <Dropdowns
              data={[
                { label: t('smartSociety.draft'), value: 'Draft' },
                { label: t('smartSociety.published'), value: 'Published' },
                { label: t('smartSociety.cancelled'), value: 'Cancelled' },
              ]}
              value={status}
              placeholder={t('smartSociety.selectStatus')}
              onChange={setStatus}
            />
          </View>
        </View>

        {/* Event Priority */}
        <View style={AddEventStyles.section}>
          <Text style={AddEventStyles.label}>{t('smartSociety.priority')}</Text>
          <View style={AddEventStyles.dropdownWrapper}>
            <Dropdowns
              data={[
                { label: t('smartSociety.low') || 'Low', value: 'Low' },
                { label: t('smartSociety.medium') || 'Medium', value: 'Medium' },
                { label: t('smartSociety.high') || 'High', value: 'High' },
                { label: t('smartSociety.urgent') || 'Urgent', value: 'Urgent' },
              ]}
              value={priority}
              placeholder={t('smartSociety.selectPriority')}
              onChange={setPriority}
            />
          </View>
        </View>

        {/* Maximum Capacity */}
        <View style={AddEventStyles.section}>
          <InputField
            placeholder={t('smartSociety.maximumCapacity') || 'Maximum Participants'}
            value={maxCapacity}
            onChangeText={text => {
              // Allow only numbers
              const numericValue = text.replace(/[^0-9]/g, '');
              setMaxCapacity(numericValue);
            }}
            keyboardType="number-pad"
          />
          <Text style={AddEventStyles.helperText}>
            {t('smartSociety.maximumCapacityHelper')}
          </Text>
        </View>

        {/* Requires Registration */}
        <View style={AddEventStyles.section}>
          <View style={AddEventStyles.switchRow}>
            <View style={AddEventStyles.switchLabelContainer}>
              <Text style={AddEventStyles.label}>
                {t('smartSociety.requiresRegistration') || 'Requires Registration'}
              </Text>
              <Text style={AddEventStyles.switchSubLabel}>
                {t('smartSociety.requiresRegistrationDescription') || 'Enable if participants need to register'}
              </Text>
            </View>
            <CustomSwitch value={requiresRegistration} onValueChange={setRequiresRegistration} />
          </View>
        </View>

        {/* Registration Deadline */}
        {requiresRegistration && (
          <View style={AddEventStyles.section}>
            <TouchableOpacity onPress={handleRegistrationDeadlinePicker} activeOpacity={0.7}>
              <InputField
                placeholder={t('smartSociety.registrationDeadline')}
                value={registrationDeadline ? moment(registrationDeadline).format('DD/MM/YYYY') : ''}
                editable={false}
                pointerEvents="none"
              />
            </TouchableOpacity>
            <Text style={AddEventStyles.helperText}>
              {t('smartSociety.registrationDeadlineHelper')}
            </Text>
          </View>
        )}

        {/* Estimated Budget */}
        <View style={AddEventStyles.section}>
          <InputField
            placeholder={t('smartSociety.estimatedBudget') || 'Estimated Budget (Optional)'}
            value={estimatedBudget}
            onChangeText={text => {
              // Allow only numbers and one decimal point
              const numericValue = text.replace(/[^0-9.]/g, '');
              const parts = numericValue.split('.');
              if (parts.length > 2) {
                setEstimatedBudget(parts[0] + '.' + parts.slice(1).join(''));
              } else {
                setEstimatedBudget(numericValue);
              }
            }}
            keyboardType="decimal-pad"
          />
        </View>

        {/* Agenda */}
        <View style={AddEventStyles.section}>
          <InputField
            placeholder={t('smartSociety.agenda') || 'Agenda (Optional)'}
            value={agenda}
            onChangeText={setAgenda}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            style={AddEventStyles.textArea}
          />
          <Text style={AddEventStyles.helperText}>
            {t('smartSociety.agendaHelper') || 'Enter agenda items separated by new lines'}
          </Text>
        </View>

        <View style={AddEventStyles.section}>
          <InputField
            placeholder={`${t('smartSociety.description')}*`}
            value={description}
            onChangeText={(text) => {
              setDescription(text);
              if (descriptionError) setDescriptionError('');
            }}
            error={descriptionError}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            style={AddEventStyles.textArea}
          />
        </View>

        {/* Contact Person */}
        <View style={AddEventStyles.section}>
          <Text style={AddEventStyles.label}>
            {t('smartSociety.contactPerson') || 'Contact Person (Optional)'}
          </Text>
          <InputField
            placeholder={t('smartSociety.contactName') || 'Name'}
            value={contactName}
            onChangeText={setContactName}
            style={{ marginBottom: 12 }}
          />
          <InputField
            placeholder={t('smartSociety.contactMobile') || 'Mobile Number'}
            value={contactMobile}
            onChangeText={text => {
              // Allow only numbers
              const numericValue = text.replace(/[^0-9]/g, '');
              setContactMobile(numericValue);
            }}
            keyboardType="phone-pad"
            style={{ marginBottom: 12 }}
          />
          <InputField
            placeholder={t('smartSociety.contactEmail') || 'Email'}
            value={contactEmail}
            onChangeText={setContactEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Banner Image */}
        <View style={AddEventStyles.section}>
          <Text style={AddEventStyles.label}>
            {t('smartSociety.bannerImage') || 'Banner Image (Optional)'}
          </Text>
          {bannerImage ? (
            <View style={AddEventStyles.imageContainer}>
              <Image
                source={{ uri: bannerImage }}
                style={[AddEventStyles.eventImage, { height: 150 }]}
              />
              <TouchableOpacity
                style={AddEventStyles.removeImageButton}
                onPress={handleRemoveBannerImage}
              >
                <Text style={AddEventStyles.removeImageText}>
                  {t('common.remove')}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={AddEventStyles.imagePickerButton}
              onPress={handleBannerImagePicker}
            >
              <Text style={AddEventStyles.imagePickerText}>
                {t('smartSociety.addBannerImage') || 'Add Banner Image'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Event Image/Poster */}
        <View style={AddEventStyles.section}>
          <Text style={AddEventStyles.label}>
            {t('smartSociety.eventPosterOptional')}
          </Text>
          {eventImage ? (
            <View style={AddEventStyles.imageContainer}>
              <Image
                source={{ uri: eventImage }}
                style={AddEventStyles.eventImage}
              />
              <TouchableOpacity
                style={AddEventStyles.removeImageButton}
                onPress={handleRemoveImage}
              >
                <Text style={AddEventStyles.removeImageText}>
                  {t('common.remove')}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={AddEventStyles.imagePickerButton}
              onPress={handleImagePicker}
            >
              <Text style={AddEventStyles.imagePickerText}>
                {t('smartSociety.addImage')}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Paid Event Section */}
        <View style={AddEventStyles.section}>
          <View style={AddEventStyles.switchRow}>
            <View style={AddEventStyles.switchLabelContainer}>
              <Text style={AddEventStyles.label}>
                {t('smartSociety.paidEvent')}
              </Text>
              <Text style={AddEventStyles.switchSubLabel}>
                {t('smartSociety.enablePaidEventDescription')}
              </Text>
            </View>
            <CustomSwitch value={isPaid} onValueChange={setIsPaid} />
          </View>
          {isPaid && (
            <View style={AddEventStyles.amountContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Text style={AddEventStyles.currencySymbol}>₹</Text>
                <View style={{ flex: 1 }}>
                  <InputField
                    placeholder={`${t('smartSociety.eventAmount')}*`}
                    value={amount}
                    onChangeText={text => {
                      // Allow only numbers and one decimal point
                      const numericValue = text.replace(/[^0-9.]/g, '');
                      // Ensure only one decimal point
                      const parts = numericValue.split('.');
                      if (parts.length > 2) {
                        setAmount(parts[0] + '.' + parts.slice(1).join(''));
                      } else {
                        setAmount(numericValue);
                      }
                      if (amountError) setAmountError('');
                    }}
                    keyboardType="decimal-pad"
                    error={amountError}
                  />
                </View>
              </View>
            </View>
          )}
        </View>

        <View style={AddEventStyles.submitButton}>
          <CustomButton
            title={createEventLoading ? t('common.pleaseWait') : t('smartSociety.createEvent')}
            onPress={handleSubmit}
            disabled={createEventLoading}
          />
        </View>
      </ScrollView>

      {/* Date Picker */}
      <CalendarPicker
        visible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onSelect={handleDateSelect}
        initialDate={date ? moment(date).format('YYYY-MM-DD') : undefined}
        minDate={moment().format('YYYY-MM-DD')}
      />

      {/* Time Picker */}
      <TimePickerModal
        visible={showTimePicker}
        onClose={() => setShowTimePicker(false)}
        onConfirm={handleTimeConfirm}
        selectedTime={time || new Date()}
        onTimeChange={handleTimeChange}
      />

      {/* End Date Picker */}
      <CalendarPicker
        visible={showEndDatePicker}
        onClose={() => setShowEndDatePicker(false)}
        onSelect={handleEndDateSelect}
        initialDate={endDate ? moment(endDate).format('YYYY-MM-DD') : undefined}
        minDate={date ? moment(date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')}
      />

      {/* End Time Picker */}
      <TimePickerModal
        visible={showEndTimePicker}
        onClose={() => setShowEndTimePicker(false)}
        onConfirm={handleEndTimeConfirm}
        selectedTime={endTime || new Date()}
        onTimeChange={handleEndTimeChange}
      />

      {/* Registration Deadline Picker */}
      <CalendarPicker
        visible={showRegistrationDeadlinePicker}
        onClose={() => setShowRegistrationDeadlinePicker(false)}
        onSelect={handleRegistrationDeadlineSelect}
        initialDate={registrationDeadline ? moment(registrationDeadline).format('YYYY-MM-DD') : undefined}
        minDate={moment().format('YYYY-MM-DD')}
        maxDate={date ? moment(date).format('YYYY-MM-DD') : undefined}
      />

      {/* Image Picker Modal */}
      <ImagePickerModal
        isVisible={isImagePickerVisible}
        onClose={() => setIsImagePickerVisible(false)}
        onCameraPress={handleCameraPress}
        onGalleryPress={handleGalleryPress}
        title={t('smartSociety.selectEventImage')}
      />

      {/* Banner Image Picker Modal */}
      <ImagePickerModal
        isVisible={isBannerImagePickerVisible}
        onClose={() => setIsBannerImagePickerVisible(false)}
        onCameraPress={handleBannerCameraPress}
        onGalleryPress={handleBannerGalleryPress}
        title={t('smartSociety.selectBannerImage') || 'Select Banner Image'}
      />
    </Container>
  );
};

export default AddEvent;
