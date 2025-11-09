import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS, FF, FS } from '../../constants';
import Images from '../../constants/images';
import ProjectInfoCard from '../../components/common/ProjectInfoCard';
import UnitCard from '../../components/common/UnitCard';
import UnitDetailsBottomSheet from '../../components/common/UnitDetailsBottomSheet';
import { unitsService, projectsService } from '../../services/api';
import type { Unit, Project } from '../../services/api';

const { width } = Dimensions.get('window');

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

const ProjectDetails = ({ navigation, route }: any) => {
  const { projectId, projectName } = route.params || {};
  const [units, setUnits] = useState<Unit[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  useEffect(() => {
    if (projectId) {
      fetchProjectDetails();
    }
  }, [projectId]);

  const fetchProjectDetails = async () => {
    setLoading(true);
    try {
      // Fetch units
      const unitsResponse = await unitsService.getUnitsByProject(projectId);
      setUnits(unitsResponse.units || []);

      // Fetch project details from active projects
      const projectsResponse = await projectsService.getActiveProjects();
      const foundProject = projectsResponse.projects.find(p => p._id === projectId);
      setProject(foundProject || null);
    } catch (error: any) {
      console.error('Error fetching project details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleUnitPress = (unit: Unit) => {
    if (unit.status === 'available') {
      setSelectedUnit(unit);
      setBottomSheetVisible(true);
    }
  };

  const handleCloseBottomSheet = () => {
    setBottomSheetVisible(false);
    setSelectedUnit(null);
  };

  const handleAddLead = () => {
    setBottomSheetVisible(false);
    // Navigate to AddLead with pre-filled data
    navigation.navigate('AddLead', {
      prefilledData: {
        projectId: projectId,
        projectName: projectName,
        unitId: selectedUnit?._id,
        unitNumber: selectedUnit?.unitNumber,
        configuration: selectedUnit?.configuration,
        price: selectedUnit?.totalPrice,
      },
    });
  };

  const getDefaultImage = () => {
    return Images.SHIVALIK_VILLA;
  };

  const carouselData = [
    { type: 'info', data: project },
    ...(project?.images || []).map((img: string) => ({ type: 'image', data: img })),
  ];

  const renderCarouselItem = ({ item }: any) => {
    if (item.type === 'info' && item.data) {
      return (
        <View style={{ width: width - 32, marginHorizontal: 16 }}>
          <ProjectInfoCard
            projectName={item.data.name}
            location={item.data.address}
            launchDate={item.data.launchDate}
            expectedCompletion={item.data.expectedCompletion}
            thumbnail={item.data.thumbnail}
            defaultImage={getDefaultImage()}
          />
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <BackArrowIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Project Details</Text>
        <TouchableOpacity onPress={handleProfilePress} style={styles.profileIcon}>
          <ProfileIcon />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000000" />
          <Text style={styles.loadingText}>Loading project details...</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Carousel */}
          {carouselData.length > 0 && (
            <View style={styles.carouselContainer}>
              <FlatList
                data={carouselData}
                renderItem={renderCarouselItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(event) => {
                  const index = Math.round(
                    event.nativeEvent.contentOffset.x / (width - 32)
                  );
                  setCarouselIndex(index);
                }}
              />
              
              {/* Pagination Dots */}
              {carouselData.length > 1 && (
                <View style={styles.pagination}>
                  {carouselData.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.dot,
                        index === carouselIndex && styles.activeDot,
                      ]}
                    />
                  ))}
                </View>
              )}
            </View>
          )}

          {/* Units Section */}
          <View style={styles.unitsSection}>
            {units.length > 0 ? (
              <View style={styles.unitsGrid}>
                {units.map((unit) => (
                  <UnitCard
                    key={unit._id}
                    unitNumber={unit.unitNumber}
                    configuration={unit.configuration}
                    floor={unit.floor}
                    facing={unit.facing}
                    price={unit.totalPrice}
                    status={unit.status}
                    onPress={() => handleUnitPress(unit)}
                    isSelected={selectedUnit?._id === unit._id}
                  />
                ))}
              </View>
            ) : (
              <View style={styles.emptyUnits}>
                <Text style={styles.emptyText}>No units available</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}

      {/* Unit Details Bottom Sheet */}
      <UnitDetailsBottomSheet
        visible={bottomSheetVisible}
        unit={selectedUnit}
        onClose={handleCloseBottomSheet}
        onAddLead={handleAddLead}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
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
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: '#6B7280',
  },
  carouselContainer: {
    marginTop: 16,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
  },
  activeDot: {
    backgroundColor: '#000000',
    width: 24,
  },
  unitsSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  unitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  emptyUnits: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  emptyText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: '#6B7280',
  },
});

export default ProjectDetails;
