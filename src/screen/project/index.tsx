import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert, ActivityIndicator, Text } from 'react-native';
import { AppHeader, SearchBar, ProjectCard } from '../../components/common';
import { COLORS, FF, FS } from '../../constants';
import Images from '../../constants/images';
import { useProjects } from '../../hooks/useProjects';
import type { Project as ProjectType } from '../../services/api';

const Project = (props: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const { getActiveProjects, loading } = useProjects();

  const handleBellPress = () => {
    Alert.alert('Notifications', 'No new notifications');
  };

  const handleProfilePress = () => {
    props.navigation.navigate('Profile');
  };

  const handleSearch = () => {
    Alert.alert('Search', `Searching for: ${searchQuery}`);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await getActiveProjects();
      setProjects(response.projects);
    } catch (error: any) {
      // Silently handle error
      setProjects([]);
    }
  };

  const handleViewUnits = (projectId: string, projectName: string) => {
    props.navigation.navigate('ProjectDetails', { projectId, projectName });
  };

  const getDefaultImage = (index: number) => {
    const images = [Images.SHIVALIK_VILLA, Images.SHIVALIK_HEIGHTS, Images.SHIVALIK_GOLFS];
    return images[index % images.length];
  };

  const formatBudgetInLakhs = (min: number, max: number): string => {
    const minLakhs = min / 100000;
    const maxLakhs = max / 100000;
    
    const formatValue = (value: number): string => {
      if (value >= 100) {
        return `₹${(value / 100).toFixed(1)}Cr`;
      }
      return `₹${value.toFixed(1)}L`;
    };
    
    return `${formatValue(minLakhs)} - ${formatValue(maxLakhs)}`;
  };

  // Sample projects data (fallback)
  const sampleProjects = [
    {
      id: '1',
      projectName: 'Shivalik Villa',
      location: 'Sector 77, Mohali',
      priceRange: '₹45L - ₹85L',
      availableUnits: 24,
      imageSource: Images.SHIVALIK_VILLA,
    },
    {
      id: '2',
      projectName: 'Shivalik Heights',
      location: 'Sector 127, Mohali',
      priceRange: '₹55L - ₹95L',
      availableUnits: 18,
      imageSource: Images.SHIVALIK_HEIGHTS,
    },
    {
      id: '3',
      projectName: 'Shivalik Golf',
      location: 'Sector 88, Mohali',
      priceRange: '₹60L - ₹1.2Cr',
      availableUnits: 32,
      imageSource: Images.SHIVALIK_GOLFS,
    },
  ];

  return (
    <View style={styles.container}>
      <AppHeader 
        title="Projects"
        onBellPress={handleBellPress}
        onProfilePress={handleProfilePress}
      />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search projects..."
          onSearchPress={handleSearch}
        />

        {/* Projects List */}
        <View style={styles.projectsContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#000000" />
              <Text style={styles.loadingText}>Loading projects...</Text>
            </View>
          ) : projects.length > 0 ? (
            projects.map((project, index) => {
              const imageSource = project.thumbnail 
                ? { uri: project.thumbnail }
                : project.images?.[0] 
                  ? { uri: project.images[0] }
                  : getDefaultImage(index);
              
              const priceRange = project.budgetRange
                ? formatBudgetInLakhs(project.budgetRange.min, project.budgetRange.max)
                : 'Contact for pricing';
              
              return (
                <ProjectCard
                  key={project._id}
                  projectName={project.name}
                  location={project.address}
                  priceRange={priceRange}
                  availableUnits={project.units?.length || 0}
                  imageSource={imageSource}
                  onViewUnits={() => handleViewUnits(project._id, project.name)}
                />
              );
            })
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No active projects</Text>
              <Text style={styles.emptySubtext}>Check back later for new projects</Text>
            </View>
          )}
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
  scrollContent: {
    paddingBottom: 20,
  },
  projectsContainer: {
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: '#6B7280',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default Project;
