import React from 'react';
import { View, Text } from 'react-native';
import { Container, HeaderComponent } from '../../../components/common';
import { COLORS, FS, FF, LH } from '../../../constants';

const DashboardScreen = ({ navigation }: any) => {
  return (
    <Container>
      <View style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
        <HeaderComponent Title="Dashboard" onPress={() => navigation.goBack()} />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: FS.FS18, fontFamily: FF[500], lineHeight: LH.LH24, color: COLORS.BLACK_TEXT }}>
            Dashboard screen
          </Text>
        </View>
      </View>
    </Container>
  );
};

export default DashboardScreen;


