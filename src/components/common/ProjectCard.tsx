import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { COLORS, FF, FS } from '../../constants';

interface ProjectCardProps {
  projectName: string;
  location: string;
  priceRange: string;
  availableUnits: number;
  imageSource?: ImageSourcePropType;
  onViewUnits?: () => void;
}

// Location Icon
const LocationIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path
      d="M8 8.66667C9.10457 8.66667 10 7.77124 10 6.66667C10 5.5621 9.10457 4.66667 8 4.66667C6.89543 4.66667 6 5.5621 6 6.66667C6 7.77124 6.89543 8.66667 8 8.66667Z"
      stroke="#6B7280"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 14C10.6667 11.3333 13.3333 9.13807 13.3333 6.66667C13.3333 3.72115 10.9455 1.33333 8 1.33333C5.05448 1.33333 2.66667 3.72115 2.66667 6.66667C2.66667 9.13807 5.33333 11.3333 8 14Z"
      stroke="#6B7280"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ProjectCard: React.FC<ProjectCardProps> = ({
  projectName,
  location,
  priceRange,
  availableUnits,
  imageSource,
  onViewUnits,
}) => {
  return (
    <View style={styles.card}>
      {/* Project Image */}
      {imageSource ? (
        <Image 
          source={imageSource} 
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}

      {/* Content Container */}
      <View style={styles.contentContainer}>
        {/* Project Name */}
        <Text style={styles.projectName}>{projectName}</Text>

        {/* Location */}
        <View style={styles.locationRow}>
          <LocationIcon />
          <Text style={styles.locationText}>{location}</Text>
        </View>

        {/* Price Range and Availability Row */}
        <View style={styles.priceAvailabilityRow}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Price Range</Text>
            <Text style={styles.priceValue}>{priceRange}</Text>
          </View>

          <View style={styles.availabilityBadge}>
            <View style={styles.dot} />
            <Text style={styles.availabilityText}>{availableUnits} Units</Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity 
          style={styles.viewUnitsButton}
          onPress={onViewUnits}
          activeOpacity={0.7}
        >
          <Text style={styles.viewUnitsText}>View Units</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#9CA3AF',
    fontSize: FS.FS14,
    fontFamily: FF[400],
  },
  contentContainer: {
    padding: 20,
    gap: 12,
  },
  projectName: {
    fontSize: FS.FS24,
    fontFamily: FF[700],
    fontWeight: '700',
    color: COLORS.BLACK,
    lineHeight: 32,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: '#6B7280',
    lineHeight: 20,
  },
  priceAvailabilityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 4,
  },
  priceContainer: {
    gap: 4,
  },
  priceLabel: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: '#6B7280',
    lineHeight: 18,
  },
  priceValue: {
    fontSize: FS.FS20,
    fontFamily: FF[700],
    fontWeight: '700',
    color: COLORS.BLACK,
    lineHeight: 28,
  },
  availabilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#10B9811A',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 100,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#008236',
  },
  availabilityText: {
    fontSize: 12,
    fontFamily: FF[500],
    fontWeight: '500',
    color: '#008236',
  },
  viewUnitsButton: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: COLORS.BLACK,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  viewUnitsText: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    fontWeight: '600',
    color: COLORS.WHITE,
    lineHeight: 20,
  },
});

export default ProjectCard;
