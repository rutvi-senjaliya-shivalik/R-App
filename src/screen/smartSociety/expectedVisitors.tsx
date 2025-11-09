import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Container, HeaderComponent, CustomButton } from '../../components/common';
import { ExpectedVisitorsStyles } from './styles';
import { COLORS, FF, FS } from '../../constants';
import { useTranslation } from '../../context/LanguageContext';

const ExpectedVisitors = (props: any) => {
  const { t } = useTranslation();
  const [hasScanned, setHasScanned] = useState(false);
  const [scannedVisitorData, setScannedVisitorData] = useState<any>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const scanCompleteCallbackRef = useRef<((data: any) => void) | null>(null);

  // Store callback in ref so it persists
  useEffect(() => {
    scanCompleteCallbackRef.current = (scannedData: any) => {
      console.log('Scan complete callback called with:', scannedData);
      setScannedVisitorData(scannedData);
      setHasScanned(true);
    };
  }, []);

  // Check for scanned data when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      const scannedData = props.route?.params?.scannedData;
      if (scannedData) {
        console.log('Scanned data from params:', scannedData);
        setScannedVisitorData(scannedData);
        setHasScanned(true);
        // Clear params to avoid re-processing
        props.navigation?.setParams?.({ scannedData: undefined });
      }
    }, [props.route?.params?.scannedData, props.navigation])
  );

  // Automatically open QR scanner when screen loads
  useEffect(() => {
    if (!hasScanned && !scannedVisitorData) {
      const timer = setTimeout(() => {
        props.navigation?.navigate('QRScanner', {
          onScanComplete: (scannedData: any) => {
            console.log('onScanComplete called:', scannedData);
            if (scanCompleteCallbackRef.current) {
              scanCompleteCallbackRef.current(scannedData);
            }
          },
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [hasScanned, scannedVisitorData, props.navigation]);

  const handleSubmit = () => {
    if (scannedVisitorData && !isSubmitted) {
      // Set submitted state immediately to hide submit button
      setIsSubmitted(true);
      
      // Here you would typically make an API call to submit the visitor entry
      console.log('Submitting visitor entry:', scannedVisitorData);
      
      // Show success message and navigate back after a short delay
      setTimeout(() => {
        Alert.alert(
          t('common.success'),
          t('smartSociety.visitorEntrySubmittedSuccessfully'),
          [
            {
              text: t('common.ok'),
              onPress: () => props.navigation?.goBack(),
            },
          ]
        );
      }, 300);
    }
  };

  const handleScanAgain = () => {
    setScannedVisitorData(null);
    setHasScanned(false);
    setIsSubmitted(false);
    // Open scanner again
    setTimeout(() => {
      props.navigation?.navigate('QRScanner', {
        onScanComplete: (scannedData: any) => {
          setScannedVisitorData(scannedData);
          setHasScanned(true);
        },
      });
    }, 100);
  };


  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.expectedVisitors')}
        onPress={() => props.navigation?.goBack()}
      />
      <ScrollView
        style={ExpectedVisitorsStyles.container}
        contentContainerStyle={ExpectedVisitorsStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Scanned Visitor Details Card */}
        {scannedVisitorData ? (
          <View style={ExpectedVisitorsStyles.scannedCard}>
            <View style={ExpectedVisitorsStyles.scannedCardHeader}>
              <Text style={ExpectedVisitorsStyles.scannedCardTitle}>
                {t('smartSociety.scannedVisitorDetails')}
              </Text>
            </View>
            <View style={ExpectedVisitorsStyles.scannedCardContent}>
              {scannedVisitorData.visitorName && (
                <View style={ExpectedVisitorsStyles.detailRow}>
                  <Text style={ExpectedVisitorsStyles.detailLabel}>{t('smartSociety.visitorName')}:</Text>
                  <Text style={ExpectedVisitorsStyles.detailValue}>
                    {scannedVisitorData.visitorName}
                  </Text>
                </View>
              )}
              {scannedVisitorData.phoneNumber && (
                <View style={ExpectedVisitorsStyles.detailRow}>
                  <Text style={ExpectedVisitorsStyles.detailLabel}>{t('smartSociety.phoneNumber')}:</Text>
                  <Text style={ExpectedVisitorsStyles.detailValue}>
                    {scannedVisitorData.phoneNumber}
                  </Text>
                </View>
              )}
              {scannedVisitorData.flatNumber && (
                <View style={ExpectedVisitorsStyles.detailRow}>
                  <Text style={ExpectedVisitorsStyles.detailLabel}>{t('smartSociety.flatNumber')}:</Text>
                  <Text style={ExpectedVisitorsStyles.detailValue}>
                    {scannedVisitorData.flatNumber}
                  </Text>
                </View>
              )}
              {scannedVisitorData.purpose && (
                <View style={ExpectedVisitorsStyles.detailRow}>
                  <Text style={ExpectedVisitorsStyles.detailLabel}>{t('smartSociety.purpose')}:</Text>
                  <Text style={ExpectedVisitorsStyles.detailValue}>
                    {scannedVisitorData.purpose}
                  </Text>
                </View>
              )}
              {scannedVisitorData.vehicleNumber && (
                <View style={ExpectedVisitorsStyles.detailRow}>
                  <Text style={ExpectedVisitorsStyles.detailLabel}>{t('smartSociety.vehicleNumber')}:</Text>
                  <Text style={ExpectedVisitorsStyles.detailValue}>
                    {scannedVisitorData.vehicleNumber}
                  </Text>
                </View>
              )}
              {scannedVisitorData.numberOfVisitors && (
                <View style={ExpectedVisitorsStyles.detailRow}>
                  <Text style={ExpectedVisitorsStyles.detailLabel}>{t('smartSociety.numberOfVisitors')}:</Text>
                  <Text style={ExpectedVisitorsStyles.detailValue}>
                    {scannedVisitorData.numberOfVisitors}
                  </Text>
                </View>
              )}
              {scannedVisitorData.rawData && !scannedVisitorData.visitorName && (
                <View style={[ExpectedVisitorsStyles.detailRow, ExpectedVisitorsStyles.detailRowLast]}>
                  <Text style={ExpectedVisitorsStyles.detailLabel}>{t('smartSociety.qrData')}:</Text>
                  <Text style={ExpectedVisitorsStyles.detailValue}>
                    {scannedVisitorData.rawData}
                  </Text>
                </View>
              )}
              {!scannedVisitorData.rawData || scannedVisitorData.visitorName ? (
                <View style={[ExpectedVisitorsStyles.detailRow, ExpectedVisitorsStyles.detailRowLast]} />
              ) : null}
            </View>
            
            {/* Action Buttons */}
            {!isSubmitted ? (
              <View style={ExpectedVisitorsStyles.buttonContainer}>
                <TouchableOpacity
                  style={ExpectedVisitorsStyles.scanAgainButton}
                  onPress={handleScanAgain}
                  disabled={isSubmitted}
                >
                  <Text style={ExpectedVisitorsStyles.scanAgainButtonText}>{t('smartSociety.scanAgain')}</Text>
                </TouchableOpacity>
                <View style={ExpectedVisitorsStyles.submitButtonContainer}>
                  <CustomButton
                    title={t('common.submit')}
                    onPress={handleSubmit}
                    disabled={isSubmitted}
                  />
                </View>
              </View>
            ) : null}
            
            {/* Success Message */}
            {isSubmitted && (
              <View style={ExpectedVisitorsStyles.successContainer}>
                <Text style={ExpectedVisitorsStyles.successText}>
                  ✓ {t('smartSociety.visitorEntrySubmittedSuccessfully')}
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View style={ExpectedVisitorsStyles.waitingContainer}>
            <Text style={ExpectedVisitorsStyles.waitingText}>
              {t('smartSociety.openingQRScanner')}
            </Text>
          </View>
        )}
      </ScrollView>
    </Container>
  );
};

export default ExpectedVisitors;

