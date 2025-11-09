import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, Alert } from 'react-native';
import { Container, HeaderComponent } from '../../components/common';
import { COLORS } from '../../constants';
import warrantyStyles from './warrantyStyles';

interface Props {
  navigation: any;
}

interface WarrantyItem {
  id: string;
  category: string;
  brand: string;
  product: string;
  warrantyPeriod: string;
  expiryDate: string;
  serviceCenter: string;
  contact: string;
  email: string;
}

// Hardcoded warranty data
const warrantyData: WarrantyItem[] = [
  {
    id: '1',
    category: 'Kitchen',
    brand: 'Jaquar',
    product: 'Kitchen Faucet - Aria Series',
    warrantyPeriod: '10 Years',
    expiryDate: '15 Nov 2034',
    serviceCenter: 'Rajesh Kumar',
    contact: '+91 98765 43210',
    email: 'service.jaquar@gmail.com'
  },
  {
    id: '2',
    category: 'Bathroom',
    brand: 'Jaquar',
    product: 'Bathroom Fittings - Florentine Series',
    warrantyPeriod: '10 Years',
    expiryDate: '15 Nov 2034',
    serviceCenter: 'Amit Sharma',
    contact: '+91 98765 43211',
    email: 'service.jaquar@gmail.com'
  },
  {
    id: '3',
    category: 'Plumbing',
    brand: 'Hindware',
    product: 'Water Heater - Atlantic 25L',
    warrantyPeriod: '5 Years',
    expiryDate: '20 Nov 2029',
    serviceCenter: 'Vikram Singh',
    contact: '+91 98765 43212',
    email: 'hindware.service@gmail.com'
  },
  {
    id: '4',
    category: 'Kitchen',
    brand: 'Hafele',
    product: 'Modular Kitchen Hardware',
    warrantyPeriod: '2 Years',
    expiryDate: '15 Nov 2026',
    serviceCenter: 'Priya Desai',
    contact: '+91 98765 43213',
    email: 'hafele.support@gmail.com'
  },
  {
    id: '5',
    category: 'Electrical',
    brand: 'Havells',
    product: 'LED Lights & Switches',
    warrantyPeriod: '3 Years',
    expiryDate: '15 Nov 2027',
    serviceCenter: 'Suresh Patel',
    contact: '+91 98765 43214',
    email: 'havells.care@gmail.com'
  },
  {
    id: '6',
    category: 'Doors & Windows',
    brand: 'Fenesta',
    product: 'UPVC Windows',
    warrantyPeriod: '10 Years',
    expiryDate: '15 Nov 2034',
    serviceCenter: 'Anjali Reddy',
    contact: '+91 98765 43215',
    email: 'fenesta.service@gmail.com'
  },
  {
    id: '7',
    category: 'Flooring',
    brand: 'Kajaria',
    product: 'Vitrified Tiles',
    warrantyPeriod: '5 Years',
    expiryDate: '15 Nov 2029',
    serviceCenter: 'Manoj Gupta',
    contact: '+91 98765 43216',
    email: 'kajaria.support@gmail.com'
  },
  {
    id: '8',
    category: 'Paint',
    brand: 'Asian Paints',
    product: 'Royale Luxury Emulsion',
    warrantyPeriod: '7 Years',
    expiryDate: '15 Nov 2031',
    serviceCenter: 'Kiran Nair',
    contact: '+91 98765 43217',
    email: 'asianpaints.help@gmail.com'
  }
];

const WarrantyManagement: React.FC<Props> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Kitchen', 'Bathroom', 'Plumbing', 'Electrical', 'Doors & Windows', 'Flooring', 'Paint'];

  const filteredData = selectedCategory === 'All'
    ? warrantyData
    : warrantyData.filter(item => item.category === selectedCategory);

  const handleCall = (contact: string, name: string) => {
    Alert.alert(
      'Call Service Center',
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

  const handleEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  const getStatusColor = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffMonths = (expiry.getFullYear() - today.getFullYear()) * 12 + (expiry.getMonth() - today.getMonth());

    if (diffMonths < 0) return '#E53935'; // Expired - Red
    if (diffMonths <= 6) return '#FB8C00'; // Expiring soon - Orange
    return '#43A047'; // Active - Green
  };

  const renderItem = ({ item }: { item: WarrantyItem }) => {
    const statusColor = getStatusColor(item.expiryDate);
    const expiry = new Date(item.expiryDate);
    const today = new Date();
    const isExpired = expiry < today;

    return (
      <View style={warrantyStyles.card}>
        <View style={warrantyStyles.cardHeader}>
          <View>
            <Text style={warrantyStyles.categoryBadge}>{item.category}</Text>
            <Text style={warrantyStyles.brandName}>{item.brand}</Text>
            <Text style={warrantyStyles.productName}>{item.product}</Text>
          </View>
        </View>

        <View style={warrantyStyles.divider} />

        <View style={warrantyStyles.infoRow}>
          <Text style={warrantyStyles.infoLabel}>Warranty Period:</Text>
          <Text style={warrantyStyles.infoValue}>{item.warrantyPeriod}</Text>
        </View>

        <View style={warrantyStyles.infoRow}>
          <Text style={warrantyStyles.infoLabel}>Expiry Date:</Text>
          <Text style={[warrantyStyles.infoValue, { color: statusColor, fontWeight: '600' }]}>
            {item.expiryDate} {isExpired && '(Expired)'}
          </Text>
        </View>

        <View style={warrantyStyles.divider} />

        <Text style={warrantyStyles.serviceCenterTitle}>Service Center Contact</Text>
        <View style={warrantyStyles.infoRow}>
          <Text style={warrantyStyles.infoLabel}>Name:</Text>
          <Text style={warrantyStyles.infoValue}>{item.serviceCenter}</Text>
        </View>

        <View style={warrantyStyles.contactButtons}>
          <TouchableOpacity
            style={warrantyStyles.callButton}
            onPress={() => handleCall(item.contact, item.serviceCenter)}
          >
            <Text style={warrantyStyles.callButtonText}>📞 {item.contact}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={warrantyStyles.emailButton}
            onPress={() => handleEmail(item.email)}
          >
            <Text style={warrantyStyles.emailButtonText}>✉️ Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Container>
      <View style={warrantyStyles.container}>
        <HeaderComponent
          Title="Warranty & Guarantee"
          onPress={() => navigation.goBack()}
        />

        <View style={warrantyStyles.categoryContainer}>
          <FlatList
            horizontal
            data={categories}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  warrantyStyles.categoryChip,
                  selectedCategory === item && warrantyStyles.categoryChipActive
                ]}
                onPress={() => setSelectedCategory(item)}
              >
                <Text style={[
                  warrantyStyles.categoryChipText,
                  selectedCategory === item && warrantyStyles.categoryChipTextActive
                ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={warrantyStyles.contentWrapper}>
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={warrantyStyles.emptyContainer}>
                <Text style={warrantyStyles.emptyIcon}>📋</Text>
                <Text style={warrantyStyles.emptyText}>No warranty items found</Text>
              </View>
            }
          />
        </View>
      </View>
    </Container>
  );
};

export default WarrantyManagement;
