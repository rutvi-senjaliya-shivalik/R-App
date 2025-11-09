import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import DateTimePicker from '@react-native-community/datetimepicker';
import Dropdowns from '../../components/common/dropDown';
import { COLORS, FF, FS } from '../../constants';
import { useLeads } from '../../hooks/useLeads';
import { unitsService, projectsService } from '../../services/api';

// Back Arrow Icon
const BackArrowIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18L9 12L15 6"
      stroke="#000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Profile Icon
const ProfileIcon = () => (
  <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <Path
      d="M20 20C24.4183 20 28 16.4183 28 12C28 7.58172 24.4183 4 20 4C15.5817 4 12 7.58172 12 12C12 16.4183 15.5817 20 20 20Z"
      fill="#6B7280"
    />
    <Path
      d="M20 22C11.1634 22 4 29.1634 4 38H36C36 29.1634 28.8366 22 20 22Z"
      fill="#6B7280"
    />
  </Svg>
);

// Upload Icon
const UploadIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Path
      d="M17 13V15C17 15.5304 16.7893 16.0391 16.4142 16.4142C16.0391 16.7893 15.5304 17 15 17H5C4.46957 17 3.96086 16.7893 3.58579 16.4142C3.21071 16.0391 3 15.5304 3 15V13M13 6L10 3M10 3L7 6M10 3V13"
      stroke="#6B7280"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Down Arrow Icon
const DownArrowIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path
      d="M4 6L8 10L12 6"
      stroke="#6B7280"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const AddLead = ({ navigation, route }: any) => {
  const { createLead, uploadDocument, loading } = useLeads();
  const prefilledData = route?.params?.prefilledData;
  
  const [formData, setFormData] = useState({
    username: '',
    contactNumber: '',
    email: '',
    projectOfInterest: prefilledData?.projectId || '',
    projectName: prefilledData?.projectName || '',
    unitOfProject: prefilledData?.unitId || '',
    minBudget: '',
    maxBudget: '',
    sourceOfLead: '',
    remarks: '',
    followUpDate: '',
    leadStage: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [units, setUnits] = useState<Array<{ label: string; value: string }>>([]);
  const [projects, setProjects] = useState<Array<{ label: string; value: string }>>([]);
  const [loadingUnits, setLoadingUnits] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState<string[]>([]);

  // Lead source options matching backend enum
  const sourceOptions = [
    { label: 'Walk-in', value: 'Walk-in' },
    { label: 'Referral', value: 'Referral' },
    { label: 'Online', value: 'Online' },
    { label: 'Social Media', value: 'Social Media' },
    { label: 'Advertisement', value: 'Advertisement' },
    { label: 'Email Campaign', value: 'Email Campaign' },
    { label: 'Phone Call', value: 'Phone Call' },
    { label: 'Event', value: 'Event' },
    { label: 'Other', value: 'Other' },
  ];

  const unitOptions = [
    { label: '1 BHK', value: '1bhk' },
    { label: '2 BHK', value: '2bhk' },
    { label: '3 BHK', value: '3bhk' },
    { label: '4 BHK', value: '4bhk' },
    { label: 'Penthouse', value: 'penthouse' },
    { label: 'Villa', value: 'villa' },
    { label: 'Plot', value: 'plot' },
  ];

  const leadStageOptions = [
    { label: 'New Lead', value: 'New Lead' },
    { label: 'Contacted', value: 'Contacted' },
    { label: 'Site Visit Scheduled', value: 'Site Visit Scheduled' },
    { label: 'Site Visit Completed', value: 'Site Visit Completed' },
    { label: 'Negotiation', value: 'Negotiation' },
    { label: 'Booking in Progress', value: 'Booking in Progress' },
    { label: 'Booked', value: 'Booked' },
    { label: 'Lost/Dead', value: 'Lost/Dead' },
  ];

  // Fetch active projects on mount
  useEffect(() => {
    fetchActiveProjects();
  }, []);

  // Fetch units when project is selected or on mount if prefilled
  useEffect(() => {
    if (formData.projectOfInterest) {
      fetchUnits(formData.projectOfInterest);
    } else {
      setUnits([]);
      if (!prefilledData?.unitId) {
        setFormData({ ...formData, unitOfProject: '' });
      }
    }
  }, [formData.projectOfInterest]);

  // Handle prefilled unit data
  useEffect(() => {
    if (prefilledData?.unitId && prefilledData?.unitNumber) {
      // Add the prefilled unit to the units list if not already there
      const unitLabel = `${prefilledData.unitNumber} - ${prefilledData.configuration || 'N/A'}`;
      setUnits(prevUnits => {
        const exists = prevUnits.some(u => u.value === prefilledData.unitId);
        if (!exists) {
          return [...prevUnits, { label: unitLabel, value: prefilledData.unitId }];
        }
        return prevUnits;
      });
    }
  }, [prefilledData]);

  const fetchActiveProjects = async () => {
    setLoadingProjects(true);
    try {
      const response = await projectsService.getActiveProjects();
      const projectOptions = response.projects.map((project) => ({
        label: project.name,
        value: project._id,
      }));
      setProjects(projectOptions);
    } catch (error: any) {
      console.error('Error fetching projects:', error);
      Alert.alert('Error', 'Failed to load projects');
      setProjects([]);
    } finally {
      setLoadingProjects(false);
    }
  };

  const fetchUnits = async (projectId: string) => {
    setLoadingUnits(true);
    try {
      const response = await unitsService.getUnitsByProject(projectId);
      
      if (response && response.units && Array.isArray(response.units)) {
        const unitOptions = response.units.map((unit: any) => ({
          label: `${unit.unitNumber || 'Unit'} - ${unit.configuration || 'N/A'} (${unit.carpetArea || 0} sq ft)`,
          value: unit._id,
        }));
        setUnits(unitOptions);
      } else {
        setUnits([]);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to load units for selected project');
      setUnits([]);
    } finally {
      setLoadingUnits(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    
    // Store project name when project is selected
    if (field === 'projectOfInterest') {
      const selectedProject = projects.find(p => p.value === value);
      setFormData({ 
        ...formData, 
        [field]: value,
        projectName: selectedProject?.label || '',
        unitOfProject: '' // Reset unit when project changes
      });
    }
  };

  const handlePickDocument = async () => {
    Alert.alert(
      'Upload Document',
      'Choose document type',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Image',
          onPress: () => pickImage(),
        },
        {
          text: 'File',
          onPress: () => pickFile(),
        },
      ]
    );
  };

  const pickImage = async () => {
    try {
      // Use react-native-image-picker when installed
      // For now, show instructions
      Alert.alert(
        'Image Upload',
        'To enable image upload, install:\nnpm install react-native-image-picker\n\nThen uncomment the image picker code in addLead.tsx',
        [
          {
            text: 'OK',
            onPress: () => {
              // Simulate upload for testing
              const mockUrl = `image_${Date.now()}.jpg`;
              setUploadedDocuments([...uploadedDocuments, mockUrl]);
            },
          },
        ]
      );
    } catch (error: any) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const pickFile = async () => {
    try {
      // Use react-native-document-picker when installed
      // For now, show instructions
      Alert.alert(
        'File Upload',
        'To enable file upload, install:\nnpm install react-native-document-picker\n\nThen uncomment the document picker code in addLead.tsx',
        [
          {
            text: 'OK',
            onPress: () => {
              // Simulate upload for testing
              const mockUrl = `document_${Date.now()}.pdf`;
              setUploadedDocuments([...uploadedDocuments, mockUrl]);
            },
          },
        ]
      );
    } catch (error: any) {
      Alert.alert('Error', 'Failed to pick file');
    }
  };

  const handleSave = async () => {
    // Validate required fields
    if (!formData.username || !formData.contactNumber) {
      Alert.alert('Error', 'Please fill in required fields (Name and Contact Number)');
      return;
    }

    if (!formData.projectOfInterest || !formData.unitOfProject) {
      Alert.alert('Error', 'Please select project and unit');
      return;
    }

    // Ensure date is in YYYY-MM-DD format
    let followUpDate = formData.followUpDate;
    try {
      if (!followUpDate) {
        followUpDate = new Date().toISOString().split('T')[0];
      } else if (!followUpDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const date = new Date(followUpDate);
        followUpDate = date.toISOString().split('T')[0];
      }
    } catch (dateError) {
      followUpDate = new Date().toISOString().split('T')[0];
    }

    const payload = {
      clientName: formData.username,
      clientContactNumber: formData.contactNumber,
      clientEmail: formData.email || '',
      projectId: formData.projectOfInterest,
      projectName: formData.projectName,
      unitId: formData.unitOfProject,
      minBudget: parseInt(formData.minBudget) || 0,
      maxBudget: parseInt(formData.maxBudget) || 0,
      leadSource: formData.sourceOfLead || 'Online',
      remark: formData.remarks || '',
      nextFollowupDate: followUpDate,
      documents: uploadedDocuments,
      stage: formData.leadStage || 'New Lead',
    };

    try {
      const response = await createLead(payload);
      Alert.alert('Success', 'Lead created successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create lead';
      Alert.alert('Error', errorMessage);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };



  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
      // Format date as YYYY-MM-DD for API
      const formattedDate = date.toISOString().split('T')[0];
      handleInputChange('followUpDate', formattedDate);
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel} style={styles.backButton}>
          <BackArrowIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Lead</Text>
        <View style={styles.profileIcon}>
          <ProfileIcon />
        </View>
      </View>

      {/* Form */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Username */}
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          placeholderTextColor="#9CA3AF"
          value={formData.username}
          onChangeText={(text) => handleInputChange('username', text)}
        />

        {/* Contact Number */}
        <TextInput
          style={styles.input}
          placeholder="Enter Contact Number"
          placeholderTextColor="#9CA3AF"
          keyboardType="phone-pad"
          value={formData.contactNumber}
          onChangeText={(text) => handleInputChange('contactNumber', text)}
        />

        {/* Email */}
        <TextInput
          style={styles.input}
          placeholder="Enter Email Address"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          autoCapitalize="none"
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
        />

        {/* Project of Interest */}
        {loadingProjects ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#000000" />
            <Text style={styles.loadingText}>Loading projects...</Text>
          </View>
        ) : (
          <Dropdowns
            data={projects}
            value={formData.projectOfInterest}
            placeholder="Project of Interest"
            onChange={(value) => handleInputChange('projectOfInterest', value)}
            dropdownStyle={styles.dropdownField}
            search={true}
            searchPlaceholder="Search projects..."
          />
        )}

        {/* Unit of Project */}
        {loadingUnits ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#000000" />
            <Text style={styles.loadingText}>Loading units...</Text>
          </View>
        ) : units.length > 0 ? (
          <Dropdowns
            data={units}
            value={formData.unitOfProject}
            placeholder="Unit of Project"
            onChange={(value) => handleInputChange('unitOfProject', value)}
            dropdownStyle={styles.dropdownField}
          />
        ) : formData.projectOfInterest ? (
          <View style={styles.noUnitsContainer}>
            <Text style={styles.noUnitsText}>No units available for this project</Text>
          </View>
        ) : (
          <View style={styles.noUnitsContainer}>
            <Text style={styles.noUnitsText}>Please select a project first</Text>
          </View>
        )}

        {/* Budget Row */}
        <View style={styles.budgetRow}>
          <TextInput
            style={[styles.input, styles.budgetInput]}
            placeholder="Min Budget"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            value={formData.minBudget}
            onChangeText={(text) => handleInputChange('minBudget', text)}
          />
          <TextInput
            style={[styles.input, styles.budgetInput]}
            placeholder="Max Budget"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            value={formData.maxBudget}
            onChangeText={(text) => handleInputChange('maxBudget', text)}
          />
        </View>

        {/* Source of Lead */}
        <Dropdowns
          data={sourceOptions}
          value={formData.sourceOfLead}
          placeholder="Source of Lead"
          onChange={(value) => handleInputChange('sourceOfLead', value)}
          dropdownStyle={styles.dropdownField}
        />

        {/* Additional Remarks */}
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Add Additional Remarks"
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={formData.remarks}
          onChangeText={(text) => handleInputChange('remarks', text)}
        />

        {/* Follow-Up Date */}
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={showDatePickerModal}
        >
          <Text
            style={[
              styles.dateText,
              !formData.followUpDate && styles.placeholderTextStyle,
            ]}
          >
            {formData.followUpDate || 'Follow-Up Date'}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
            minimumDate={new Date()}
          />
        )}

        {/* Upload Documents */}
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handlePickDocument}
        >
          <UploadIcon />
          <Text style={styles.uploadText}>
            Upload Documents {uploadedDocuments.length > 0 && `(${uploadedDocuments.length})`}
          </Text>
        </TouchableOpacity>

        {/* Lead Stage */}
        <Dropdowns
          data={leadStageOptions}
          value={formData.leadStage}
          placeholder="Lead Stage"
          onChange={(value) => handleInputChange('leadStage', value)}
          dropdownStyle={styles.dropdownField}
        />

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.saveButton, loading && styles.saveButtonDisabled]} 
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color={COLORS.WHITE} />
            ) : (
              <Text style={styles.saveButtonText}>Save Lead</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: COLORS.WHITE,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    fontWeight: '600',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  input: {
    height: 50,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK,
  },
  dropdownField: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    borderBottomWidth: 0,
    marginBottom: 12,
    marginTop: 0,
  },
  budgetRow: {
    flexDirection: 'row',
    gap: 12,
  },
  budgetInput: {
    flex: 1,
  },
  textArea: {
    height: 120,
    paddingTop: 16,
    paddingBottom: 16,
  },
  datePickerButton: {
    height: 50,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
    justifyContent: 'center',
  },
  dateText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK,
  },
  placeholderTextStyle: {
    color: '#9CA3AF',
  },
  uploadButton: {
    height: 50,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  uploadText: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: '#6B7280',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#6B7280',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.WHITE,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#000000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.WHITE,
    fontWeight: '600',
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  loadingContainer: {
    height: 50,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  loadingText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: '#6B7280',
  },
  noUnitsContainer: {
    height: 50,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    marginBottom: 12,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  noUnitsText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: '#9CA3AF',
  },
});

export default AddLead;
