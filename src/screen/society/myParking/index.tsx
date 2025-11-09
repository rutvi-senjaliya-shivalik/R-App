/**
 * MyParking Screen Component
 * 
 * Displays parking slot allocation with status indicators.
 * Features:
 * - 2 parking slots with labels "1" and "2"
 * - Status indicators (Available/Occupied)
 * - Animated entry with fade-in and scale effects
 * - Centered layout with modern UI design
 */
import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { Container, HeaderComponent } from '../../../components/common';
import { myParkingStyles } from './styles';
import { Icon } from '../../../components/common/Icon';

type ParkingSlot = {
  id: string;
  number: string;
  status: 'available' | 'occupied';
};

/**
 * AnimatedParkingCard Component
 * Displays individual parking slot with entrance animation
 */
const AnimatedParkingCard: React.FC<{
  slot: ParkingSlot;
  delay: number;
}> = ({ slot, delay }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Staggered animation with fade-in, scale, and slide-up effects
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 600,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim, translateYAnim, delay]);

  const isAvailable = slot.status === 'available';

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [
          { scale: scaleAnim },
          { translateY: translateYAnim },
        ],
      }}
    >
      <View
        style={[
          myParkingStyles.parkingCard,
          isAvailable
            ? myParkingStyles.parkingCardAvailable
            : myParkingStyles.parkingCardOccupied,
        ]}
      >
        {/* Parking Icon */}
        <View style={myParkingStyles.iconContainer}>
          <Icon name="parking-ic" sizes={{ width: 48, height: 48 }} />
        </View>

        {/* Parking Number */}
        <Text
          style={[
            myParkingStyles.parkingNumber,
            isAvailable
              ? myParkingStyles.parkingNumberAvailable
              : myParkingStyles.parkingNumberOccupied,
          ]}
        >
          {slot.number}
        </Text>

        {/* Status Badge */}
        <View
          style={[
            myParkingStyles.statusBadge,
            isAvailable
              ? myParkingStyles.statusBadgeAvailable
              : myParkingStyles.statusBadgeOccupied,
          ]}
        >
          <Text style={myParkingStyles.statusText}>
            {isAvailable ? 'Available' : 'Occupied'}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

/**
 * MyParking Screen
 * Main component displaying parking allocation
 */
const MyParking: React.FC<{ navigation: any }> = ({ navigation }) => {
  // Parking slots data - can be fetched from API in the future
  const parkingSlots: ParkingSlot[] = [
    {
      id: '6',
      number: '6',
      status: 'available', // Change to 'occupied' to test different state
    },
    {
      id: '7',
      number: '7',
      status: 'occupied', // Change to 'available' to test different state
    },
  ];

  return (
    <Container>
      <View style={myParkingStyles.container}>
        <HeaderComponent
          Title="My Parking"
          onPress={() => navigation.goBack()}
        />
        
        {/* Centered Parking Slots Container */}
        <View style={myParkingStyles.contentWrapper}>
          <View style={myParkingStyles.parkingSlotsContainer}>
            {parkingSlots.map((slot, index) => (
              <AnimatedParkingCard
                key={slot.id}
                slot={slot}
                delay={index * 150} // Stagger animation by 150ms
              />
            ))}
          </View>
        </View>
      </View>
    </Container>
  );
};

export default MyParking;

