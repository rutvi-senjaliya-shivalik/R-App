import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  Container,
  HeaderComponent,
  InputField,
  CustomButton,
  Dropdowns,
} from '../../../components/common';
import AdminParkingManagementStyles from './styles/adminParkingManagementStyles';
import { COLORS } from '../../../constants';
import { useTranslation } from '../../../context/LanguageContext';

interface ParkingSlot {
  id: string;
  type: '2-Wheeler' | '4-Wheeler';
  assignedTo: string | null;
  status: 'Allocated' | 'Available';
  flatNo?: string;
  memberName?: string;
}

const AdminParkingManagement = (props: any) => {
  const { t } = useTranslation();
  const isMountedRef = useRef(true);
  const selectedRole = props.route?.params?.selectedRole;
  const [parkingSlots, setParkingSlots] = useState<ParkingSlot[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [filter, setFilter] = useState<'all' | 'allocated' | 'available'>(
    'all',
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSlot, setEditingSlot] = useState<ParkingSlot | null>(null);
  const [formData, setFormData] = useState({
    slotNumber: '',
    type: '4-Wheeler' as '2-Wheeler' | '4-Wheeler',
    assignedTo: '',
    status: 'Available' as 'Allocated' | 'Available',
  });

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
    loadParkingSlots();
    loadMembers();
    return () => {
      isMountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadParkingSlots = () => {
    // TODO: Fetch parking slots from API
    const mockSlots: ParkingSlot[] = [
      {
        id: 'P-12',
        type: '4-Wheeler',
        assignedTo: 'mem001',
        status: 'Allocated',
        flatNo: 'A-101',
        memberName: 'Jay Sarvaiya',
      },
      {
        id: 'P-13',
        type: '2-Wheeler',
        assignedTo: null,
        status: 'Available',
      },
      {
        id: 'P-5',
        type: '4-Wheeler',
        assignedTo: 'mem003',
        status: 'Allocated',
        flatNo: 'C-305',
        memberName: 'Rajesh Kumar',
      },
      {
        id: 'P-20',
        type: '2-Wheeler',
        assignedTo: null,
        status: 'Available',
      },
    ];
    setParkingSlots(mockSlots);
  };

  const loadMembers = () => {
    // TODO: Fetch members from API
    const mockMembers = [
      { label: 'Jay Sarvaiya (A-101)', value: 'mem001' },
      { label: 'Priya Patel (B-204)', value: 'mem002' },
      { label: 'Rajesh Kumar (C-305)', value: 'mem003' },
    ];
    setMembers(mockMembers);
  };

  const resetForm = () => {
    setFormData({
      slotNumber: '',
      type: '4-Wheeler',
      assignedTo: '',
      status: 'Available',
    });
    setEditingSlot(null);
  };

  const handleAddSlot = () => {
    resetForm();
    setShowAddModal(true);
  };

  const handleEditSlot = (slot: ParkingSlot) => {
    setFormData({
      slotNumber: slot.id,
      type: slot.type,
      assignedTo: slot.assignedTo || '',
      status: slot.status,
    });
    setEditingSlot(slot);
    setShowAddModal(true);
  };

  const handleUnassignSlot = (slot: ParkingSlot) => {
    Alert.alert(
      t('smartSociety.unassignParking') || 'Unassign Parking',
      t('smartSociety.confirmUnassignParking', { slot: slot.id }) ||
        `Are you sure you want to unassign ${slot.id}?`,
      [
        { text: t('common.cancel') || 'Cancel', style: 'cancel' },
        {
          text: t('common.unassign') || 'Unassign',
          onPress: () => {
            // TODO: Unassign via API
            setParkingSlots(
              parkingSlots.map(s =>
                s.id === slot.id
                  ? {
                      ...s,
                      assignedTo: null,
                      status: 'Available',
                      flatNo: undefined,
                      memberName: undefined,
                    }
                  : s,
              ),
            );
            Alert.alert(
              t('common.success') || 'Success',
              t('smartSociety.parkingUnassigned') || 'Parking slot unassigned',
            );
          },
        },
      ],
    );
  };

  const handleSaveSlot = () => {
    if (!formData.slotNumber) {
      Alert.alert(
        t('common.error') || 'Error',
        t('smartSociety.enterSlotNumber') || 'Please enter slot number',
      );
      return;
    }

    if (formData.status === 'Allocated' && !formData.assignedTo) {
      Alert.alert(
        t('common.error') || 'Error',
        t('smartSociety.selectMemberForAllocation') ||
          'Please select a member for allocation',
      );
      return;
    }

    if (editingSlot) {
      // TODO: Update via API
      const member = members.find(m => m.value === formData.assignedTo);
      setParkingSlots(
        parkingSlots.map(s =>
          s.id === editingSlot.id
            ? {
                ...s,
                id: formData.slotNumber,
                type: formData.type,
                assignedTo:
                  formData.status === 'Allocated' ? formData.assignedTo : null,
                status: formData.status,
                flatNo:
                  formData.status === 'Allocated' && member
                    ? member.label.split('(')[1]?.replace(')', '')
                    : undefined,
                memberName:
                  formData.status === 'Allocated' && member
                    ? member.label.split('(')[0].trim()
                    : undefined,
              }
            : s,
        ),
      );
      Alert.alert(
        t('common.success') || 'Success',
        t('smartSociety.parkingUpdated') || 'Parking slot updated successfully',
      );
    } else {
      // TODO: Create via API
      const member = members.find(m => m.value === formData.assignedTo);
      const newSlot: ParkingSlot = {
        id: formData.slotNumber,
        type: formData.type,
        assignedTo:
          formData.status === 'Allocated' ? formData.assignedTo : null,
        status: formData.status,
        flatNo:
          formData.status === 'Allocated' && member
            ? member.label.split('(')[1]?.replace(')', '')
            : undefined,
        memberName:
          formData.status === 'Allocated' && member
            ? member.label.split('(')[0].trim()
            : undefined,
      };
      setParkingSlots([...parkingSlots, newSlot]);
      Alert.alert(
        t('common.success') || 'Success',
        t('smartSociety.parkingAdded') || 'Parking slot added successfully',
      );
    }
    setShowAddModal(false);
    resetForm();
  };

  const filteredSlots = parkingSlots.filter(slot => {
    if (filter === 'all') return true;
    return slot.status.toLowerCase() === filter.toLowerCase();
  });

  const typeOptions = [
    { label: t('smartSociety.twoWheeler') || '2-Wheeler', value: '2-Wheeler' },
    { label: t('smartSociety.fourWheeler') || '4-Wheeler', value: '4-Wheeler' },
  ];

  const statusOptions = [
    { label: t('smartSociety.available') || 'Available', value: 'Available' },
    { label: t('smartSociety.allocated') || 'Allocated', value: 'Allocated' },
  ];

  const memberOptions = [
    { label: t('smartSociety.none') || 'None', value: '' },
    ...members,
  ];

  const renderParkingCard = ({ item }: { item: ParkingSlot }) => {
    const statusColor =
      item.status === 'Allocated'
        ? {
            bg: COLORS.LIGHT_GREEN,
            text: COLORS.GREEN_TEXT,
            border: COLORS.LIGHT_BORDER_GREEN,
            icon: '✓',
          }
        : {
            bg: COLORS.OCEAN_BLUE_BG,
            text: COLORS.OCEAN_BLUE_TEXT,
            border: COLORS.OCEAN_BLUE_BORDER,
            icon: '○',
          };

    return (
      <View style={AdminParkingManagementStyles.parkingCard}>
        <View style={AdminParkingManagementStyles.parkingHeader}>
          <View style={AdminParkingManagementStyles.slotNumberContainer}>
            <View style={AdminParkingManagementStyles.slotLeftContainer}>
              <Text style={AdminParkingManagementStyles.slotIcon}>🚗</Text>
              <Text style={AdminParkingManagementStyles.slotNumber}>
                {item.id}
              </Text>
            </View>
            <View
              style={[
                AdminParkingManagementStyles.statusBadge,
                {
                  backgroundColor: statusColor.bg,
                  borderColor: statusColor.border,
                },
              ]}
            >
              <Text
                style={[
                  AdminParkingManagementStyles.statusText,
                  { color: statusColor.text },
                ]}
              >
                {statusColor.icon}
              </Text>
              <Text
                style={[
                  AdminParkingManagementStyles.statusText,
                  { color: statusColor.text },
                ]}
              >
                {item.status}
              </Text>
            </View>
          </View>
          <Text style={AdminParkingManagementStyles.slotType}>{item.type}</Text>
        </View>
        {item.status === 'Allocated' && item.assignedTo && (
          <View style={AdminParkingManagementStyles.assignedInfo}>
            <View style={AdminParkingManagementStyles.assignedRow}>
              <Text style={AdminParkingManagementStyles.assignedLabel}>
                {t('smartSociety.assignedTo') || 'Assigned To'}
              </Text>
              <Text
                style={AdminParkingManagementStyles.assignedValue}
                numberOfLines={1}
              >
                {item.memberName}
              </Text>
              <Text style={AdminParkingManagementStyles.assignedFlat}>
                {item.flatNo}
              </Text>
            </View>
          </View>
        )}
        <View style={AdminParkingManagementStyles.actionButtons}>
          <TouchableOpacity
            style={[
              AdminParkingManagementStyles.actionButton,
              AdminParkingManagementStyles.editButton,
            ]}
            onPress={() => handleEditSlot(item)}
            activeOpacity={0.7}
          >
            <Text style={AdminParkingManagementStyles.editButtonText}>
              {t('common.edit') || 'Edit'}
            </Text>
          </TouchableOpacity>
          {item.status === 'Allocated' && (
            <TouchableOpacity
              style={[
                AdminParkingManagementStyles.actionButton,
                AdminParkingManagementStyles.unassignButton,
              ]}
              onPress={() => handleUnassignSlot(item)}
              activeOpacity={0.7}
            >
              <Text style={AdminParkingManagementStyles.unassignButtonText}>
                {t('smartSociety.unassign') || 'Unassign'}
              </Text>
            </TouchableOpacity>
          )}
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
        Title={t('smartSociety.parkingManagement') || 'Parking Management'}
        onPress={() => props.navigation?.goBack()}
      />
      <View style={AdminParkingManagementStyles.container}>
        <View style={AdminParkingManagementStyles.filterContainer}>
          {(['all', 'allocated', 'available'] as const).map(filterType => (
            <TouchableOpacity
              key={filterType}
              style={[
                AdminParkingManagementStyles.filterTab,
                filter === filterType &&
                  AdminParkingManagementStyles.filterTabActive,
              ]}
              onPress={() => setFilter(filterType)}
            >
              <Text
                style={[
                  AdminParkingManagementStyles.filterTabText,
                  filter === filterType &&
                    AdminParkingManagementStyles.filterTabTextActive,
                ]}
              >
                {filterType === 'all'
                  ? t('common.all') || 'All'
                  : filterType === 'allocated'
                  ? t('smartSociety.allocated') || 'Allocated'
                  : t('smartSociety.available') || 'Available'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={AdminParkingManagementStyles.addButton}
          onPress={handleAddSlot}
        >
          <Text style={AdminParkingManagementStyles.addButtonText}>
            + {t('smartSociety.addParkingSlot') || 'Add Parking Slot'}
          </Text>
        </TouchableOpacity>

        <FlatList
          data={filteredSlots}
          renderItem={renderParkingCard}
          keyExtractor={item => item.id}
          contentContainerStyle={AdminParkingManagementStyles.parkingList}
          ListEmptyComponent={
            <View style={AdminParkingManagementStyles.emptyState}>
              <Text style={AdminParkingManagementStyles.emptyStateText}>
                {t('smartSociety.noParkingSlotsFound') ||
                  'No parking slots found'}
              </Text>
            </View>
          }
        />
      </View>

      {/* Add/Edit Parking Slot Modal */}
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
        style={AdminParkingManagementStyles.modal}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={AdminParkingManagementStyles.modalContent}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={AdminParkingManagementStyles.modalHeader}>
              <Text style={AdminParkingManagementStyles.modalTitle}>
                {editingSlot
                  ? t('smartSociety.editParkingSlot') || 'Edit Parking Slot'
                  : t('smartSociety.addParkingSlot') || 'Add Parking Slot'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
              >
                <Text style={AdminParkingManagementStyles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={AdminParkingManagementStyles.formContainer}>
              <View style={AdminParkingManagementStyles.inputContainer}>
                <Text style={AdminParkingManagementStyles.label}>
                  {t('smartSociety.slotNumber') || 'Slot Number'} *
                </Text>
                <InputField
                  placeholder={
                    t('smartSociety.enterSlotNumber') || 'e.g., P-12'
                  }
                  value={formData.slotNumber}
                  onChangeText={text =>
                    setFormData({ ...formData, slotNumber: text })
                  }
                />
              </View>

              <View style={AdminParkingManagementStyles.inputContainer}>
                <Text style={AdminParkingManagementStyles.label}>
                  {t('smartSociety.type') || 'Type'} *
                </Text>
                <Dropdowns
                  data={typeOptions}
                  value={formData.type}
                  placeholder={t('smartSociety.selectType') || 'Select type'}
                  onChange={value =>
                    setFormData({
                      ...formData,
                      type: value as '2-Wheeler' | '4-Wheeler',
                    })
                  }
                />
              </View>

              <View style={AdminParkingManagementStyles.inputContainer}>
                <Text style={AdminParkingManagementStyles.label}>
                  {t('smartSociety.status') || 'Status'} *
                </Text>
                <Dropdowns
                  data={statusOptions}
                  value={formData.status}
                  placeholder={
                    t('smartSociety.selectStatus') || 'Select status'
                  }
                  onChange={value => {
                    setFormData({
                      ...formData,
                      status: value as 'Allocated' | 'Available',
                      assignedTo:
                        value === 'Available' ? '' : formData.assignedTo,
                    });
                  }}
                />
              </View>

              {formData.status === 'Allocated' && (
                <View style={AdminParkingManagementStyles.inputContainer}>
                  <Text style={AdminParkingManagementStyles.label}>
                    {t('smartSociety.assignToMember') || 'Assign to Member'} *
                  </Text>
                  <Dropdowns
                    data={memberOptions.filter(m => m.value !== '')}
                    value={formData.assignedTo}
                    placeholder={
                      t('smartSociety.selectMember') || 'Select member'
                    }
                    onChange={value =>
                      setFormData({ ...formData, assignedTo: value })
                    }
                    search
                    searchPlaceholder={
                      t('smartSociety.searchMember') || 'Search member...'
                    }
                  />
                </View>
              )}

              <View style={AdminParkingManagementStyles.modalButtonContainer}>
                <CustomButton
                  title={
                    editingSlot
                      ? t('common.update') || 'Update'
                      : t('common.add') || 'Add'
                  }
                  onPress={handleSaveSlot}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </Container>
  );
};

export default AdminParkingManagement;
