import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, Alert } from 'react-native';
import { Container, HeaderComponent } from '../../components/common';
import { COLORS } from '../../constants';
import serviceStyles from './serviceStyles';

interface Props {
  navigation: any;
}

interface ServiceProvider {
  id: string;
  name: string;
  category: string;
  specialization: string;
  experience: string;
  rating: number;
  contact: string;
  location: string;
  availability: string;
}

// Hardcoded service provider data
const serviceProviders: ServiceProvider[] = [
  // Plumbers
  {
    id: '1',
    name: 'Ramesh Kumar',
    category: 'Plumber',
    specialization: 'Pipe Fitting, Leak Repair',
    experience: '15 Years',
    rating: 4.8,
    contact: '+91 98765 11111',
    location: '2.5 km away',
    availability: 'Available'
  },
  {
    id: '2',
    name: 'Sunil Sharma',
    category: 'Plumber',
    specialization: 'Bathroom Fittings, Water Tank',
    experience: '12 Years',
    rating: 4.6,
    contact: '+91 98765 11112',
    location: '3.2 km away',
    availability: 'Available'
  },
  // Electricians
  {
    id: '3',
    name: 'Vijay Patel',
    category: 'Electrician',
    specialization: 'Wiring, MCB Installation',
    experience: '18 Years',
    rating: 4.9,
    contact: '+91 98765 22221',
    location: '1.8 km away',
    availability: 'Busy'
  },
  {
    id: '4',
    name: 'Anil Verma',
    category: 'Electrician',
    specialization: 'Light Fixtures, Fan Repair',
    experience: '10 Years',
    rating: 4.5,
    contact: '+91 98765 22222',
    location: '2.1 km away',
    availability: 'Available'
  },
  // Carpenters
  {
    id: '5',
    name: 'Prakash Singh',
    category: 'Carpenter',
    specialization: 'Furniture Repair, Door Fitting',
    experience: '20 Years',
    rating: 4.7,
    contact: '+91 98765 33331',
    location: '3.5 km away',
    availability: 'Available'
  },
  {
    id: '6',
    name: 'Mahesh Gupta',
    category: 'Carpenter',
    specialization: 'Modular Kitchen, Wardrobes',
    experience: '14 Years',
    rating: 4.8,
    contact: '+91 98765 33332',
    location: '2.8 km away',
    availability: 'Available'
  },
  // AC Technicians
  {
    id: '7',
    name: 'Rajesh Nair',
    category: 'AC Technician',
    specialization: 'AC Installation, Servicing',
    experience: '16 Years',
    rating: 4.9,
    contact: '+91 98765 44441',
    location: '1.5 km away',
    availability: 'Available'
  },
  {
    id: '8',
    name: 'Deepak Joshi',
    category: 'AC Technician',
    specialization: 'AC Repair, Gas Refilling',
    experience: '11 Years',
    rating: 4.6,
    contact: '+91 98765 44442',
    location: '3.0 km away',
    availability: 'Busy'
  },
  // Painters
  {
    id: '9',
    name: 'Mohan Reddy',
    category: 'Painter',
    specialization: 'Interior Painting, Texture',
    experience: '13 Years',
    rating: 4.7,
    contact: '+91 98765 55551',
    location: '2.2 km away',
    availability: 'Available'
  },
  {
    id: '10',
    name: 'Karan Desai',
    category: 'Painter',
    specialization: 'Exterior Painting, Waterproofing',
    experience: '17 Years',
    rating: 4.8,
    contact: '+91 98765 55552',
    location: '2.9 km away',
    availability: 'Available'
  },
  // House Cleaning
  {
    id: '11',
    name: 'Sunita Devi',
    category: 'House Cleaning',
    specialization: 'Deep Cleaning, Sanitization',
    experience: '8 Years',
    rating: 4.9,
    contact: '+91 98765 66661',
    location: '1.2 km away',
    availability: 'Available'
  },
  {
    id: '12',
    name: 'Rekha Sharma',
    category: 'House Cleaning',
    specialization: 'Regular Cleaning, Kitchen Cleaning',
    experience: '10 Years',
    rating: 4.7,
    contact: '+91 98765 66662',
    location: '1.8 km away',
    availability: 'Available'
  },
  // Pest Control
  {
    id: '13',
    name: 'Ashok Mehta',
    category: 'Pest Control',
    specialization: 'Termite Control, Cockroach Treatment',
    experience: '12 Years',
    rating: 4.8,
    contact: '+91 98765 77771',
    location: '3.5 km away',
    availability: 'Available'
  },
  {
    id: '14',
    name: 'Sanjay Kumar',
    category: 'Pest Control',
    specialization: 'Mosquito Control, Bed Bug Treatment',
    experience: '9 Years',
    rating: 4.6,
    contact: '+91 98765 77772',
    location: '2.7 km away',
    availability: 'Busy'
  },
];

const ServiceDirectory: React.FC<Props> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Plumber', 'Electrician', 'Carpenter', 'AC Technician', 'Painter', 'House Cleaning', 'Pest Control'];

  const filteredData = selectedCategory === 'All'
    ? serviceProviders
    : serviceProviders.filter(item => item.category === selectedCategory);

  const handleCall = (contact: string, name: string) => {
    Alert.alert(
      'Call Service Provider',
      `Do you want to call ${name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call',
          onPress: () => Linking.openURL(`tel:${contact}`)
        }
      ]
    );
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }

    return stars.join('');
  };

  const renderItem = ({ item }: { item: ServiceProvider }) => {
    const isAvailable = item.availability === 'Available';

    return (
      <View style={serviceStyles.card}>
        <View style={serviceStyles.cardHeader}>
          <View style={serviceStyles.headerLeft}>
            <Text style={serviceStyles.categoryBadge}>{item.category}</Text>
            <Text style={serviceStyles.providerName}>{item.name}</Text>
            <Text style={serviceStyles.specialization}>{item.specialization}</Text>
          </View>
          <View style={[
            serviceStyles.availabilityBadge,
            { backgroundColor: isAvailable ? '#E8F5E9' : '#FFF3E0' }
          ]}>
            <Text style={[
              serviceStyles.availabilityText,
              { color: isAvailable ? '#2E7D32' : '#E65100' }
            ]}>
              {item.availability}
            </Text>
          </View>
        </View>

        <View style={serviceStyles.divider} />

        <View style={serviceStyles.infoRow}>
          <Text style={serviceStyles.infoLabel}>Experience:</Text>
          <Text style={serviceStyles.infoValue}>{item.experience}</Text>
        </View>

        <View style={serviceStyles.infoRow}>
          <Text style={serviceStyles.infoLabel}>Rating:</Text>
          <Text style={serviceStyles.ratingValue}>
            {renderStars(item.rating)} {item.rating}
          </Text>
        </View>

        <View style={serviceStyles.infoRow}>
          <Text style={serviceStyles.infoLabel}>Location:</Text>
          <Text style={serviceStyles.infoValue}>{item.location}</Text>
        </View>

        <TouchableOpacity
          style={serviceStyles.callButton}
          onPress={() => handleCall(item.contact, item.name)}
        >
          <Text style={serviceStyles.callButtonText}>📞 Call {item.contact}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Container>
      <View style={serviceStyles.container}>
        <HeaderComponent
          Title="Service Directory"
          onPress={() => navigation.goBack()}
        />

        <View style={serviceStyles.categoryContainer}>
          <FlatList
            horizontal
            data={categories}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  serviceStyles.categoryChip,
                  selectedCategory === item && serviceStyles.categoryChipActive
                ]}
                onPress={() => setSelectedCategory(item)}
              >
                <Text style={[
                  serviceStyles.categoryChipText,
                  selectedCategory === item && serviceStyles.categoryChipTextActive
                ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={serviceStyles.contentWrapper}>
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={serviceStyles.emptyContainer}>
                <Text style={serviceStyles.emptyIcon}>🔧</Text>
                <Text style={serviceStyles.emptyText}>No service providers found</Text>
              </View>
            }
          />
        </View>
      </View>
    </Container>
  );
};

export default ServiceDirectory;
