import React from 'react';
import { View, Text } from 'react-native';
import { InputField } from '../../../../components/common';
import { formStyles } from './formStyles';

interface VehicleFormProps {
  vehicleType: string;
  setVehicleType: (value: string) => void;
  vehicleNumber: string;
  setVehicleNumber: (value: string) => void;
  vehicleModel: string;
  setVehicleModel: (value: string) => void;
}

const VehicleForm: React.FC<VehicleFormProps> = ({
  vehicleType,
  setVehicleType,
  vehicleNumber,
  setVehicleNumber,
  vehicleModel,
  setVehicleModel,
}) => {
  return (
    <>
      <View style={formStyles.inputWrapper}>
        <Text style={formStyles.label}>Vehicle Type *</Text>
        <InputField
          placeholder="E.g., Car, Bike, Scooter"
          value={vehicleType}
          onChangeText={setVehicleType}
        />
      </View>
      <View style={formStyles.inputWrapper}>
        <Text style={formStyles.label}>Vehicle Number *</Text>
        <InputField
          placeholder="Enter vehicle number"
          value={vehicleNumber}
          onChangeText={setVehicleNumber}
          autoCapitalize="characters"
        />
      </View>
      <View style={formStyles.inputWrapper}>
        <Text style={formStyles.label}>Model</Text>
        <InputField
          placeholder="Enter vehicle model"
          value={vehicleModel}
          onChangeText={setVehicleModel}
        />
      </View>
    </>
  );
};

export default VehicleForm;

