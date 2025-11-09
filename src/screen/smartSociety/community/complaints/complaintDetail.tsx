import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Container, HeaderComponent, CustomButton } from '../../../../components/common';
import ComplaintDetailStyles from './styles/complaintDetailStyles';
import { COLORS } from '../../../../constants';
import { useTranslation } from '../../../../context/LanguageContext';

const ComplaintDetail = (props: any) => {
  const { t } = useTranslation();
  const isMountedRef = useRef(true);
  const complaint = props.route?.params?.complaint;
  const selectedRole = props.route?.params?.selectedRole;
  const [complaintData, setComplaintData] = useState(complaint);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'resolved':
        return { bg: COLORS.LIGHT_GREEN, text: COLORS.GREEN_TEXT, border: COLORS.LIGHT_BORDER_GREEN };
      case 'in progress':
        return { bg: COLORS.YELLOW_BG, text: COLORS.ORANGE_TEXT, border: COLORS.YELLOW_BORDER };
      case 'open':
        return { bg: COLORS.ORANGE_BG, text: COLORS.ORANGE_TEXT, border: COLORS.ORANGE_BORDER };
      default:
        return { bg: COLORS.LIGHT_GRAY, text: COLORS.GREY_TEXT, border: COLORS.BORDER_GREY };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'resolved':
        return '✅';
      case 'in progress':
        return '🟡';
      case 'open':
        return '🔴';
      default:
        return '⚪';
    }
  };

  const statusColor = getStatusColor(complaintData.status);
  const statusIcon = getStatusIcon(complaintData.status);
  const isAdmin = selectedRole?.id === 'admin';

  const handleAddFeedback = () => {
    // TODO: Navigate to feedback screen or show modal
    Alert.alert(t('smartSociety.feedback'), t('smartSociety.feedbackFeatureWillBeImplemented'));
  };

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.complaintDetails')}
        onPress={() => props.navigation?.goBack()}
      />
      <ScrollView
        style={ComplaintDetailStyles.container}
        contentContainerStyle={ComplaintDetailStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={ComplaintDetailStyles.headerCard}>
          <View style={ComplaintDetailStyles.headerRow}>
            <View style={ComplaintDetailStyles.headerLeft}>
              <Text style={ComplaintDetailStyles.categoryBadge}>
                {complaintData.category}
              </Text>
              <Text style={ComplaintDetailStyles.flatNo}>
                {t('smartSociety.flat')} {complaintData.flatNo}
              </Text>
            </View>
            <View
              style={[
                ComplaintDetailStyles.statusBadge,
                {
                  backgroundColor: statusColor.bg,
                  borderColor: statusColor.border,
                },
              ]}
            >
              <Text style={ComplaintDetailStyles.statusIcon}>{statusIcon}</Text>
              <Text style={[ComplaintDetailStyles.statusText, { color: statusColor.text }]}>
                {complaintData.status}
              </Text>
            </View>
          </View>
        </View>

        <View style={ComplaintDetailStyles.section}>
          <Text style={ComplaintDetailStyles.sectionTitle}>{t('smartSociety.description')}</Text>
          <Text style={ComplaintDetailStyles.description}>
            {complaintData.description}
          </Text>
        </View>

        {complaintData.imageUrl && (
          <View style={ComplaintDetailStyles.section}>
            <Text style={ComplaintDetailStyles.sectionTitle}>{t('smartSociety.attachedImage')}</Text>
            <Image
              source={{ uri: complaintData.imageUrl }}
              style={ComplaintDetailStyles.attachedImage}
            />
          </View>
        )}

        <View style={ComplaintDetailStyles.section}>
          <Text style={ComplaintDetailStyles.sectionTitle}>{t('smartSociety.timeline')}</Text>
          <View style={ComplaintDetailStyles.timelineItem}>
            <Text style={ComplaintDetailStyles.timelineLabel}>{t('smartSociety.created')}</Text>
            <Text style={ComplaintDetailStyles.timelineValue}>
              {new Date(complaintData.createdAt).toLocaleString()}
            </Text>
          </View>
          {complaintData.updatedAt !== complaintData.createdAt && (
            <View style={ComplaintDetailStyles.timelineItem}>
              <Text style={ComplaintDetailStyles.timelineLabel}>{t('smartSociety.lastUpdated')}</Text>
              <Text style={ComplaintDetailStyles.timelineValue}>
                {new Date(complaintData.updatedAt).toLocaleString()}
              </Text>
            </View>
          )}
          {complaintData.assignedTo && (
            <View style={ComplaintDetailStyles.timelineItem}>
              <Text style={ComplaintDetailStyles.timelineLabel}>{t('smartSociety.assignedTo')}</Text>
              <Text style={ComplaintDetailStyles.timelineValue}>
                {complaintData.assignedTo}
              </Text>
            </View>
          )}
        </View>

        {complaintData.feedback && (
          <View style={ComplaintDetailStyles.section}>
            <Text style={ComplaintDetailStyles.sectionTitle}>{t('smartSociety.feedback')}</Text>
            <View style={ComplaintDetailStyles.feedbackCard}>
              <Text style={ComplaintDetailStyles.feedbackText}>
                {complaintData.feedback}
              </Text>
            </View>
          </View>
        )}

        {complaintData.status === 'Resolved' && !complaintData.feedback && !isAdmin && (
          <CustomButton
            title={t('smartSociety.addFeedback')}
            onPress={handleAddFeedback}
            style={ComplaintDetailStyles.feedbackButton}
          />
        )}
      </ScrollView>
    </Container>
  );
};

export default ComplaintDetail;

