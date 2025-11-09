import React from 'react';
import { View, Text } from 'react-native';
import { LandingStyles } from './styles';
import { Container, CustomButton } from '../../components/common';
import { Image } from 'react-native';
import { COLORS, FF, FS, IMAGES } from '../../constants';
import { useTranslation } from '../../context/LanguageContext';

// create a component
const Landing = (props: any) => {
  const { t } = useTranslation();
  return (
    <Container>
      <View style={LandingStyles.container}>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 150 }}>
          <Image source={IMAGES.UNIVERSAL} style={{ width: 220, height: 188 }} />
        </View>
        <View style={{ paddingHorizontal: 30, marginTop: 50 }}>
          <Text style={{ fontSize: FS.FS24, fontFamily: FF[400], color: COLORS.BLACK, textAlign: 'center' ,lineHeight:36}}>{t('auth.theRealEstateOperatingSystem')}</Text>
        </View>

        <View style={[LandingStyles.loginButtonContainer]}>
          <CustomButton title={t('auth.getStarted')} onPress={() => props.navigation.navigate('Login')} />
        </View>
      </View>
    </Container>
  );
};

export default Landing;
