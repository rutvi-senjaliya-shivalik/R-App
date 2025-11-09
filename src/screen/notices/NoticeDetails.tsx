import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/common/container';
import { RootState } from '../../store/reducers';
import { fetchNoticeDetails, markNoticeRead } from '../../store/actions/notices/noticesAction';
import { selectUserDetailData } from '../../store/selectors/auth';
import { COLORS, FF, FS, LH, SPACING, BORDER_RADIUS } from '../../constants';

interface NoticeDetailsProps {
  navigation: {
    goBack: () => void;
  };
  route: {
    params: {
      noticeId: string;
    };
  };
}

const NoticeDetails: React.FC<NoticeDetailsProps> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { noticeId } = route.params;

  // Get user data from Redux
  const userDetailData = useSelector(selectUserDetailData);
  const user = userDetailData?.data?.result;
  const unitId = user?.unitId || user?.unit?._id;

  const { loading, noticeDetails, error } = useSelector((state: RootState) => state.notices);

  useEffect(() => {
    dispatch(fetchNoticeDetails(noticeId) as never);

    // Mark notice as read when viewing details (only if unitId exists)
    if (unitId) {
      dispatch(markNoticeRead(noticeId, unitId) as never);
    }
  }, [dispatch, noticeId, unitId]);

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'urgent':
        return COLORS.ERROR_COLOR;
      case 'important':
        return COLORS.ORANGE_TEXT;
      default:
        return COLORS.GREEN_TEXT;
    }
  };

  const getPriorityBadgeStyle = (priority: string) => {
    return {
      ...styles.priorityBadge,
      backgroundColor: getPriorityColor(priority) + '20',
    };
  };

  const getPriorityTextStyle = (priority: string) => {
    return {
      ...styles.priorityText,
      color: getPriorityColor(priority),
    };
  };

  if (loading) {
    return (
      <Container>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.BLACK} />
          <Text style={styles.loadingText}>Loading notice...</Text>
        </View>
      </Container>
    );
  }

  if (error || !noticeDetails) {
    return (
      <Container>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error || 'Notice not found'}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => dispatch(fetchNoticeDetails(noticeId) as never)}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.metaContainer}>
          <View style={getPriorityBadgeStyle(noticeDetails.priority)}>
            <Text style={getPriorityTextStyle(noticeDetails.priority)}>
              {noticeDetails.priority.toUpperCase()}
            </Text>
          </View>
          <Text style={styles.dateText}>
            {new Date(noticeDetails.createdAt).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
        </View>

        <Text style={styles.title}>{noticeDetails.title}</Text>

        {noticeDetails.description && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{noticeDetails.description}</Text>
          </View>
        )}

        {noticeDetails.content && (
          <View style={styles.contentContainer}>
            <Text style={styles.contentLabel}>Full Content:</Text>
            <Text style={styles.content}>{noticeDetails.content}</Text>
          </View>
        )}

        {noticeDetails.attachments && noticeDetails.attachments.length > 0 && (
          <View style={styles.attachmentsContainer}>
            <Text style={styles.attachmentsLabel}>Attachments ({noticeDetails.attachments.length})</Text>
            {noticeDetails.attachments.map((attachment: any, index: number) => (
              <TouchableOpacity key={index} style={styles.attachmentItem}>
                <Text style={styles.attachmentIcon}>📎</Text>
                <Text style={styles.attachmentText}>{attachment.filename || `Attachment ${index + 1}`}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.footerInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Posted by:</Text>
            <Text style={styles.infoValue}>
              {noticeDetails.postedBy?.name || 'Management'}
            </Text>
          </View>

          {noticeDetails.targetAudience && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Target Audience:</Text>
              <Text style={styles.infoValue}>
                {noticeDetails.targetAudience.join(', ')}
              </Text>
            </View>
          )}

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status:</Text>
            <Text style={[styles.infoValue, { color: COLORS.GREEN_TEXT }]}>
              {noticeDetails.status || 'Published'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: SPACING.XL,
    paddingVertical: SPACING.LG,
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GREY,
  },
  backButton: {
    paddingVertical: SPACING.SM,
  },
  backButtonText: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    lineHeight: LH.LH22,
  },
  container: {
    flex: 1,
    padding: SPACING.XL,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.LG,
  },
  priorityBadge: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.SM,
    borderRadius: BORDER_RADIUS.LG,
  },
  priorityText: {
    fontSize: FS.FS12,
    fontFamily: FF[700],
    textTransform: 'uppercase',
  },
  dateText: {
    fontSize: FS.FS13,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH18,
  },
  title: {
    fontSize: FS.FS26,
    fontFamily: FF[700],
    color: COLORS.BLACK,
    marginBottom: SPACING.XL,
    lineHeight: LH.LH36,
  },
  descriptionContainer: {
    backgroundColor: COLORS.WHITE,
    padding: SPACING.LG,
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    marginBottom: SPACING.XL,
  },
  description: {
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.BLACK,
    lineHeight: LH.LH24,
  },
  contentContainer: {
    marginBottom: SPACING.XL,
  },
  contentLabel: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    marginBottom: SPACING.SM,
    lineHeight: LH.LH20,
  },
  content: {
    fontSize: FS.FS15,
    fontFamily: FF[400],
    color: COLORS.BLACK,
    lineHeight: LH.LH24,
  },
  attachmentsContainer: {
    backgroundColor: COLORS.WHITE,
    padding: SPACING.LG,
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    marginBottom: SPACING.XL,
  },
  attachmentsLabel: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    marginBottom: SPACING.MD,
    lineHeight: LH.LH22,
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.MD,
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.SM,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    marginBottom: SPACING.SM,
  },
  attachmentIcon: {
    fontSize: FS.FS20,
    marginRight: SPACING.MD,
  },
  attachmentText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK,
    flex: 1,
    lineHeight: LH.LH20,
  },
  footerInfo: {
    backgroundColor: COLORS.WHITE,
    padding: SPACING.LG,
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    marginBottom: SPACING.XL,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.SM,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GREY,
  },
  infoLabel: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH20,
  },
  infoValue: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    lineHeight: LH.LH20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.XL,
  },
  loadingText: {
    marginTop: SPACING.LG,
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH22,
  },
  errorText: {
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.ERROR_COLOR,
    textAlign: 'center',
    marginBottom: SPACING.XL,
    lineHeight: LH.LH22,
  },
  retryButton: {
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: SPACING.XXL,
    paddingVertical: SPACING.MD,
    borderRadius: BORDER_RADIUS.SM,
  },
  retryButtonText: {
    color: COLORS.WHITE,
    fontSize: FS.FS16,
    fontFamily: FF[600],
    lineHeight: LH.LH22,
  },
});

export default NoticeDetails;
