import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
} from 'react-native';
import { Container, HeaderComponent, CustomButton } from '../../../../components/common';
import LostFoundDetailStyles from './styles/lostFoundDetailStyles';
import { COLORS } from '../../../../constants';
import { useTranslation } from '../../../../context/LanguageContext';

interface LostFoundItem {
  id: string;
  type: 'Lost' | 'Found';
  itemName: string;
  description: string;
  location?: string;
  date: string;
  status: 'Open' | 'Claimed' | 'Returned';
  imageUrl?: string;
  reportedBy: string;
  flatNo: string;
  contact?: string;
}

const LostFoundDetail = (props: any) => {
  const { t } = useTranslation();
  const isMountedRef = useRef(true);
  const item: LostFoundItem = props.route?.params?.item;
  const selectedRole = props.route?.params?.selectedRole;
  const [itemData, setItemData] = useState<LostFoundItem>(item);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'lost':
        return { bg: '#FFEBEE', text: '#C62828', border: '#EF5350' };
      case 'found':
        return { bg: '#E8F5E9', text: '#2E7D32', border: '#66BB6A' };
      default:
        return { bg: COLORS.LIGHT_GRAY, text: COLORS.GREY_TEXT, border: COLORS.BORDER_GREY };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'returned':
        return { bg: COLORS.LIGHT_BLUE, text: COLORS.DARK_BLUE, border: COLORS.BLUE_BORDER };
      case 'claimed':
        return { bg: COLORS.YELLOW_BG, text: COLORS.ORANGE_TEXT, border: COLORS.YELLOW_BORDER };
      case 'open':
        return { bg: COLORS.LIGHT_GREEN, text: COLORS.GREEN_TEXT, border: COLORS.LIGHT_BORDER_GREEN };
      default:
        return { bg: COLORS.LIGHT_GRAY, text: COLORS.GREY_TEXT, border: COLORS.BORDER_GREY };
    }
  };

  const typeColor = getTypeColor(itemData.type);
  const statusColor = getStatusColor(itemData.status);
  const isAdmin = selectedRole?.id === 'admin';

  const handleCall = () => {
    if (itemData.contact) {
      Linking.openURL(`tel:${itemData.contact}`);
    } else {
      Alert.alert(t('common.error'), t('smartSociety.contactNumberNotAvailable') || 'Contact number not available');
    }
  };

  const handleMessage = () => {
    if (itemData.contact) {
      Linking.openURL(`sms:${itemData.contact}`);
    } else {
      Alert.alert(t('common.error'), t('smartSociety.contactNumberNotAvailable') || 'Contact number not available');
    }
  };

  const handleMarkReturned = () => {
    Alert.alert(
      t('smartSociety.markAsReturned') || 'Mark as Returned',
      t('smartSociety.confirmMarkReturned') || 'Are you sure you want to mark this item as returned?',
      [
        {
          text: t('common.cancel') || 'Cancel',
          style: 'cancel',
        },
        {
          text: t('common.confirm') || 'Confirm',
          onPress: () => {
            // TODO: Update status via API
            setItemData({ ...itemData, status: 'Returned' });
            Alert.alert(t('common.success'), t('smartSociety.statusUpdated') || 'Status updated successfully');
          },
        },
      ],
    );
  };

  const handleDelete = () => {
    Alert.alert(
      t('common.delete') || 'Delete',
      t('smartSociety.confirmDeleteReport') || 'Are you sure you want to delete this report?',
      [
        {
          text: t('common.cancel') || 'Cancel',
          style: 'cancel',
        },
        {
          text: t('common.delete') || 'Delete',
          style: 'destructive',
          onPress: () => {
            // TODO: Delete via API
            Alert.alert(t('common.success'), t('smartSociety.reportDeleted') || 'Report deleted successfully', [
              {
                text: t('common.ok') || 'OK',
                onPress: () => {
                  props.navigation?.goBack();
                },
              },
            ]);
          },
        },
      ],
    );
  };

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.lostFoundDetails') || 'Lost & Found Details'}
        onPress={() => props.navigation?.goBack()}
      />
      <ScrollView
        style={LostFoundDetailStyles.container}
        contentContainerStyle={LostFoundDetailStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Card */}
        <View style={LostFoundDetailStyles.headerCard}>
          <View style={LostFoundDetailStyles.headerRow}>
            <View style={LostFoundDetailStyles.headerLeft}>
              <View
                style={[
                  LostFoundDetailStyles.typeBadge,
                  { backgroundColor: typeColor.bg, borderColor: typeColor.border },
                ]}
              >
                <Text style={[LostFoundDetailStyles.typeBadgeText, { color: typeColor.text }]}>
                  {itemData.type}
                </Text>
              </View>
              <Text style={LostFoundDetailStyles.itemName}>{itemData.itemName}</Text>
            </View>
            <View
              style={[
                LostFoundDetailStyles.statusBadge,
                {
                  backgroundColor: statusColor.bg,
                  borderColor: statusColor.border,
                },
              ]}
            >
              <Text style={[LostFoundDetailStyles.statusText, { color: statusColor.text }]}>
                {itemData.status}
              </Text>
            </View>
          </View>
        </View>

        {/* Image */}
        {itemData.imageUrl && (
          <View style={LostFoundDetailStyles.section}>
            <Image
              source={{ uri: itemData.imageUrl }}
              style={LostFoundDetailStyles.itemImage}
            />
          </View>
        )}

        {/* Description */}
        <View style={LostFoundDetailStyles.section}>
          <Text style={LostFoundDetailStyles.sectionTitle}>
            {t('smartSociety.description') || 'Description'}
          </Text>
          <Text style={LostFoundDetailStyles.description}>{itemData.description}</Text>
        </View>

        {/* Location */}
        {itemData.location && (
          <View style={LostFoundDetailStyles.section}>
            <Text style={LostFoundDetailStyles.sectionTitle}>
              {t('smartSociety.location') || 'Location'}
            </Text>
            <View style={LostFoundDetailStyles.locationRow}>
              <Text style={LostFoundDetailStyles.locationLabel}>📍</Text>
              <Text style={LostFoundDetailStyles.locationText}>{itemData.location}</Text>
            </View>
          </View>
        )}

        {/* Reported By */}
        <View style={LostFoundDetailStyles.section}>
          <Text style={LostFoundDetailStyles.sectionTitle}>
            {t('smartSociety.reportedBy') || 'Reported By'}
          </Text>
          <Text style={LostFoundDetailStyles.infoText}>
            {itemData.reportedBy} ({itemData.flatNo})
          </Text>
        </View>

        {/* Date */}
        <View style={LostFoundDetailStyles.section}>
          <Text style={LostFoundDetailStyles.sectionTitle}>
            {t('smartSociety.dateReported') || 'Date Reported'}
          </Text>
          <Text style={LostFoundDetailStyles.infoText}>
            {new Date(itemData.date).toLocaleDateString()}
          </Text>
        </View>

        {/* Contact Info */}
        {itemData.contact && (
          <View style={LostFoundDetailStyles.section}>
            <Text style={LostFoundDetailStyles.sectionTitle}>
              {t('smartSociety.contact') || 'Contact'}
            </Text>
            <Text style={LostFoundDetailStyles.infoText}>{itemData.contact}</Text>
            <View style={LostFoundDetailStyles.contactButtons}>
              <TouchableOpacity
                style={LostFoundDetailStyles.contactButton}
                onPress={handleCall}
              >
                <Text style={LostFoundDetailStyles.contactButtonText}>
                  {t('smartSociety.call') || 'Call'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  LostFoundDetailStyles.contactButton,
                  LostFoundDetailStyles.messageButton,
                ]}
                onPress={handleMessage}
              >
                <Text
                  style={[
                    LostFoundDetailStyles.contactButtonText,
                    LostFoundDetailStyles.messageButtonText,
                  ]}
                >
                  {t('smartSociety.message') || 'Message'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Admin Actions */}
        {isAdmin && (
          <View style={LostFoundDetailStyles.section}>
            <Text style={LostFoundDetailStyles.sectionTitle}>
              {t('smartSociety.adminActions') || 'Admin Actions'}
            </Text>
            {itemData.status !== 'Returned' && (
              <CustomButton
                title={t('smartSociety.markAsReturned') || 'Mark as Returned'}
                onPress={handleMarkReturned}
                style={LostFoundDetailStyles.adminButton}
              />
            )}
            <CustomButton
              title={t('common.delete') || 'Delete Report'}
              onPress={handleDelete}
              style={[LostFoundDetailStyles.adminButton, LostFoundDetailStyles.deleteButton]}
            />
          </View>
        )}
      </ScrollView>
    </Container>
  );
};

export default LostFoundDetail;

