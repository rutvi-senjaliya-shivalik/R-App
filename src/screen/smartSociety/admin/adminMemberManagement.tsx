import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import { Container, HeaderComponent, SearchInput, InputField, CustomButton, Dropdowns } from '../../../components/common';
import AdminMemberManagementStyles from './styles/adminMemberManagementStyles';
import { COLORS } from '../../../constants';
import { useTranslation } from '../../../context/LanguageContext';
import { MakeApiRequest } from '../../../services/apiService';
import {
  GET_ALL_UNITS,
  CREATE_UNIT,
  UPDATE_UNIT,
  DELETE_UNIT,
  ASSIGN_UNIT,
  UNASSIGN_UNIT,
  GET_UNIT_BY_ID,
} from '../../../services/httpService';
import { GET, POST, PUT, DELETE } from '../../../constants/api';

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

interface Member {
  id: string;
  name: string;
  flatNo: string;
  wing: string;
  role: 'Owner' | 'Tenant';
  mobile: string;
  email: string;
  parkingSlot?: string;
  photoUrl?: string;
  unitId?: string;
  unit?: Unit;
}

const AdminMemberManagement = (props: any) => {
  const { t } = useTranslation();
  const isMountedRef = useRef(true);
  const selectedRole = props.route?.params?.selectedRole;
  const [members, setMembers] = useState<Member[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'owner' | 'tenant'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    flatNo: '',
    wing: '',
    mobile: '',
    email: '',
    role: 'Owner' as 'Owner' | 'Tenant',
    parkingSlot: '',
    blockId: '',
    unitType: '',
    area: '',
    floor: '',
  });

  useEffect(() => {
    isMountedRef.current = true;
    // Check if user is admin
    if (selectedRole?.id !== 'admin') {
      Alert.alert(
        t('common.accessDenied') || 'Access Denied',
        t('errors.adminOnlyFeature') || 'This feature is only available for administrators.',
        [
          {
            text: t('common.ok') || 'OK',
            onPress: () => props.navigation?.goBack(),
          },
        ],
      );
      return;
    }
    loadData();
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const loadUnits = async () => {
    try {
      const response = await MakeApiRequest({
        apiUrl: GET_ALL_UNITS({ page: 1, limit: 100 }),
        apiMethod: GET,
      });
      if (response?.data?.data) {
        const unitsData = Array.isArray(response.data.data) ? response.data.data : response.data.data.units || [];
        return unitsData;
      }
      return [];
    } catch (error: any) {
      console.error('Error loading units:', error);
      // Continue with empty units array if API fails
      return [];
    }
  };

  const loadMembers = async (unitsData: Unit[] = []) => {
    try {
      // TODO: Fetch members from API
      // For now, using mock data but integrating with units
      const mockMembers: Member[] = [
        {
          id: 'mem001',
          name: 'Jay Sarvaiya',
          flatNo: 'A-101',
          wing: 'A',
          role: 'Owner',
          mobile: '9876543210',
          email: 'jay@example.com',
          parkingSlot: 'P-12',
        },
        {
          id: 'mem002',
          name: 'Priya Patel',
          flatNo: 'B-204',
          wing: 'B',
          role: 'Tenant',
          mobile: '9876543211',
          email: 'priya@example.com',
        },
        {
          id: 'mem003',
          name: 'Rajesh Kumar',
          flatNo: 'C-305',
          wing: 'C',
          role: 'Owner',
          mobile: '9876543212',
          email: 'rajesh@example.com',
          parkingSlot: 'P-5',
        },
      ];
      
      // Match members with units based on unitNumber
      const membersWithUnits = mockMembers.map(member => {
        const unit = unitsData.find(u => u.unitNumber === member.flatNo);
        return {
          ...member,
          unitId: unit?.id,
          unit: unit,
        };
      });
      
      setMembers(membersWithUnits);
    } catch (error: any) {
      console.error('Error loading members:', error);
      Alert.alert(
        t('common.error') || 'Error',
        t('smartSociety.errorLoadingMembers') || 'Failed to load members',
      );
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const unitsData = await loadUnits();
      setUnits(unitsData);
      await loadMembers(unitsData);
    } catch (error: any) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      flatNo: '',
      wing: '',
      mobile: '',
      email: '',
      role: 'Owner',
      parkingSlot: '',
      blockId: '',
      unitType: '',
      area: '',
      floor: '',
    });
    setEditingMember(null);
  };

  const handleAddMember = () => {
    resetForm();
    setShowAddModal(true);
  };

  const handleEditMember = (member: Member) => {
    // Parse flatNo to extract wing and flat number if needed
    const flatParts = member.flatNo.split('-');
    const wing = flatParts.length > 1 ? flatParts[0] : member.wing;
    const flatNo = flatParts.length > 1 ? flatParts[1] : member.flatNo;
    
    setFormData({
      name: member.name,
      flatNo: flatNo,
      wing: wing,
      mobile: member.mobile,
      email: member.email,
      role: member.role,
      parkingSlot: member.parkingSlot || '',
      blockId: member.unit?.blockId || '',
      unitType: member.unit?.unitType || '',
      area: member.unit?.area?.toString() || '',
      floor: member.unit?.floor?.toString() || '',
    });
    setEditingMember(member);
    setShowAddModal(true);
  };

  const handleDeleteMember = async (member: Member) => {
    Alert.alert(
      t('common.delete') || 'Delete Member',
      t('smartSociety.confirmDeleteMember', { name: member.name }) || `Are you sure you want to delete ${member.name}?`,
      [
        { text: t('common.cancel') || 'Cancel', style: 'cancel' },
        {
          text: t('common.delete') || 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              // If member has a unit assigned, unassign it first
              if (member.unitId) {
                try {
                  await MakeApiRequest({
                    apiUrl: UNASSIGN_UNIT(member.unitId),
                    apiMethod: POST,
                    apiData: {
                      reason: 'Member deleted',
                      effectiveDate: new Date().toISOString(),
                    },
                  });
                } catch (error) {
                  console.error('Error unassigning unit:', error);
                }
              }
              
              // TODO: Delete member via API
              // For now, just remove from local state
              setMembers(members.filter(m => m.id !== member.id));
              Alert.alert(t('common.success') || 'Success', t('smartSociety.memberDeleted') || 'Member deleted successfully');
            } catch (error: any) {
              console.error('Error deleting member:', error);
              Alert.alert(
                t('common.error') || 'Error',
                error?.response?.data?.message || t('smartSociety.errorDeletingMember') || 'Failed to delete member',
              );
            } finally {
              setLoading(false);
            }
          },
        },
      ],
    );
  };

  const handleSaveMember = async () => {
    if (!formData.name || !formData.flatNo || !formData.mobile || !formData.email) {
      Alert.alert(t('common.error') || 'Error', t('smartSociety.fillAllFields') || 'Please fill all required fields');
      return;
    }

    try {
      setLoading(true);
      const unitNumber = `${formData.wing}-${formData.flatNo}`;
      
      if (editingMember) {
        // Update member
        // TODO: Update member via API
        
        const oldUnitNumber = editingMember.flatNo;
        const unitNumberChanged = oldUnitNumber !== unitNumber;
        
        // If unit number changed, unassign old unit first
        if (unitNumberChanged && editingMember.unitId) {
          try {
            await MakeApiRequest({
              apiUrl: UNASSIGN_UNIT(editingMember.unitId),
              apiMethod: POST,
              apiData: {
                reason: 'Unit number changed',
                effectiveDate: new Date().toISOString(),
              },
            });
          } catch (error) {
            console.error('Error unassigning old unit:', error);
          }
        }
        
        // Find or create unit for the new unit number
        let unit = units.find(u => u.unitNumber === unitNumber);
        
        if (!unit) {
          // Create new unit
          try {
            const createUnitResponse = await MakeApiRequest({
              apiUrl: CREATE_UNIT,
              apiMethod: POST,
              apiData: {
                unitNumber: unitNumber,
                ...(formData.blockId && { blockId: formData.blockId }),
                ...(formData.unitType && { unitType: formData.unitType }),
                ...(formData.area && { area: parseFloat(formData.area) }),
                ...(formData.floor && { floor: parseInt(formData.floor) }),
                unitStatus: 'OCCUPIED',
                amenities: [],
              },
            });
            
            if (createUnitResponse?.data?.data) {
              unit = createUnitResponse.data.data;
              setUnits([...units, unit]);
            }
          } catch (error: any) {
            console.error('Error creating unit:', error);
            Alert.alert(
              t('common.error') || 'Error',
              error?.response?.data?.message || t('smartSociety.errorCreatingUnit') || 'Failed to create unit',
            );
          }
        } else {
          // Update existing unit details if provided
          if (formData.blockId || formData.unitType || formData.area || formData.floor || unitNumberChanged) {
            try {
              const updateResponse = await MakeApiRequest({
                apiUrl: UPDATE_UNIT(unit.id),
                apiMethod: PUT,
                apiData: {
                  ...(formData.blockId && { blockId: formData.blockId }),
                  ...(formData.unitType && { unitType: formData.unitType }),
                  ...(formData.area && { area: parseFloat(formData.area) }),
                  ...(formData.floor && { floor: parseInt(formData.floor) }),
                  unitNumber: unitNumber,
                },
              });
              
              if (updateResponse?.data?.data) {
                unit = updateResponse.data.data;
                setUnits(units.map(u => u.id === unit.id ? unit : u));
              }
            } catch (error) {
              console.error('Error updating unit:', error);
            }
          }
        }
        
        // Assign unit to member (if not already assigned or unit changed)
        if (unit?.id && (unitNumberChanged || !editingMember.unitId)) {
          try {
            await MakeApiRequest({
              apiUrl: ASSIGN_UNIT(unit.id),
              apiMethod: POST,
              apiData: {
                memberId: editingMember.id,
                occupancyType: formData.role.toUpperCase(),
                occupancyStartDate: new Date().toISOString(),
              },
            });
            
            // Update unit with memberId
            unit.memberId = editingMember.id;
          } catch (error: any) {
            console.error('Error assigning unit:', error);
            Alert.alert(
              t('common.warning') || 'Warning',
              error?.response?.data?.message || t('smartSociety.errorAssigningUnit') || 'Member updated but unit assignment failed',
            );
          }
        }
        
        // Update local state
        const updatedMember: Member = {
          ...editingMember,
          ...formData,
          flatNo: unitNumber,
          unitId: unit?.id,
          unit: unit,
        };
        
        setMembers(
          members.map(m =>
            m.id === editingMember.id ? updatedMember : m,
          ),
        );
        Alert.alert(t('common.success') || 'Success', t('smartSociety.memberUpdated') || 'Member updated successfully');
      } else {
        // Create new member
        // TODO: Create member via API
        const newMemberId = `mem${Date.now()}`;
        const newMember: Member = {
          id: newMemberId,
          ...formData,
          flatNo: unitNumber,
        };
        
        // Find or create unit and assign to member
        let unit = units.find(u => u.unitNumber === unitNumber);
        
        if (!unit) {
          // Create new unit
          try {
            const createUnitResponse = await MakeApiRequest({
              apiUrl: CREATE_UNIT,
              apiMethod: POST,
              apiData: {
                unitNumber: unitNumber,
                ...(formData.blockId && { blockId: formData.blockId }),
                ...(formData.unitType && { unitType: formData.unitType }),
                ...(formData.area && { area: parseFloat(formData.area) }),
                ...(formData.floor && { floor: parseInt(formData.floor) }),
                unitStatus: 'OCCUPIED',
                amenities: [],
              },
            });
            
            if (createUnitResponse?.data?.data) {
              unit = createUnitResponse.data.data;
              setUnits([...units, unit]);
            }
          } catch (error: any) {
            console.error('Error creating unit:', error);
            Alert.alert(
              t('common.error') || 'Error',
              error?.response?.data?.message || t('smartSociety.errorCreatingUnit') || 'Failed to create unit',
            );
          }
        }
        
        // Assign unit to member
        if (unit?.id) {
          try {
            await MakeApiRequest({
              apiUrl: ASSIGN_UNIT(unit.id),
              apiMethod: POST,
              apiData: {
                memberId: newMemberId,
                occupancyType: formData.role.toUpperCase(),
                occupancyStartDate: new Date().toISOString(),
              },
            });
            
            newMember.unitId = unit.id;
            newMember.unit = unit;
          } catch (error: any) {
            console.error('Error assigning unit:', error);
            Alert.alert(
              t('common.warning') || 'Warning',
              error?.response?.data?.message || t('smartSociety.errorAssigningUnit') || 'Member created but unit assignment failed',
            );
          }
        }
        
        setMembers([...members, newMember]);
        Alert.alert(t('common.success') || 'Success', t('smartSociety.memberAdded') || 'Member added successfully');
      }
      
      setShowAddModal(false);
      resetForm();
    } catch (error: any) {
      console.error('Error saving member:', error);
      Alert.alert(
        t('common.error') || 'Error',
        error?.response?.data?.message || t('smartSociety.errorSavingMember') || 'Failed to save member',
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.flatNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.wing.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.mobile.includes(searchQuery);
    const matchesFilter = filter === 'all' || member.role.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const roleOptions = [
    { label: t('smartSociety.owner') || 'Owner', value: 'Owner' },
    { label: t('smartSociety.tenant') || 'Tenant', value: 'Tenant' },
  ];

  const renderMemberCard = ({ item }: { item: Member }) => {
    return (
      <View style={AdminMemberManagementStyles.memberCard}>
        <View style={AdminMemberManagementStyles.memberHeader}>
          <View style={AdminMemberManagementStyles.memberHeaderLeft}>
            <Text style={AdminMemberManagementStyles.memberName}>{item.name}</Text>
            <View style={AdminMemberManagementStyles.memberInfo}>
              <Text style={AdminMemberManagementStyles.flatNo}>{item.flatNo}</Text>
              <Text style={AdminMemberManagementStyles.wing}>Wing: {item.wing}</Text>
            </View>
          </View>
          <View
            style={[
              AdminMemberManagementStyles.roleBadge,
              {
                backgroundColor: item.role === 'Owner' ? COLORS.OCEAN_BLUE_BG : COLORS.LIGHT_GREEN,
                borderColor: item.role === 'Owner' ? COLORS.OCEAN_BLUE_BORDER : COLORS.LIGHT_BORDER_GREEN,
              },
            ]}
          >
            <Text
              style={[
                AdminMemberManagementStyles.roleBadgeText,
                {
                  color: item.role === 'Owner' ? COLORS.OCEAN_BLUE_TEXT : COLORS.GREEN_TEXT,
                },
              ]}
            >
              {item.role}
            </Text>
          </View>
        </View>
        <View style={AdminMemberManagementStyles.memberDetails}>
          <View style={AdminMemberManagementStyles.detailRow}>
            <Text style={AdminMemberManagementStyles.detailLabel}>📱 {t('smartSociety.mobile') || 'Mobile'}:</Text>
            <Text style={AdminMemberManagementStyles.detailValue}>{item.mobile}</Text>
          </View>
          <View style={AdminMemberManagementStyles.detailRow}>
            <Text style={AdminMemberManagementStyles.detailLabel}>✉️ {t('smartSociety.email') || 'Email'}:</Text>
            <Text style={AdminMemberManagementStyles.detailValue}>{item.email}</Text>
          </View>
          {item.parkingSlot && (
            <View style={AdminMemberManagementStyles.detailRow}>
              <Text style={AdminMemberManagementStyles.detailLabel}>🚗 {t('smartSociety.parkingSlot') || 'Parking'}:</Text>
              <Text style={AdminMemberManagementStyles.detailValue}>{item.parkingSlot}</Text>
            </View>
          )}
          {item.unit && (
            <View style={AdminMemberManagementStyles.detailRow}>
              <Text style={AdminMemberManagementStyles.detailLabel}>🏠 {t('smartSociety.unit') || 'Unit'}:</Text>
              <Text style={AdminMemberManagementStyles.detailValue}>
                {item.unit.unitNumber}
                {item.unit.unitType && ` (${item.unit.unitType})`}
                {item.unit.area && ` - ${item.unit.area} sq.ft`}
              </Text>
            </View>
          )}
        </View>
        <View style={AdminMemberManagementStyles.actionButtons}>
          <TouchableOpacity
            style={[AdminMemberManagementStyles.actionButton, AdminMemberManagementStyles.editButton]}
            onPress={() => handleEditMember(item)}
          >
            <Text style={AdminMemberManagementStyles.editButtonText}>{t('common.edit') || 'Edit'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[AdminMemberManagementStyles.actionButton, AdminMemberManagementStyles.deleteButton]}
            onPress={() => handleDeleteMember(item)}
          >
            <Text style={AdminMemberManagementStyles.deleteButtonText}>{t('common.delete') || 'Delete'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (selectedRole?.id !== 'admin') {
    return null; // Will redirect via useEffect
  }

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.memberManagement') || 'Member Management'}
        onPress={() => props.navigation?.goBack()}
      />
      <View style={AdminMemberManagementStyles.container}>
        <View style={AdminMemberManagementStyles.searchContainer}>
          <SearchInput
            placeholder={t('smartSociety.searchMembers') || 'Search by name, flat, wing, or mobile'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={AdminMemberManagementStyles.filterContainer}>
          {(['all', 'owner', 'tenant'] as const).map(filterType => (
            <TouchableOpacity
              key={filterType}
              style={[
                AdminMemberManagementStyles.filterTab,
                filter === filterType && AdminMemberManagementStyles.filterTabActive,
              ]}
              onPress={() => setFilter(filterType)}
            >
              <Text
                style={[
                  AdminMemberManagementStyles.filterTabText,
                  filter === filterType && AdminMemberManagementStyles.filterTabTextActive,
                ]}
              >
                {filterType === 'all'
                  ? t('common.all') || 'All'
                  : filterType === 'owner'
                  ? t('smartSociety.owner') || 'Owner'
                  : t('smartSociety.tenant') || 'Tenant'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={AdminMemberManagementStyles.addButton} onPress={handleAddMember}>
          <Text style={AdminMemberManagementStyles.addButtonText}>
            + {t('smartSociety.addNewMember') || 'Add New Member'}
          </Text>
        </TouchableOpacity>

        {loading && (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <ActivityIndicator size="large" color={COLORS.OCEAN_BLUE_BG} />
          </View>
        )}

        <FlatList
          data={filteredMembers}
          renderItem={renderMemberCard}
          keyExtractor={item => item.id}
          contentContainerStyle={AdminMemberManagementStyles.membersList}
          ListEmptyComponent={
            <View style={AdminMemberManagementStyles.emptyState}>
              <Text style={AdminMemberManagementStyles.emptyStateText}>
                {t('smartSociety.noMembersFound') || 'No members found'}
              </Text>
            </View>
          }
        />
      </View>

      {/* Add/Edit Member Modal */}
      <Modal
        isVisible={showAddModal}
        onBackdropPress={() => {
          setShowAddModal(false);
          resetForm();
        }}
        onBackButtonPress={() => {
          setShowAddModal(false);
          resetForm();
        }}
        style={AdminMemberManagementStyles.modal}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={AdminMemberManagementStyles.modalContent}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={AdminMemberManagementStyles.modalHeader}>
              <Text style={AdminMemberManagementStyles.modalTitle}>
                {editingMember
                  ? t('smartSociety.editMember') || 'Edit Member'
                  : t('smartSociety.addNewMember') || 'Add New Member'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
              >
                <Text style={AdminMemberManagementStyles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={AdminMemberManagementStyles.formContainer}>
              <View style={AdminMemberManagementStyles.inputContainer}>
                <Text style={AdminMemberManagementStyles.label}>
                  {t('smartSociety.fullName') || 'Full Name'} *
                </Text>
                <InputField
                  placeholder={t('smartSociety.enterFullName') || 'Enter full name'}
                  value={formData.name}
                  onChangeText={text => setFormData({ ...formData, name: text })}
                />
              </View>

              <View style={AdminMemberManagementStyles.inputRow}>
                <View style={[AdminMemberManagementStyles.inputContainer, { flex: 1, marginRight: 8 }]}>
                  <Text style={AdminMemberManagementStyles.label}>
                    {t('smartSociety.wing') || 'Wing'} *
                  </Text>
                  <InputField
                    placeholder={t('smartSociety.enterWing') || 'A, B, C...'}
                    value={formData.wing}
                    onChangeText={text => setFormData({ ...formData, wing: text.toUpperCase() })}
                    maxLength={2}
                  />
                </View>
                <View style={[AdminMemberManagementStyles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                  <Text style={AdminMemberManagementStyles.label}>
                    {t('smartSociety.flatNo') || 'Flat No'} *
                  </Text>
                  <InputField
                    placeholder={t('smartSociety.enterFlatNo') || '101, 102...'}
                    value={formData.flatNo}
                    onChangeText={text => setFormData({ ...formData, flatNo: text })}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={AdminMemberManagementStyles.inputContainer}>
                <Text style={AdminMemberManagementStyles.label}>
                  {t('smartSociety.mobileNumber') || 'Mobile Number'} *
                </Text>
                <InputField
                  placeholder={t('smartSociety.enterMobile') || 'Enter mobile number'}
                  value={formData.mobile}
                  onChangeText={text => setFormData({ ...formData, mobile: text })}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
              </View>

              <View style={AdminMemberManagementStyles.inputContainer}>
                <Text style={AdminMemberManagementStyles.label}>
                  {t('smartSociety.emailId') || 'Email ID'} *
                </Text>
                <InputField
                  placeholder={t('smartSociety.enterEmail') || 'Enter email address'}
                  value={formData.email}
                  onChangeText={text => setFormData({ ...formData, email: text })}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={AdminMemberManagementStyles.inputContainer}>
                <Text style={AdminMemberManagementStyles.label}>
                  {t('smartSociety.role') || 'Role'} *
                </Text>
                <Dropdowns
                  data={roleOptions}
                  value={formData.role}
                  placeholder={t('smartSociety.selectRole') || 'Select role'}
                  onChange={value => setFormData({ ...formData, role: value as 'Owner' | 'Tenant' })}
                />
              </View>

              <View style={AdminMemberManagementStyles.inputContainer}>
                <Text style={AdminMemberManagementStyles.label}>
                  {t('smartSociety.parkingSlot') || 'Parking Slot'} ({t('common.optional') || 'Optional'})
                </Text>
                <InputField
                  placeholder={t('smartSociety.enterParkingSlot') || 'e.g., P-12'}
                  value={formData.parkingSlot}
                  onChangeText={text => setFormData({ ...formData, parkingSlot: text })}
                />
              </View>

              <View style={AdminMemberManagementStyles.inputContainer}>
                <Text style={AdminMemberManagementStyles.label}>
                  {t('smartSociety.blockId') || 'Block ID'} ({t('common.optional') || 'Optional'})
                </Text>
                <InputField
                  placeholder={t('smartSociety.enterBlockId') || 'Enter block ID'}
                  value={formData.blockId}
                  onChangeText={text => setFormData({ ...formData, blockId: text })}
                />
              </View>

              <View style={AdminMemberManagementStyles.inputRow}>
                <View style={[AdminMemberManagementStyles.inputContainer, { flex: 1, marginRight: 8 }]}>
                  <Text style={AdminMemberManagementStyles.label}>
                    {t('smartSociety.unitType') || 'Unit Type'} ({t('common.optional') || 'Optional'})
                  </Text>
                  <InputField
                    placeholder={t('smartSociety.enterUnitType') || 'e.g., 1BHK, 2BHK'}
                    value={formData.unitType}
                    onChangeText={text => setFormData({ ...formData, unitType: text })}
                  />
                </View>
                <View style={[AdminMemberManagementStyles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                  <Text style={AdminMemberManagementStyles.label}>
                    {t('smartSociety.area') || 'Area'} ({t('common.optional') || 'Optional'})
                  </Text>
                  <InputField
                    placeholder={t('smartSociety.enterArea') || 'sq.ft'}
                    value={formData.area}
                    onChangeText={text => setFormData({ ...formData, area: text })}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={AdminMemberManagementStyles.inputContainer}>
                <Text style={AdminMemberManagementStyles.label}>
                  {t('smartSociety.floor') || 'Floor'} ({t('common.optional') || 'Optional'})
                </Text>
                <InputField
                  placeholder={t('smartSociety.enterFloor') || 'Floor number'}
                  value={formData.floor}
                  onChangeText={text => setFormData({ ...formData, floor: text })}
                  keyboardType="numeric"
                />
              </View>

              <View style={AdminMemberManagementStyles.modalButtonContainer}>
                <CustomButton
                  title={editingMember ? t('common.update') || 'Update' : t('common.add') || 'Add'}
                  onPress={handleSaveMember}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </Container>
  );
};

export default AdminMemberManagement;

