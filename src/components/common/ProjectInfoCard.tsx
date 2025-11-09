import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS, FF, FS } from '../../constants';

interface ProjectInfoCardProps {
  projectName: string;
  location: string;
  launchDate: string;
  expectedCompletion: string;
  thumbnail?: string;
  defaultImage: any;
}

// Location Icon
const LocationIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path
      d="M8 8.5C8.82843 8.5 9.5 7.82843 9.5 7C9.5 6.17157 8.82843 5.5 8 5.5C7.17157 5.5 6.5 6.17157 6.5 7C6.5 7.82843 7.17157 8.5 8 8.5Z"
      stroke="#9CA3AF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 14C10 11 13 8.98528 13 7C13 4.23858 10.7614 2 8 2C5.23858 2 3 4.23858 3 7C3 8.98528 6 11 8 14Z"
      stroke="#9CA3AF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ProjectInfoCard: React.FC<ProjectInfoCardProps> = ({
  projectName,
  location,
  launchDate,
  expectedCompletion,
  thumbnail,
  defaultImage,
}) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        {/* Image */}
        <Image
          source={thumbnail ? { uri: thumbnail } : defaultImage}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Info */}
        <View style={styles.info}>
          <Text style={styles.projectName}>{projectName}</Text>
          
          <View style={styles.locationRow}>
            <LocationIcon />
            <Text style={styles.location}>{location}</Text>
          </View>

          <View style={styles.datesContainer}>
            <View style={styles.dateItem}>
              <Text style={styles.dateLabel}>Launch Date :</Text>
              <Text style={styles.dateValue}>{formatDate(launchDate)}</Text>
            </View>
            <View style={styles.dateItem}>
              <Text style={styles.dateLabel}>Expected Completion Date :</Text>
              <Text style={styles.dateValue}>{formatDate(expectedCompletion)}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  content: {
    flexDirection: 'row',
    gap: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    gap: 6,
  },
  projectName: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    fontWeight: '600',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: '#9CA3AF',
  },
  datesContainer: {
    gap: 4,
    marginTop: 4,
  },
  dateItem: {
    flexDirection: 'row',
    gap: 4,
  },
  dateLabel: {
    fontSize: FS.FS11,
    fontFamily: FF[400],
    color: '#9CA3AF',
  },
  dateValue: {
    fontSize: FS.FS11,
    fontFamily: FF[500],
    color: '#6B7280',
    fontWeight: '500',
  },
});

export default ProjectInfoCard;
